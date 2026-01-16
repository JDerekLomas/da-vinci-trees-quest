import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTranslations } from '../../../hooks/useTranslations';
import lidarSimulationConfig from '../configs/lidar-jungle-survey';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { FC } from 'react';

type BeamVertices = number[];

const TREE_GEOMETRY = new THREE.CylinderGeometry(0.5, 0.7, 5, 8);
const TREE_MATERIAL = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.8 });
const CANOPY_GEOMETRY = new THREE.ConeGeometry(3, 15, 8);
const CANOPY_MATERIAL = new THREE.MeshStandardMaterial({ color: 0x2d5a27, roughness: 0.7 });

interface LidarSimulationProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const LidarSimulation: FC<LidarSimulationProps> = ({ onInteraction }: LidarSimulationProps) => {
  const { t } = useTranslations();

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const droneRef = useRef<THREE.Group | null>(null);
  const groundRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial> | null>(null);
  const canopyRef = useRef<THREE.Group | null>(null);
  const cityGroupRef = useRef<THREE.Group | null>(null);
  const pathwayRef = useRef<THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial> | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const tweensRef = useRef<TweenObject[]>([]);
  const filteredViewRef = useRef<HTMLCanvasElement | null>(null);
  const compassRef = useRef<HTMLCanvasElement | null>(null);

  const [, setStats] = useState({
    canopyHits: 0,
    groundHits: 0,
    structureHits: 0,
  });
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showStructures, setShowStructures] = useState(false);
  const [showFilteredView, setShowFilteredView] = useState(false);
  const [message, setMessage] = useState(t(lidarSimulationConfig.messages.ready));
  const [discoveries, setDiscoveries] = useState({
    pathwayFound: false,
    cityFound: false,
    scanComplete: false,
  });
  const [hasStartedScan, setHasStartedScan] = useState(false);
  const [hasShownDataAnalysis, setHasShownDataAnalysis] = useState(false);
  const [hasLoggedScanComplete, setHasLoggedScanComplete] = useState(false);

  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const canopyHits = useRef<number[]>([]);
  const groundHits = useRef<number[]>([]);
  const structureHits = useRef<number[]>([]);

  const JUNGLE_SIZE = 200;
  const TREE_COUNT = 1500;
  const DRONE_HEIGHT = 50;
  const CITY_CENTER = { x: 20, z: -30 };
  const CITY_RADIUS = 50;

  const pathwayData = {
    start: { x: -45, y: 0, z: 0 },
    end: { x: 45, y: 0, z: 0 },
    width: 8,
  };

  const cityStructures = [
    {
      type: 'pyramid',
      name: 'Triangle Garden',
      position: { x: CITY_CENTER.x, z: CITY_CENTER.z },
      size: 15,
      height: 20,
      pointCount: 500,
    },
    {
      type: 'rectangle',
      name: 'Rectangle Plaza',
      position: { x: CITY_CENTER.x + 15, z: CITY_CENTER.z + 5 },
      width: 20,
      height: 15,
      pointCount: 300,
    },
    {
      type: 'rectangle',
      name: 'Reservoir',
      position: { x: CITY_CENTER.x - 20, z: CITY_CENTER.z + 5 },
      width: 16,
      height: 16,
      pointCount: 200,
    },
    {
      type: 'rectangle',
      name: 'Court',
      position: { x: CITY_CENTER.x + 5, z: CITY_CENTER.z - 15 },
      width: 16,
      height: 12,
      pointCount: 200,
    },
  ];

  const MIN_ZOOM = 45;
  const MAX_ZOOM = 150;
  const ZOOM_SPEED = 5;
  const PAN_SPEED = 2;
  const ROTATE_SPEED = 0.05;
  const DRONE_SCAN_OFFSET = 25;

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a2a3a);
    scene.fog = new THREE.Fog(0x1a2a3a, 50, 300);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 70, 80);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0x606060, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 100, 50);
    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;

    scene.add(directionalLight);

    createGround();
    createJungle();
    createHiddenCity();
    createPathway();
    createDrone();
    createLidarVisualizers();
    createFilteredDataView();
    createCompass();
    setupControls();
    setupTouchControls();

    animate();

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }

      if (
        rendererRef.current &&
        containerRef.current &&
        containerRef.current.contains(rendererRef.current.domElement)
      ) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }

      if (
        filteredViewRef.current &&
        containerRef.current &&
        containerRef.current.contains(filteredViewRef.current)
      ) {
        containerRef.current.removeChild(filteredViewRef.current);
      }

      if (document.getElementById('filtered-view-toggle')) {
        const toggleButton = document.getElementById('filtered-view-toggle');
        if (toggleButton) {
          toggleButton.remove();
        }
      }

      disposeScene();
    };
  }, []);

  const createCompass = () => {
    if (!containerRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    canvas.className = 'absolute left-3 bottom-16 rounded-full';

    containerRef.current.appendChild(canvas);
    compassRef.current = canvas;

    updateCompass();
  };

  const updateCompass = () => {
    if (!compassRef.current || !cameraRef.current) return;

    const canvas = compassRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width * 0.4;

    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    const camera = cameraRef.current;
    const cameraDirection = new THREE.Vector3(0, 0, -1);
    cameraDirection.applyQuaternion(camera.quaternion);

    const directionXZ = new THREE.Vector2(cameraDirection.x, cameraDirection.z);
    directionXZ.normalize();

    const angle = Math.atan2(directionXZ.x, -directionXZ.y);

    ctx.save();

    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.translate(-centerX, -centerY);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ff3b30';
    ctx.fillText(t(lidarSimulationConfig.labels.north), centerX, centerY - radius * 0.75);

    ctx.fillStyle = '#ffffff';
    ctx.fillText(t(lidarSimulationConfig.labels.east), centerX + radius * 0.75, centerY);
    ctx.fillText(t(lidarSimulationConfig.labels.south), centerX, centerY + radius * 0.75);
    ctx.fillText(t(lidarSimulationConfig.labels.west), centerX - radius * 0.75, centerY);

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius * 0.4);
    ctx.lineTo(centerX - radius * 0.15, centerY);
    ctx.lineTo(centerX + radius * 0.15, centerY);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ff3b30';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const handleShowDataAnalysis = () => {
    if (!hasShownDataAnalysis) {
      console.log('LidarSimulation: Show Data Analysis button clicked for the first time');
      onInteraction({
        'step-2-completed': true,
      });
      setHasShownDataAnalysis(true);
    }
    setShowFilteredView(true);
    if (document.getElementById('filtered-view-toggle')) {
      const toggleButton = document.getElementById('filtered-view-toggle');
      if (toggleButton) {
        toggleButton.style.display = 'none';
      }
    }
    if (filteredViewRef.current) {
      filteredViewRef.current.style.display = 'block';
    }

    setTimeout(() => {
      updateFilteredDataView();
    }, 50);

    if (discoveries.scanComplete || scanProgress >= 95) {
      setTimeout(() => {
        updateFilteredDataView();
      }, 100);
      setTimeout(() => {
        updateFilteredDataView();
      }, 300);
      setTimeout(() => {
        updateFilteredDataView();
      }, 600);

      setTimeout(() => {
        const needsFallbackPoints =
          (structureHits.current.length < 500 && discoveries.cityFound) ||
          (groundHits.current.length < 200 && scanProgress > 50);

        if (needsFallbackPoints) {
          generateFallbackPoints();
          updateFilteredDataView();
        }
      }, 200);
    }
  };

  const generateFallbackPoints = () => {
    if (groundHits.current.length < 200) {
      for (let x = -80; x <= 80; x += 5) {
        for (let z = -80; z <= 80; z += 5) {
          const jitterX = (Math.random() - 0.5) * 4;
          const jitterZ = (Math.random() - 0.5) * 4;
          const height = Math.sin(x * 0.02) * Math.cos(z * 0.02) * 2 + Math.random() * 0.5;

          const adjustedZ = z - 30;

          groundHits.current.push(x + jitterX, height, adjustedZ + jitterZ);
        }
      }
    }

    if (discoveries.pathwayFound && scanProgress > 40) {
      const { start, end, width } = pathwayData;

      for (let i = 0; i < 150; i++) {
        const t = i / 150;
        const x = start.x + (end.x - start.x) * t;
        const z = start.z + (end.z - start.z) * t;

        for (let w = -width / 2; w <= width / 2; w += 0.8) {
          const offsetZ = z + w;
          const y = 0.5 + Math.random() * 0.3;

          const adjustedOffsetZ = offsetZ - 30;

          groundHits.current.push(x + 20, y, adjustedOffsetZ);

          if (Math.random() < 0.1) {
            structureHits.current.push(x + 20, y + 0.5, adjustedOffsetZ);
          }
        }
      }
    }

    if (discoveries.cityFound && (structureHits.current.length < 1000 || scanProgress > 60)) {
      cityStructures.forEach((structure) => {
        const { type, position, size, width, height, pointCount } = structure;

        switch (type) {
          case 'pyramid':
            for (let i = 0; i < pointCount; i++) {
              const angle = Math.random() * Math.PI * 2;
              const distanceFactor = Math.pow(Math.random(), 0.7);
              const distance = distanceFactor * (size ?? 0);
              const x = position.x + Math.cos(angle) * distance;
              const z = position.z + Math.sin(angle) * distance;

              const heightFactor = 1 - distance / (size ?? 1);
              const y = heightFactor * structure.height + Math.random() * 2;

              structureHits.current.push(x, y, z);
            }
            break;

          case 'rectangle':
            for (let i = 0; i < pointCount; i++) {
              let x, z;

              if (Math.random() < 0.3) {
                if (Math.random() < 0.5) {
                  x = position.x - (width ?? 0) / 2 + Math.random() * (width ?? 0);
                  z =
                    Math.random() < 0.5
                      ? position.z - height / 2 + Math.random() * 1
                      : position.z + height / 2 - Math.random() * 1;
                } else {
                  z = position.z - height / 2 + Math.random() * height;
                  x =
                    Math.random() < 0.5
                      ? position.x - (width ?? 0) / 2 + Math.random() * 1
                      : position.x + (width ?? 0) / 2 - Math.random() * 1;
                }
              } else {
                x = position.x - (width ?? 0) / 2 + Math.random() * (width ?? 0);
                z = position.z - height / 2 + Math.random() * height;
              }

              const y = 1 + Math.random() * 2;

              structureHits.current.push(x, y, z);
            }
            break;
        }
      });

      const wallPointsPerSide = 100;
      const cityWidth = CITY_RADIUS * 1.8;
      const cityHeight = CITY_RADIUS * 1.6;

      for (let i = 0; i < wallPointsPerSide; i++) {
        const t = i / wallPointsPerSide;
        const x = CITY_CENTER.x - cityWidth / 2 + cityWidth * t;
        const z = CITY_CENTER.z - cityHeight / 2;
        const jitter = (Math.random() - 0.5) * 3;
        const y = 2 + Math.random() * 3;

        structureHits.current.push(x, y, z + jitter);
      }

      for (let i = 0; i < wallPointsPerSide; i++) {
        const t = i / wallPointsPerSide;
        const x = CITY_CENTER.x - cityWidth / 2 + cityWidth * t;
        const z = CITY_CENTER.z + cityHeight / 2;
        const jitter = (Math.random() - 0.5) * 3;
        const y = 2 + Math.random() * 3;

        structureHits.current.push(x, y, z + jitter);
      }

      for (let i = 0; i < wallPointsPerSide; i++) {
        const t = i / wallPointsPerSide;
        const z = CITY_CENTER.z - cityHeight / 2 + cityHeight * t;
        const x = CITY_CENTER.x - cityWidth / 2;
        const jitter = (Math.random() - 0.5) * 3;
        const y = 2 + Math.random() * 3;

        structureHits.current.push(x + jitter, y, z);
      }

      for (let i = 0; i < wallPointsPerSide; i++) {
        const t = i / wallPointsPerSide;
        const z = CITY_CENTER.z - cityHeight / 2 + cityHeight * t;
        const x = CITY_CENTER.x + cityWidth / 2;
        const jitter = (Math.random() - 0.5) * 3;
        const y = 2 + Math.random() * 3;

        structureHits.current.push(x + jitter, y, z);
      }

      for (let i = 0; i < 15; i++) {
        const x = CITY_CENTER.x - cityWidth / 2 + 10 + Math.random() * (cityWidth - 20);
        const z = CITY_CENTER.z - cityHeight / 2 + 10 + Math.random() * (cityHeight - 20);

        const structWidth = 3 + Math.random() * 4;
        const structHeight = 3 + Math.random() * 4;
        const structY = 2 + Math.random() * 4;

        for (let j = 0; j < 30; j++) {
          const localX = x - structWidth / 2 + Math.random() * structWidth;
          const localZ = z - structHeight / 2 + Math.random() * structHeight;
          const localY = Math.random() * structY;

          structureHits.current.push(localX, localY, localZ);
        }
      }
    }

    updatePointClouds([]);
  };

  const createFilteredDataView = () => {
    if (!containerRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.className = 'absolute top-3 right-3 bg-black bg-opacity-70 rounded-lg border border-gray-700';
    canvas.style.display = 'none';

    containerRef.current.appendChild(canvas);
    filteredViewRef.current = canvas;

    updateFilteredDataView();

    const toggleButton = document.createElement('button');
    toggleButton.id = 'filtered-view-toggle';
    toggleButton.className =
      'absolute top-3 right-3 px-3 py-1 bg-[#006BE0] text-white rounded text-base font-semibold hover:from-blue-700 hover:to-cyan-700 transition-colors';
    toggleButton.textContent = t(lidarSimulationConfig.labels.showDataAnalysis);
    toggleButton.style.display = 'block';
    toggleButton.onclick = handleShowDataAnalysis;

    containerRef.current.appendChild(toggleButton);
  };

  const forceUpdateFilteredView = () => {
    setTimeout(() => {
      updateFilteredDataView();
    }, 50);
  };

  const updateFilteredDataView = () => {
    if (!filteredViewRef.current) return;

    const canvas = filteredViewRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drawPoints = (points: number[], color: string, step: number) => {
      ctx.fillStyle = color;
      for (let i = 0; i < points.length; i += 3 * step) {
        const x = worldToCanvasX(points[i]);
        const z = worldToCanvasZ(points[i + 2]);
        if (x >= 0 && x < canvas.width && z >= 0 && z < canvas.height) {
          ctx.fillRect(x, z, 1.5, 1.5);
        }
      }
    };

    drawPoints(
      canopyHits.current,
      'rgba(0, 255, 0, 0.5)',
      Math.max(1, Math.floor(canopyHits.current.length / 3000)),
    );
    drawPoints(
      groundHits.current,
      'rgba(0, 120, 255, 0.6)',
      Math.max(1, Math.floor(groundHits.current.length / 6000)),
    );
    drawPoints(
      structureHits.current,
      'rgba(255, 150, 0, 0.8)',
      Math.max(1, Math.floor(structureHits.current.length / 12000)),
    );
  };
  useEffect(() => {
    if (showFilteredView && filteredViewRef.current && filteredViewRef.current.style.display !== 'none') {
      updateFilteredDataView();
    }
    if (scanProgress >= 100) {
      if (!hasLoggedScanComplete) {
        console.log('LidarSimulation: Scan progress reached 100% for the first time');
        onInteraction({
          'step-3-completed': true,
        });
        setHasLoggedScanComplete(true);
      }
      deactivateDroneScanEffects();
    }
  }, [scanProgress]);

  useEffect(() => {
    if (showFilteredView && filteredViewRef.current && filteredViewRef.current.style.display !== 'none') {
      updateFilteredDataView();
    }

    if (discoveries.cityFound) {
      generateFallbackPoints();
    }
  }, [discoveries]);

  const createGround = () => {
    if (!sceneRef.current) return;

    const groundGeometry = new THREE.PlaneGeometry(JUNGLE_SIZE * 1.5, JUNGLE_SIZE * 1.5, 64, 64);

    const vertices = groundGeometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const z = vertices[i + 2];

      vertices[i + 1] = Math.sin(x * 0.02) * Math.cos(z * 0.02) * 2 + Math.random() * 0.5;
    }

    groundGeometry.computeVertexNormals();

    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x4d6f45, roughness: 0.8, metalness: 0.1 });

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    ground.name = 'ground';

    sceneRef.current.add(ground);
    groundRef.current = ground;
  };

  const createJungle = () => {
    if (!sceneRef.current) return;
    const canopyGroup = new THREE.Group();
    canopyGroup.name = 'canopy';
    const trunkMesh = new THREE.InstancedMesh(TREE_GEOMETRY, TREE_MATERIAL, TREE_COUNT);
    const canopyMesh = new THREE.InstancedMesh(CANOPY_GEOMETRY, CANOPY_MATERIAL, TREE_COUNT);
    let instanceId = 0;
    for (let i = 0; i < TREE_COUNT; i++) {
      let x, z;
      if (Math.random() < 0.7) {
        const clumpX = (Math.random() - 0.5) * JUNGLE_SIZE;
        const clumpZ = (Math.random() - 0.5) * JUNGLE_SIZE;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 15;
        x = clumpX + Math.cos(angle) * distance;
        z = clumpZ + Math.sin(angle) * distance;
      } else {
        x = (Math.random() - 0.5) * JUNGLE_SIZE;
        z = (Math.random() - 0.5) * JUNGLE_SIZE;
      }
      const distToPath = Math.abs(z);
      if (distToPath < 5 && Math.abs(x) < 45) continue;
      const distToCity = Math.sqrt(Math.pow(x - CITY_CENTER.x, 2) + Math.pow(z - CITY_CENTER.z, 2));
      if (distToCity < 10) continue;
      const scale = 0.7 + Math.random() * 0.6;
      const rotY = Math.random() * Math.PI * 2;
      // Trunk
      const trunkMatrix = new THREE.Matrix4();
      trunkMatrix.compose(
        new THREE.Vector3(x, 2.5 * scale, z),
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotY),
        new THREE.Vector3(scale, scale, scale),
      );
      trunkMesh.setMatrixAt(instanceId, trunkMatrix);
      // Canopy
      const canopyMatrix = new THREE.Matrix4();
      canopyMatrix.compose(
        new THREE.Vector3(x, 12.5 * scale, z),
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotY),
        new THREE.Vector3(scale, scale, scale),
      );
      canopyMesh.setMatrixAt(instanceId, canopyMatrix);
      instanceId++;
    }
    trunkMesh.instanceMatrix.needsUpdate = true;
    canopyMesh.instanceMatrix.needsUpdate = true;
    canopyGroup.add(trunkMesh);
    canopyGroup.add(canopyMesh);
    sceneRef.current.add(canopyGroup);
    canopyRef.current = canopyGroup;
  };

  const createHiddenCity = () => {
    if (!sceneRef.current) return;

    const cityGroup = new THREE.Group();
    cityGroup.name = 'ancientCity';

    interface PyramidParams {
      x: number;
      z: number;
      size: number;
    }

    const createPyramid = ({ x, z, size }: PyramidParams): THREE.Mesh => {
      const height = size * 1.5;

      const geometry = new THREE.ConeGeometry(size, height, 4);
      const material = new THREE.MeshStandardMaterial({
        color: 0xcc6600,
        roughness: 0.7,
        transparent: true,
        opacity: 0.8,
      });

      const pyramid = new THREE.Mesh(geometry, material);
      pyramid.position.set(x, height / 2, z);
      pyramid.rotation.y = Math.PI / 4;
      pyramid.castShadow = true;
      pyramid.visible = showStructures;

      return pyramid;
    };

    const createTemple = (x: number, z: number, width: number | undefined, height: number): THREE.Mesh => {
      const structHeight = height * 0.6;

      const geometry = new THREE.BoxGeometry(width, structHeight, height);
      const material = new THREE.MeshStandardMaterial({
        color: 0xaa4400,
        roughness: 0.8,
        transparent: true,
        opacity: 0.8,
      });

      const temple = new THREE.Mesh(geometry, material);
      temple.position.set(x, structHeight / 2, z);
      temple.castShadow = true;
      temple.visible = showStructures;

      return temple;
    };

    interface WallParams {
      x: number;
      z: number;
      length: number;
      height: number;
      rotation: number;
    }

    const createWall = ({ x, z, length, height, rotation }: WallParams): THREE.Mesh => {
      const geometry = new THREE.BoxGeometry(length, height, 2);
      const material = new THREE.MeshStandardMaterial({
        color: 0x888888,
        roughness: 0.9,
        transparent: true,
        opacity: 0.8,
      });

      const wall = new THREE.Mesh(geometry, material);
      wall.position.set(x, height / 2, z);
      wall.rotation.y = rotation;
      wall.castShadow = true;
      wall.visible = showStructures;

      return wall;
    };

    cityStructures.forEach((structure) => {
      if (structure.type === 'pyramid') {
        const pyramid = createPyramid({
          x: structure.position.x,
          z: structure.position.z,
          size: structure.size ?? 10,
        });
        cityGroup.add(pyramid);
      } else if (structure.type === 'rectangle') {
        const temple = createTemple(structure.position.x, structure.position.z, structure.width, structure.height);
        cityGroup.add(temple);
      }
    });

    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 20 + Math.random() * (CITY_RADIUS - 25);
      const x = CITY_CENTER.x + Math.cos(angle) * distance;
      const z = CITY_CENTER.z + Math.sin(angle) * distance;

      const width = 3 + Math.random() * 5;
      const depth = 3 + Math.random() * 5;

      const temple = createTemple(x, z, width, depth);
      cityGroup.add(temple);
    }

    const cityWidth = CITY_RADIUS * 1.8;
    const cityHeight = CITY_RADIUS * 1.6;
    const wallHeight = 5;

    const northWall = createWall({
      x: CITY_CENTER.x,
      z: CITY_CENTER.z - cityHeight / 2,
      length: cityWidth,
      height: wallHeight,
      rotation: 0,
    });
    cityGroup.add(northWall);

    const southWall = createWall({
      x: CITY_CENTER.x,
      z: CITY_CENTER.z + cityHeight / 2,
      length: cityWidth,
      height: wallHeight,
      rotation: 0,
    });
    cityGroup.add(southWall);

    const eastWall = createWall({
      x: CITY_CENTER.x + cityWidth / 2,
      z: CITY_CENTER.z,
      length: cityHeight,
      height: wallHeight,
      rotation: Math.PI / 2,
    });
    cityGroup.add(eastWall);

    const westWall = createWall({
      x: CITY_CENTER.x - cityWidth / 2,
      z: CITY_CENTER.z,
      length: cityHeight,
      height: wallHeight,
      rotation: Math.PI / 2,
    });
    cityGroup.add(westWall);

    sceneRef.current.add(cityGroup);
    cityGroupRef.current = cityGroup;
  };

  const createPathway = () => {
    if (!sceneRef.current) return;

    const { start, end, width } = pathwayData;

    const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.z - start.z, 2));

    const geometry = new THREE.BoxGeometry(length, 1, width);
    const material = new THREE.MeshStandardMaterial({
      color: 0xd3caa9,
      roughness: 0.7,
      transparent: true,
      opacity: 0.9,
    });

    const pathway = new THREE.Mesh(geometry, material);

    pathway.position.set((start.x + end.x) / 2, 0.5, (start.z + end.z) / 2);

    pathway.castShadow = true;
    pathway.receiveShadow = true;
    pathway.visible = false;

    sceneRef.current.add(pathway);
    pathwayRef.current = pathway;
  };

  const createDrone = () => {
    if (!sceneRef.current) return;

    const drone = new THREE.Group();

    const bodyGeometry = new THREE.BoxGeometry(3, 0.8, 4);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.7,
      roughness: 0.3,
    });

    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    drone.add(body);

    type RotorGroup = THREE.Group & { userData: { rotorSpeed: number } };

    const createRotor = (x: number, z: number): RotorGroup => {
      const rotorGroup: RotorGroup = Object.assign(new THREE.Group(), { userData: { rotorSpeed: 0 } });

      const hubGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 8);
      const hubMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
        metalness: 0.8,
      });

      const hub = new THREE.Mesh(hubGeometry, hubMaterial);
      rotorGroup.add(hub);

      const bladeGeometry = new THREE.BoxGeometry(2.5, 0.1, 0.3);
      const bladeMaterial = new THREE.MeshStandardMaterial({
        color: 0x777777,
      });

      const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
      blade.position.y = 0.1;
      rotorGroup.add(blade);

      rotorGroup.position.set(x, 0.5, z);
      rotorGroup.userData = { rotorSpeed: Math.random() * 0.1 + 0.3 };

      return rotorGroup;
    };

    const rotorPositions = [
      { x: 1.3, z: 1.3 },
      { x: -1.3, z: 1.3 },
      { x: 1.3, z: -1.3 },
      { x: -1.3, z: -1.3 },
    ];

    rotorPositions.forEach((pos) => {
      const rotor = createRotor(pos.x, pos.z);
      drone.add(rotor);
    });

    const scannerBaseGeometry = new THREE.CylinderGeometry(0.7, 0.7, 0.3, 16);
    const scannerBaseMaterial = new THREE.MeshStandardMaterial({
      color: 0x0088ff,
      emissive: 0x0066cc,
      emissiveIntensity: 0.5,
    });

    const scannerBase = new THREE.Mesh(scannerBaseGeometry, scannerBaseMaterial);
    scannerBase.position.y = -0.5;
    scannerBase.rotation.x = Math.PI / 2;
    drone.add(scannerBase);

    const beamGeometry = new THREE.ConeGeometry(35, 50, 32, 1, true);
    const beamMaterial = new THREE.MeshBasicMaterial({
      color: 0x00aaff,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    });

    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.position.y = -25;
    beam.rotation.x = 0;
    beam.visible = false;
    drone.add(beam);

    const glowGeometry = new THREE.SphereGeometry(0.7, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00aaff,
      transparent: true,
      opacity: 0.8,
    });

    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.y = -0.6;
    glow.visible = false;
    drone.add(glow);

    drone.position.set(0, DRONE_HEIGHT + DRONE_SCAN_OFFSET, 35);
    drone.rotation.x = -0.1;

    sceneRef.current.add(drone);
    droneRef.current = drone;
  };

  const createLidarVisualizers = () => {
    if (!sceneRef.current) return;

    const canopyPointsGeometry = new THREE.BufferGeometry();
    canopyPointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));

    const canopyPointsMaterial = new THREE.PointsMaterial({
      color: 0x00ff00,
      size: 0.3,
      sizeAttenuation: true,
    });

    const canopyPoints = new THREE.Points(canopyPointsGeometry, canopyPointsMaterial);
    canopyPoints.name = 'canopyHits';
    sceneRef.current.add(canopyPoints);

    const groundPointsGeometry = new THREE.BufferGeometry();
    groundPointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));

    const groundPointsMaterial = new THREE.PointsMaterial({
      color: 0x0088ff,
      size: 0.3,
      sizeAttenuation: true,
    });

    const groundPoints = new THREE.Points(groundPointsGeometry, groundPointsMaterial);
    groundPoints.name = 'groundHits';
    sceneRef.current.add(groundPoints);

    const structurePointsGeometry = new THREE.BufferGeometry();
    structurePointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));

    const structurePointsMaterial = new THREE.PointsMaterial({
      color: 0xff6600,
      size: 0.4,
      sizeAttenuation: true,
    });

    const structurePoints = new THREE.Points(structurePointsGeometry, structurePointsMaterial);
    structurePoints.name = 'structureHits';
    sceneRef.current.add(structurePoints);

    const beamLinesGeometry = new THREE.BufferGeometry();
    beamLinesGeometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));

    const beamLinesMaterial = new THREE.LineBasicMaterial({
      color: 0xffff00,
      transparent: true,
      opacity: 0.6,
    });

    const beamLines = new THREE.LineSegments(beamLinesGeometry, beamLinesMaterial);
    beamLines.name = 'beamLines';
    sceneRef.current.add(beamLines);
  };

  const setupControls = () => {
    if (!containerRef.current || !cameraRef.current) return;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const keyState = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      '+': false,
      '-': false,
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (Object.prototype.hasOwnProperty.call(keyState, e.key)) {
        keyState[e.key as keyof typeof keyState] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (Object.prototype.hasOwnProperty.call(keyState, e.key)) {
        keyState[e.key as keyof typeof keyState] = false;
      }
    };

    const handleKeyboardControls = () => {
      if (!cameraRef.current) return;

      const camera = cameraRef.current;
      const cameraPosition = camera.position.clone();
      const distance = cameraPosition.length();

      if (keyState['+'] && distance > MIN_ZOOM) {
        cameraPosition.multiplyScalar(1 - ZOOM_SPEED / distance);
      }
      if (keyState['-'] && distance < MAX_ZOOM) {
        cameraPosition.multiplyScalar(1 + ZOOM_SPEED / distance);
      }

      const panVector = new THREE.Vector3();
      if (keyState.ArrowUp) panVector.z -= PAN_SPEED;
      if (keyState.ArrowDown) panVector.z += PAN_SPEED;
      if (keyState.ArrowLeft) panVector.x -= PAN_SPEED;
      if (keyState.ArrowRight) panVector.x += PAN_SPEED;

      panVector.applyQuaternion(camera.quaternion);
      cameraPosition.add(panVector);

      if (keyState.ArrowLeft || keyState.ArrowRight) {
        const rotationAxis = new THREE.Vector3(0, 1, 0);
        const rotationAngle = (keyState.ArrowLeft ? 1 : -1) * ROTATE_SPEED;
        cameraPosition.applyAxisAngle(rotationAxis, rotationAngle);
      }

      camera.position.copy(cameraPosition);
      camera.lookAt(0, 0, 0);

      updateCompass();
    };

    const handleMouseDown = (e: MouseEvent): void => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent): void => {
      if (!isDragging) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      if (cameraRef.current) {
        const camera = cameraRef.current;
        const cameraPosition = camera.position.clone();

        cameraPosition.x =
          camera.position.x * Math.cos(deltaMove.x * 0.01) + camera.position.z * Math.sin(deltaMove.x * 0.01);
        cameraPosition.z =
          camera.position.z * Math.cos(deltaMove.x * 0.01) - camera.position.x * Math.sin(deltaMove.x * 0.01);

        cameraPosition.y -= deltaMove.y * 0.5;

        cameraPosition.y = Math.max(10, Math.min(120, cameraPosition.y));

        camera.position.copy(cameraPosition);
        camera.lookAt(0, 0, 0);

        updateCompass();
      }

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };
    const handleWheel = (e: globalThis.WheelEvent): void => {
      if (!cameraRef.current) return;

      const camera = cameraRef.current;
      const direction = camera.position.clone().normalize();
      const currentDistance = camera.position.length();
      const delta = e.deltaY * 0.1;

      let newDistance = currentDistance + delta;

      newDistance = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newDistance));

      camera.position.copy(direction.multiplyScalar(newDistance));
      camera.lookAt(0, 0, 0);
    };

    containerRef.current.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    containerRef.current.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const animateWithControls = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

      handleKeyboardControls();

      updateDrone();
      updateScanEffects();
      updateTweens();

      rendererRef.current.render(sceneRef.current, cameraRef.current);

      animationFrameRef.current = requestAnimationFrame(animateWithControls);
    };

    animationFrameRef.current = requestAnimationFrame(animateWithControls);

    return () => {
      if (!containerRef.current) return;

      containerRef.current.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      containerRef.current.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  };

  const setupTouchControls = () => {
    if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

    const controls = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = MIN_ZOOM;
    controls.maxDistance = MAX_ZOOM;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.target.set(0, 0, 0);
    controls.update();

    containerRef.current.addEventListener('contextmenu', (e) => e.preventDefault());

    animationFrameRef.current = requestAnimationFrame(function animate() {
      controls.update();
      if (sceneRef.current && cameraRef.current) {
        rendererRef.current?.render(sceneRef.current, cameraRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    });
  };

  useEffect(() => {
    setupControls();
    setupTouchControls();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    updateDrone();
    updateScanEffects();
    updateTweens();

    rendererRef.current.render(sceneRef.current, cameraRef.current);

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const updateDrone = () => {
    if (!droneRef.current) return;

    const drone = droneRef.current;

    drone.children.forEach((child) => {
      if (child.userData && child.userData.rotorSpeed) {
        child.rotation.y += child.userData.rotorSpeed;
      }
    });

    drone.position.y = DRONE_HEIGHT + DRONE_SCAN_OFFSET + Math.sin(Date.now() * 0.001) * 0.5;
  };
  const updateScanEffects = () => {
    if (!droneRef.current || !isScanning || scanProgress >= 100) return;

    const drone = droneRef.current;
    const time = Date.now() * 0.001;

    drone.children.forEach((child) => {
      if ((child as THREE.Mesh).geometry) {
        if ((child as THREE.Mesh).geometry?.type === 'ConeGeometry') {
          child.scale.x = child.scale.z = 0.95 + Math.sin(time * 5) * 0.05;
          if ((child as THREE.Mesh).material) {
            ((child as THREE.Mesh).material as THREE.Material).opacity = 0.3 + Math.sin(time * 3) * 0.2;
          }

          child.rotation.x = 0;
        } else if ((child as THREE.Mesh).geometry?.type === 'SphereGeometry' && child.position.y < 0) {
          child.scale.set(
            0.9 + Math.sin(time * 7) * 0.3,
            0.9 + Math.sin(time * 7) * 0.3,
            0.9 + Math.sin(time * 7) * 0.3,
          );
        } else if ((child as THREE.Mesh).geometry?.type === 'CylinderGeometry' && child.position.y < 0) {
          child.rotation.x = Math.PI / 2;
        }
      }
    });
  };

  const updateTweens = () => {
    if (tweensRef.current.length === 0) return;

    const activeTweens: TweenObject[] = [];

    tweensRef.current.forEach((tween) => {
      if (tween.update()) {
        activeTweens.push(tween);
      }
    });

    tweensRef.current = activeTweens;
  };

  const startScan = () => {
    if (isScanning) return;
    if (!hasStartedScan) {
      onInteraction({
        'step-1-completed': true,
      });
      console.log('LidarSimulation: Start scan button clicked for the first time');
      setHasStartedScan(true);
    }
    setIsScanning(true);
    setScanProgress(0);
    setMessage(t(lidarSimulationConfig.messages.initiating));

    activateDroneScanEffects();

    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }

    canopyHits.current = [];
    groundHits.current = [];
    structureHits.current = [];
    updatePointClouds([]);

    if (document.getElementById('filtered-view-toggle')) {
      const toggleButton = document.getElementById('filtered-view-toggle');
      if (toggleButton) {
        toggleButton.style.display = 'block';
      }
    }

    const scanDuration = 12000;
    const updateInterval = 100;
    const totalUpdates = Math.floor(scanDuration / updateInterval);
    let currentUpdate = 0;

    scanIntervalRef.current = setInterval(() => {
      currentUpdate++;
      const progress = Math.min((currentUpdate / totalUpdates) * 100, 100);

      setScanProgress(progress);

      performScanStep(progress);

      if (showFilteredView && filteredViewRef.current && filteredViewRef.current.style.display !== 'none') {
        updateFilteredDataView();
      }

      if (progress >= 35 && !discoveries.pathwayFound) {
        discoverPathway();
      }

      if (progress >= 65 && !discoveries.cityFound) {
        discoverCity();
      }

      if (progress >= 100) {
        setScanProgress(100);
        completeScan();
      }
    }, updateInterval);
  };

  const stopScan = () => {
    if (!isScanning) return;

    setIsScanning(false);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    setMessage(t(lidarSimulationConfig.messages.paused));

    deactivateDroneScanEffects();
  };

  const activateDroneScanEffects = () => {
    if (!droneRef.current) return;
    const drone = droneRef.current;
    drone.children.forEach((child) => {
      if ((child as THREE.Mesh).geometry && (child as THREE.Mesh).geometry.type === 'ConeGeometry') {
        child.visible = true;
      }
      if ((child as THREE.Mesh).geometry && (child as THREE.Mesh).geometry.type === 'SphereGeometry') {
        child.visible = true;
      }
      if (
        (child as THREE.Mesh).geometry &&
        (child as THREE.Mesh).geometry.type === 'CylinderGeometry' &&
        child.position.y < 0
      ) {
        if ((child as THREE.Mesh).material) {
          ((child as THREE.Mesh).material as THREE.MeshStandardMaterial).emissiveIntensity = 1.0;
        }
      }
    });
  };

  const deactivateDroneScanEffects = () => {
    if (!droneRef.current) return;

    const drone = droneRef.current;

    drone.children.forEach((child) => {
      if (
        (child as THREE.Mesh).geometry &&
        ((child as THREE.Mesh).geometry.type === 'ConeGeometry' ||
          (child as THREE.Mesh).geometry.type === 'SphereGeometry')
      ) {
        child.visible = false;
      }
    });
  };

  interface PerformScanStepParams {
    progress: number;
  }

  const performScanStep = (progress: PerformScanStepParams['progress']): void => {
    if (!sceneRef.current || !droneRef.current) return;

    const scene = sceneRef.current;
    const drone = droneRef.current;

    let pointsToAdd: number;

    if (progress < 30) {
      pointsToAdd = 50 + Math.floor(progress * 3);
    } else if (progress < 70) {
      pointsToAdd = 150 + Math.floor((progress - 30) * 5);
    } else {
      pointsToAdd = 350 + Math.floor((progress - 70) * 10);
    }

    const beamVertices: number[] = [];

    const raycaster = new THREE.Raycaster();

    if (progress > 35 && progress < 50 && !discoveries.pathwayFound) {
      const targetX = 0;
      const targetZ = 0;

      if (droneRef.current) {
        const drone = droneRef.current;
        drone.position.x += (targetX - drone.position.x) * 0.02;
        drone.position.z += (targetZ - drone.position.z) * 0.02;
      }
    } else if (progress > 60 && progress < 75 && !discoveries.cityFound) {
      const targetX = CITY_CENTER.x;
      const targetZ = CITY_CENTER.z;

      if (droneRef.current) {
        const drone = droneRef.current;
        drone.position.x += (targetX - drone.position.x) * 0.02;
        drone.position.z += (targetZ - drone.position.z) * 0.02;
      }
    }

    const ensureStructureHits = progress > 20 && structureHits.current.length < progress * 5;

    for (let i = 0; i < pointsToAdd; i++) {
      let x: number, z: number;

      const forceStructureHit = ensureStructureHits && Math.random() < 0.1;

      if (forceStructureHit) {
        if (Math.random() < 0.5) {
          x = (Math.random() - 0.5) * 80;
          z = (Math.random() - 0.5) * 8;
        } else {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * CITY_RADIUS * 0.8;
          x = CITY_CENTER.x + Math.cos(angle) * distance;
          z = CITY_CENTER.z + Math.sin(angle) * distance;
        }
      } else if (progress < 40) {
        x = (Math.random() - 0.5) * JUNGLE_SIZE;
        z = (Math.random() - 0.5) * JUNGLE_SIZE;
      } else if (progress < 70) {
        if (Math.random() < 0.6) {
          x = (Math.random() - 0.5) * JUNGLE_SIZE;
          z = (Math.random() - 0.5) * 20;
        } else {
          x = (Math.random() - 0.5) * JUNGLE_SIZE;
          z = (Math.random() - 0.5) * JUNGLE_SIZE;
        }
      } else {
        if (Math.random() < 0.7) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * CITY_RADIUS;
          x = CITY_CENTER.x + Math.cos(angle) * distance;
          z = CITY_CENTER.z + Math.sin(angle) * distance;
        } else {
          x = (Math.random() - 0.5) * JUNGLE_SIZE;
          z = (Math.random() - 0.5) * 15;
        }
      }

      const rayOrigin = new THREE.Vector3(
        drone.position.x + (Math.random() - 0.5) * 5,
        drone.position.y,
        drone.position.z + (Math.random() - 0.5) * 5,
      );

      const rayDirection = new THREE.Vector3(x - rayOrigin.x, -drone.position.y, z - rayOrigin.z).normalize();

      const noiseAmount = forceStructureHit ? 0.05 : 0.1;
      rayDirection.x += (Math.random() - 0.5) * noiseAmount;
      rayDirection.z += (Math.random() - 0.5) * noiseAmount;
      rayDirection.normalize();

      raycaster.set(rayOrigin, rayDirection);

      const intersects: THREE.Intersection[] = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        let hitObject: THREE.Object3D | null = null;
        let hitPoint: THREE.Vector3 | null = null;

        for (const hit of intersects) {
          if (hit.object.visible) {
            hitObject = hit.object;
            hitPoint = hit.point;
            break;
          }
        }

        if (hitObject && hitPoint) {
          if (canopyRef.current && isDescendantOf(hitObject, canopyRef.current)) {
            canopyHits.current.push(hitPoint.x, hitPoint.y, hitPoint.z);
          } else if (hitObject === groundRef.current) {
            groundHits.current.push(hitPoint.x, hitPoint.y + 0.1, hitPoint.z);

            if (cityGroupRef.current) {
              const distToCity = Math.sqrt(
                Math.pow(hitPoint.x - CITY_CENTER.x, 2) + Math.pow(hitPoint.z - CITY_CENTER.z, 2),
              );

              const nearCity = distToCity < CITY_RADIUS * 1.2;
              const nearPathway = Math.abs(hitPoint.z) < 5 && Math.abs(hitPoint.x) < 45;

              if (
                nearCity ||
                nearPathway ||
                (discoveries.pathwayFound && Math.random() < 0.2) ||
                (discoveries.cityFound && Math.random() < 0.3) ||
                (progress > 50 && Math.random() < 0.1)
              ) {
                const hitHeight = 2 + Math.random() * 8;

                structureHits.current.push(hitPoint.x, hitPoint.y + hitHeight / 2, hitPoint.z);
              }
            }

            beamVertices.push(rayOrigin.x, rayOrigin.y, rayOrigin.z);
            beamVertices.push(hitPoint.x, hitPoint.y + 0.1, hitPoint.z);
          }
        }
      }
    }

    updatePointClouds(beamVertices);

    if (showFilteredView && filteredViewRef.current && filteredViewRef.current.style.display !== 'none') {
      updateFilteredDataView();
    }
  };

  interface IsDescendantOfParams {
    object: THREE.Object3D;
    parent: THREE.Object3D;
  }

  const isDescendantOf = (
    object: IsDescendantOfParams['object'],
    parent: IsDescendantOfParams['parent'],
  ): boolean => {
    let current: THREE.Object3D | null = object;

    while (current) {
      if (current === parent) return true;
      current = current.parent;
    }

    return false;
  };

  const updatePointClouds = (beamVertices: BeamVertices) => {
    if (!sceneRef.current) return;

    const scene = sceneRef.current;

    const geometries = {
      canopy: scene.getObjectByName('canopyHits') as THREE.Points,
      ground: scene.getObjectByName('groundHits') as THREE.Points,
      structure: scene.getObjectByName('structureHits') as THREE.Points,
      beam: scene.getObjectByName('beamLines') as THREE.LineSegments,
    };

    if (geometries.canopy?.geometry) {
      const positions = new THREE.Float32BufferAttribute(canopyHits.current, 3);
      geometries.canopy.geometry.setAttribute('position', positions);
      geometries.canopy.geometry.attributes.position.needsUpdate = true;
    }

    if (geometries.ground?.geometry) {
      const positions = new THREE.Float32BufferAttribute(groundHits.current, 3);
      geometries.ground.geometry.setAttribute('position', positions);
      geometries.ground.geometry.attributes.position.needsUpdate = true;
    }

    if (geometries.structure?.geometry) {
      const positions = new THREE.Float32BufferAttribute(structureHits.current, 3);
      geometries.structure.geometry.setAttribute('position', positions);
      geometries.structure.geometry.attributes.position.needsUpdate = true;
    }

    if (geometries.beam?.geometry) {
      const positions = new THREE.Float32BufferAttribute(beamVertices, 3);
      geometries.beam.geometry.setAttribute('position', positions);
      geometries.beam.geometry.attributes.position.needsUpdate = true;
    }

    setStats({
      canopyHits: canopyHits.current.length / 3,
      groundHits: groundHits.current.length / 3,
      structureHits: structureHits.current.length / 3,
    });
  };

  interface TweenObject {
    update: () => boolean;
  }

  interface TweenTarget {
    [key: string]: number;
  }

  const createTween = (
    object: Record<string, number> | THREE.Vector3,
    target: TweenTarget,
    duration: number = 1000,
  ): TweenObject => {
    const startTime = Date.now();
    const startValues: Record<string, number> = {};

    if (object instanceof THREE.Vector3) {
      startValues.x = object.x;
      startValues.y = object.y;
      startValues.z = object.z;
    } else {
      Object.keys(target).forEach((key) => {
        if (object[key] !== undefined) {
          startValues[key] = object[key];
        }
      });
    }

    const tween: TweenObject = {
      update: () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const t = 1 - (1 - progress) * (1 - progress);

        if (object instanceof THREE.Vector3) {
          object.x = startValues.x + (target.x - startValues.x) * t;
          object.y = startValues.y + (target.y - startValues.y) * t;
          object.z = startValues.z + (target.z - startValues.z) * t;
        } else {
          Object.keys(target).forEach((key) => {
            if (startValues[key] !== undefined) {
              object[key] = startValues[key] + (target[key] - startValues[key]) * t;
            }
          });
        }

        return progress < 1;
      },
    };

    tweensRef.current.push(tween);

    return tween;
  };

  const discoverPathway = () => {
    if (!pathwayRef.current || discoveries.pathwayFound) return;

    setDiscoveries((prev) => ({ ...prev, pathwayFound: true }));
    setMessage(t(lidarSimulationConfig.messages.pathwayFound));

    const pathway = pathwayRef.current;
    pathway.visible = true;
    pathway.position.y = 0.5;

    if (isScanning) activateDroneScanEffects();

    const material = pathway.material as THREE.MeshStandardMaterial;
    material.emissive = new THREE.Color(0x88ccff);
    material.emissiveIntensity = 1;
    setTimeout(() => {
      createTween({ emissiveIntensity: material.emissiveIntensity }, { emissiveIntensity: 0 }, 1500);
    }, 500);
    if (showFilteredView && filteredViewRef.current && filteredViewRef.current.style.display !== 'none') {
      updateFilteredDataView();
    }
  };

  const discoverCity = () => {
    if (!cityGroupRef.current || discoveries.cityFound) return;

    setDiscoveries((prev) => ({ ...prev, cityFound: true }));
    setMessage(t(lidarSimulationConfig.messages.cityFound));
    setShowStructures(true);
  };
  const completeScan = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    setIsScanning(false);
    setDiscoveries((prev) => ({ ...prev, scanComplete: true }));
    setMessage(t(lidarSimulationConfig.messages.complete));
    setShowStructures(true);
    if (cityGroupRef.current) {
      cityGroupRef.current.children.forEach((structure) => {
        structure.visible = true;
        if (structure instanceof THREE.Mesh) {
          const material = structure.material as THREE.MeshStandardMaterial;
          material.emissive = new THREE.Color(0xffaa00);
          material.emissiveIntensity = 0.5;
          createTween(
            { x: structure.position.x, y: structure.position.y, z: structure.position.z },
            { emissiveIntensity: 1 },
            800,
          );
        }
      });
    }
    generateFallbackPoints();
    deactivateDroneScanEffects();
    if (!showFilteredView) {
      handleShowDataAnalysis();
    } else if (filteredViewRef.current && filteredViewRef.current.style.display !== 'none') {
      forceUpdateFilteredView();
    }
  };

  const disposeScene = () => {
    if (!sceneRef.current) return;

    (sceneRef.current as THREE.Scene)?.traverse((object: THREE.Object3D) => {
      const mesh = object as THREE.Mesh;
      if (mesh.geometry) {
        mesh.geometry.dispose();
      }

      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material: THREE.Material) => material.dispose());
        } else {
          (mesh.material as THREE.Material).dispose();
        }
      }
    });
  };

  const worldToCanvasX = (worldX: number): number => {
    if (!filteredViewRef.current) return 0;
    return filteredViewRef.current.width / 2 + worldX * (filteredViewRef.current.width / JUNGLE_SIZE / 1.5);
  };

  const worldToCanvasZ = (worldZ: number): number => {
    if (!filteredViewRef.current) return 0;
    return filteredViewRef.current.height / 2 + worldZ * (filteredViewRef.current.height / JUNGLE_SIZE / 1.5);
  };

  return (
    <div className="w-full h-[calc(80vh-4px)] bg-gray-900 relative overflow-hidden" ref={containerRef}>
      <span className="sr-only">{t(lidarSimulationConfig.graphDescription)}</span>
      <div className="absolute top-3 left-3 bg-black bg-opacity-70 p-3 rounded-lg text-white text-base max-w-xs z-10">
        <p className="font-bold text-base mb-2">{t(lidarSimulationConfig.labels.title)}</p>
        <p className="my-1">{t(lidarSimulationConfig.labels.rotate)}</p>
        <p className="my-1">{t(lidarSimulationConfig.labels.canopyHits)}</p>
        <p className="my-1">{t(lidarSimulationConfig.labels.groundHits)}</p>
        <p className="my-1">
          <span className="text-orange-400">{t(lidarSimulationConfig.labels.structureHits)}</span>
        </p>

        <div className="mt-4 pt-2 border-t border-slate-700">
          {!isScanning ? (
            <button
              onClick={startScan}
              className="w-full py-2 bg-[#006BE0] text-white rounded flex items-center justify-center font-semibold hover:from-blue-700 hover:to-cyan-700 transition-colors"
            >
              {t(lidarSimulationConfig.labels.startScan)}
            </button>
          ) : (
            <button
              onClick={stopScan}
              className="w-full py-2 bg-[#A6001A] text-white rounded flex items-center justify-center font-semibold hover:from-red-700 hover:to-rose-700 transition-colors"
            >
              {t(lidarSimulationConfig.labels.stopScan)}
            </button>
          )}

          {(isScanning || scanProgress > 0) && (
            <div className="mt-2">
              <div className="flex justify-between text-base mb-1">
                <span>{t(lidarSimulationConfig.labels.scanProgress)}</span>
                <span>{Math.round(scanProgress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden relative">
                <div 
                  className="h-full bg-[#006BE0] rounded-full transition-all duration-100 ease-out absolute top-0 left-0"
                  style={{ 
                    width: `${Math.min(Math.max(scanProgress, 0), 100)}%`,
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {(discoveries.pathwayFound || discoveries.cityFound) && (
          <div className="mt-3 pt-2 border-t border-slate-700">
            <p className="font-semibold text-cyan-300 mb-1">{t(lidarSimulationConfig.labels.discoveries)}</p>
            <ul className="space-y-1 text-base">
              {discoveries.pathwayFound && (
                <li className="flex items-center text-cyan-100">
                  <span className="h-2 w-2 bg-cyan-400 rounded-full mr-2"></span>
                  {t(lidarSimulationConfig.labels.pathwayDiscovered)}
                </li>
              )}
              {discoveries.cityFound && (
                <li className="flex items-center text-amber-100">
                  <span className="h-2 w-2 bg-amber-400 rounded-full mr-2"></span>
                  {t(lidarSimulationConfig.labels.cityDiscovered)}
                </li>
              )}
              {discoveries.scanComplete && (
                <li className="flex items-center text-emerald-100">
                  <span className="h-2 w-2 bg-emerald-400 rounded-full mr-2"></span>
                  {t(lidarSimulationConfig.labels.scanComplete)}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {showFilteredView && (
        <button
          onClick={() => {
            setShowFilteredView(false);
            if (filteredViewRef.current) {
              filteredViewRef.current.style.display = 'none';
            }
            if (document.getElementById('filtered-view-toggle')) {
              const toggleButton = document.getElementById('filtered-view-toggle');
              if (toggleButton) {
                toggleButton.style.display = 'block';
              }
            }
          }}
          className="absolute top-3 right-3 -mt-2 -mr-2 z-20 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-base font-bold hover:bg-red-600 transition-colors"
          tabIndex={0}
          autoFocus
        >
          ×
        </button>
      )}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 py-2 px-4 rounded-lg text-center max-w-lg">
        <p className="text-base text-white">{message}</p>
      </div>
    </div>
  );
};

export default LidarSimulation;
