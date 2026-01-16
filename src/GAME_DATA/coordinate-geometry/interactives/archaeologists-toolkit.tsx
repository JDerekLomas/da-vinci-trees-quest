import React, { useState, useEffect, useRef } from 'react';
import { useGameContext } from '../../../hooks/useGameContext';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import AncientCityConfig from '../configs/archaeologists-toolkit';
import * as THREE from 'three';
import parse from 'html-react-parser';

interface AncientCityExplorerProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

interface Payload {
  target: string;
  step: number;
}
interface FeaturePoint {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
}

interface Feature {
  id: string;
  name: string;
  color: number;
  position: THREE.Vector3;
  size: { width: number; height: number; depth: number };
  description: string;
  labelOffset: THREE.Vector3;
  points: FeaturePoint[];
}

const AncientCityExplorer: React.FC<AncientCityExplorerProps> = ({ onInteraction }) => {
  const { features, totalSteps, additionalStructures, getCalculationMethod, translations } = AncientCityConfig;

  const { dialogIndex } = useGameContext();
  const isFirstIndex = dialogIndex === 1;
  const [currentStep, setCurrentStep] = useState(isFirstIndex ? 1 : totalSteps);

  const { payload } = useEventListener('archaeologists-toolkit') as { payload: Payload };
  const { t } = useTranslations();
  const { step1, step2 } = translations;

  // Layer visibility state - Added ground layer and grid
  const [layerFilters, setLayerFilters] = useState({
    vegetation: true,
    structures: true,
    grid: true,
  });

  // Measurement state
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [selectedPoints, setSelectedPoints] = useState<FeaturePoint[]>([]);
  const [measurementResults, setMeasurementResults] = useState({
    perimeter: '0 ft',
    area: '0 sq ft',
    method: '',
  });

  // Three.js references
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const topDownCameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const vegetationRef = useRef<THREE.Group | null>(null);
  const structuresRef = useRef<THREE.Group | null>(null);
  const gridRef = useRef<THREE.GridHelper | null>(null);
  const labelsRef = useRef<Record<string, THREE.Sprite | null>>({});
  const pointMarkersRef = useRef<THREE.Mesh[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const raycasterRef = useRef<THREE.Raycaster | null>(null);
  const outlineRef = useRef<THREE.Line | null>(null);
  const orbitControlsRef = useRef<OrbitControls | null>(null);

  // handle slides
  useEffect(() => {
    if (payload && payload.step !== currentStep) {
      setCurrentStep(payload.step);
    }
  }, [currentStep, payload]);

  useEffect(() => {
    if (!layerFilters.vegetation) {
      onInteraction({
        'step-1-completed': true,
      });
    }
  }, [layerFilters.vegetation, onInteraction]);

  // Initialize Three.js scene
  useEffect(() => {
    // Capture the container reference at the start of the effect
    const container = containerRef.current;
    if (!container) return;

    const initScene = () => {
      try {
        // Create scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0c1721); // Dark blue-gray
        sceneRef.current = scene;
        // Create camera
        const width = container.clientWidth;
        const height = container.clientHeight;
        // Perspective camera for 3D view
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(580, 200, 520);
        camera.lookAt(330, 0, 220); // Look at center (330, 220)
        cameraRef.current = camera;
        // Create orthographic camera for top-down view
        const aspectRatio = width / height;
        const viewSize = 150; // Adjusted for better framing
        const orthoCamera = new THREE.OrthographicCamera(
          -viewSize * aspectRatio,
          viewSize * aspectRatio,
          viewSize,
          -viewSize,
          0.1,
          1000,
        );
        orthoCamera.position.set(330, 200, 220); // Position over the center (330, 220)
        orthoCamera.lookAt(330, 0, 220); // Look at center (330, 220)
        orthoCamera.up.set(0, 0, -1); // Set up direction for top-down view
        topDownCameraRef.current = orthoCamera;
        // Create renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;
        // Setup raycaster
        raycasterRef.current = new THREE.Raycaster();
        // Add lights
        setupLighting(scene);
        // Create base platform for the entire city
        createCityPlatform(scene);
        // Create ancient city structures
        createAncientCity(scene);
        // Create vegetation
        createVegetation(scene);
        // Create sacbe (raised limestone road)
        createSacbe(scene);
        // Add event listeners for camera control and point clicking
        setupCameraControls();
        // Add window resize handler
        window.addEventListener('resize', handleResize);
        // Start animation loop
        animate();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error('Initialization error:', err);
      }
    };
    initScene();
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      // Clean up Three.js objects
      if (rendererRef.current && container) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Modified: Keep the grid visible in the measurement step but adjust camera when step changes
  useEffect(() => {
    if (currentStep === 2) {
      // Switch to orthographic top-down view for measurement step but keep grid visible
      if (rendererRef.current && sceneRef.current && topDownCameraRef.current) {
        cancelAnimationFrame(animationFrameId.current!);
        // Ensure we're using the top-down camera
        rendererRef.current.render(sceneRef.current, topDownCameraRef.current);
        // Make sure grid is visible
        if (gridRef.current) {
          gridRef.current.visible = layerFilters.grid;
        }
        // Restart animation loop with top-down camera
        animationFrameId.current = requestAnimationFrame(animate);
      }
      if (vegetationRef.current?.visible) {
        setLayerFilters((prev) => ({ ...prev, vegetation: false}));
        vegetationRef.current.visible = false;
      }
    } else {
      // Reset to perspective camera view for filtering step
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        cancelAnimationFrame(animationFrameId.current!);
        cameraRef.current.position.set(580, 200, 520);
        cameraRef.current.lookAt(330, 0, 220); // Look at center (330, 220)
        // Ensure we're using the perspective camera
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        // Restart animation loop with perspective camera
        animationFrameId.current = requestAnimationFrame(animate);
        resetMeasurement();
        selectFeature('');
      }
    }
    handleResize();
  }, [currentStep]);
  // Effect to update measurements when selected points change
  useEffect(() => {
    if (selectedPoints.length >= 2) {
      updateMeasurements(selectedPoints);
    }
  }, [selectedPoints]);
  // Enhanced update measurements to use structure-specific formulas
  const updateMeasurements = (points: FeaturePoint[]) => {
    if (points.length < 2) return;
    // Initialize values
    let perimeter = 0;
    let area = 0;
    // Calculate perimeter - sum of all side lengths
    if (points.length >= 2) {
      perimeter = 0;
      for (let i = 0; i < points.length; i++) {
        const current = points[i].position;
        const next = points[(i + 1) % points.length].position;
        const segmentLength = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.z - current.z, 2));
        perimeter += segmentLength;
      }
    }
    // Calculate structure-specific measurements based on the selected feature
    if (selectedFeature) {
      if (selectedFeature.id === 'triangleGarden') {
        // For Triangle Garden: always prefer corner points if available
        const cornerPoints = points.filter((p) => p.name === 'A' || p.name === 'B' || p.name === 'C');
        if (cornerPoints.length === 3) {
          // Recalculate perimeter with just the corner points for accuracy
          perimeter = 0;
          const sides = [];
          for (let i = 0; i < 3; i++) {
            const current = cornerPoints[i].position;
            const next = cornerPoints[(i + 1) % 3].position;
            const sideLength = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.z - current.z, 2));
            perimeter += sideLength;
            sides.push(sideLength);
          }
          // Calculate area using Heron's formula
          const [a, b, c] = sides;
          const s = perimeter / 2; // Semi-perimeter
          area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        } else if (points.length >= 3) {
          // Use Shoelace formula for area with any 3+ points
          area = calculateShoelaceArea(points);
        }
      } else if (selectedFeature.id === 'plaza') {
        // For Rectangle Plaza: Check if we have all 4 corners
        const cornerPoints = points.filter(
          (p) => p.name === 'A' || p.name === 'B' || p.name === 'C' || p.name === 'D',
        );
        if (cornerPoints.length === 4) {
          // Get width and height from the points
          const xCoords = cornerPoints.map((p) => p.position.x);
          const zCoords = cornerPoints.map((p) => p.position.z);
          const minX = Math.min(...xCoords);
          const maxX = Math.max(...xCoords);
          const minZ = Math.min(...zCoords);
          const maxZ = Math.max(...zCoords);
          const width = maxX - minX;
          const height = maxZ - minZ;
          // Rectangle perimeter = 2(w + h)
          perimeter = 2 * (width + height);
          // Rectangle area = w × h
          area = width * height;
        } else if (points.length >= 3) {
          // Generic calculations for other point combinations
          area = calculateShoelaceArea(points);
        }
      } else if (selectedFeature.id === 'reservoir') {
        // For Circle Reservoir: Check if we have center and edge points
        const centerPoint = points.find((p) => p.name === 'E');
        const edgePoints = points.filter((p) => p.name !== 'E');
        if (centerPoint && edgePoints.length > 0) {
          // Calculate radius as average distance from center to edges
          let sumRadius = 0;
          for (const edge of edgePoints) {
            sumRadius += Math.sqrt(
              Math.pow(edge.position.x - centerPoint.position.x, 2) +
                Math.pow(edge.position.z - centerPoint.position.z, 2), // Changed from y to z
            );
          }
          const radius = sumRadius / edgePoints.length;
          // Circle perimeter = 2πr
          perimeter = 2 * Math.PI * radius;
          // Circle area = πr²
          area = Math.PI * radius * radius;
        } else if (points.length >= 3) {
          // Use Shoelace formula as fallback
          area = calculateShoelaceArea(points);
        }
      } else if (selectedFeature.id === 'ballCourt') {
        // For Polygon Court
        const centerPoint = points.find((p) => p.name === 'E');
        const edgePoints = points.filter((p) => p.name !== 'E');
        if (centerPoint && edgePoints.length >= 3) {
          // Calculate as regular polygon
          let sumRadius = 0;
          for (const edge of edgePoints) {
            sumRadius += Math.sqrt(
              Math.pow(edge.position.x - centerPoint.position.x, 2) +
                Math.pow(edge.position.z - centerPoint.position.z, 2), // Changed from y to z
            );
          }
          const avgRadius = sumRadius / edgePoints.length;
          const sides = edgePoints.length;
          // Regular polygon perimeter = n × 2 × r × sin(π/n)
          perimeter = sides * 2 * avgRadius * Math.sin(Math.PI / sides);
          // Regular polygon area = (1/2) × n × r² × sin(2π/n)
          area = (1 / 2) * sides * avgRadius * avgRadius * Math.sin((2 * Math.PI) / sides);
        } else if (points.length >= 3) {
          // Use Shoelace formula as fallback
          area = calculateShoelaceArea(points);
        }
      } else if (points.length >= 3) {
        // For any other feature types
        area = calculateShoelaceArea(points);
      }
    } else if (points.length >= 3) {
      // If no feature is selected but we have 3+ points
      area = calculateShoelaceArea(points);
    }
    // Helper function for Shoelace formula
    function calculateShoelaceArea(pts: FeaturePoint[]) {
      let shoelaceArea = 0;
      for (let i = 0; i < pts.length; i++) {
        const current = pts[i].position;
        const next = pts[(i + 1) % pts.length].position;
        shoelaceArea += current.x * next.z - next.x * current.z; // Changed y to z
      }
      return Math.abs(shoelaceArea) / 2;
    }
    // Add a calculation method description
    const calculationMethod = getCalculationMethod(selectedFeature?.id ?? '');
    // Convert measurements to imperial units (feet) and update state with more precision
    // Assuming 1 unit = 1 foot for simplicity
    setMeasurementResults({
      perimeter: Math.round(perimeter * 100) / 100 + ' ft',
      area: Math.round(area * 100) / 100 + ' sq ft',
      method: calculationMethod, // Add calculation method
    });
  };
  // Create a sacbe (raised limestone road)
  const createSacbe = (scene: THREE.Scene) => {
    // Create a group for the sacbe
    const sacbeGroup = new THREE.Group();
    sacbeGroup.userData = { type: 'structures' };
    // Create road material - white limestone material
    const roadMaterial = new THREE.MeshStandardMaterial({
      color: 0xeae6de, // Light limestone color
      roughness: 0.7,
      metalness: 0.1,
    });
    // Create main road running east-west through center of site
    const mainRoadWidth = 15;
    const mainRoadGeometry = new THREE.BoxGeometry(250, 1.5, mainRoadWidth);
    const mainRoad = new THREE.Mesh(mainRoadGeometry, roadMaterial);
    mainRoad.position.set(330, 1, 220); // Center of the site
    mainRoad.receiveShadow = true;
    mainRoad.castShadow = true;
    sacbeGroup.add(mainRoad);
    // Add a north-south branch road connecting to Triangle Garden and Reservoir
    const branchRoadGeometry = new THREE.BoxGeometry(15, 1.5, 70);
    const branchRoad = new THREE.Mesh(branchRoadGeometry, roadMaterial);
    branchRoad.position.set(290, 1, 200); // Position to connect to Triangle Garden/Reservoir
    branchRoad.receiveShadow = true;
    branchRoad.castShadow = true;
    sacbeGroup.add(branchRoad);
    // Add road edges/curbs - slightly darker material
    const curbMaterial = new THREE.MeshStandardMaterial({
      color: 0xd9d3c8, // Slightly darker limestone color
      roughness: 0.8,
      metalness: 0.1,
    });
    // Main road edges
    const mainRoadCurb1Geometry = new THREE.BoxGeometry(250, 2, 1);
    const mainRoadCurb1 = new THREE.Mesh(mainRoadCurb1Geometry, curbMaterial);
    mainRoadCurb1.position.set(330, 1, 220 + mainRoadWidth / 2 + 0.5);
    mainRoadCurb1.receiveShadow = true;
    mainRoadCurb1.castShadow = true;
    sacbeGroup.add(mainRoadCurb1);
    const mainRoadCurb2Geometry = new THREE.BoxGeometry(250, 2, 1);
    const mainRoadCurb2 = new THREE.Mesh(mainRoadCurb2Geometry, curbMaterial);
    mainRoadCurb2.position.set(330, 1, 220 - mainRoadWidth / 2 - 0.5);
    mainRoadCurb2.receiveShadow = true;
    mainRoadCurb2.castShadow = true;
    sacbeGroup.add(mainRoadCurb2);

    // Branch road edges
    const branchRoadCurb1Geometry = new THREE.BoxGeometry(1, 2, 70);
    const branchRoadCurb1 = new THREE.Mesh(branchRoadCurb1Geometry, curbMaterial);
    branchRoadCurb1.position.set(290 + 15 / 2 + 0.5, 1, 200);
    branchRoadCurb1.receiveShadow = true;
    branchRoadCurb1.castShadow = true;
    sacbeGroup.add(branchRoadCurb1);

    const branchRoadCurb2Geometry = new THREE.BoxGeometry(1, 2, 70);
    const branchRoadCurb2 = new THREE.Mesh(branchRoadCurb2Geometry, curbMaterial);
    branchRoadCurb2.position.set(290 - 15 / 2 - 0.5, 1, 200);
    branchRoadCurb2.receiveShadow = true;
    branchRoadCurb2.castShadow = true;
    sacbeGroup.add(branchRoadCurb2);

    // Add some worn/damaged areas to make the road look ancient
    // Create 5-10 random "damaged" spots on the roads
    for (let i = 0; i < 8; i++) {
      // Decide which road to damage (main or branch)
      const isMainRoad = Math.random() > 0.4;
      // Generate position
      let x, z;
      if (isMainRoad) {
        x = 330 + (Math.random() * 240 - 120); // Along main road
        z = 220 + (Math.random() * (mainRoadWidth - 4) - (mainRoadWidth - 4) / 2); // Across main road
      } else {
        x = 290 + (Math.random() * (15 - 4) - (15 - 4) / 2); // Across branch road
        z = 200 + (Math.random() * 60 - 30); // Along branch road
      }
      // Create a depression/damage in the road
      const damageGeometry = new THREE.CircleGeometry(1 + Math.random() * 3, 8);
      const damageMaterial = new THREE.MeshStandardMaterial({
        color: 0x9c9686, // Darker color for damaged areas
        roughness: 0.9,
        metalness: 0.1,
      });
      const damage = new THREE.Mesh(damageGeometry, damageMaterial);
      damage.position.set(x, 1.01, z); // Slightly above road
      damage.rotation.x = -Math.PI / 2; // Lay flat
      damage.receiveShadow = true;
      mainRoad.renderOrder = 5;
      branchRoad.renderOrder = 5;

      sacbeGroup.add(damage);
    }

    // Add decorative elements along the roads
    for (let i = 0; i < 12; i++) {
      // Decide which road to decorate (main or branch)
      const isMainRoad = Math.random() > 0.3;
      // Generate position alongside the road (not on it)
      let x, z;
      if (isMainRoad) {
        x = 330 + (Math.random() * 230 - 115); // Along main road
        z = 220 + (Math.random() > 0.5 ? 1 : -1) * (mainRoadWidth / 2 + 3 + Math.random() * 3); // Beside main road
      } else {
        x = 290 + (Math.random() > 0.5 ? 1 : -1) * (15 / 2 + 3 + Math.random() * 3); // Beside branch road
        z = 200 + (Math.random() * 60 - 30); // Along branch road
      }
      // Create a small marker stone
      const markerGeometry = new THREE.BoxGeometry(
        1.5 + Math.random(),
        0.7 + Math.random() * 1.2,
        1.5 + Math.random(),
      );
      const marker = new THREE.Mesh(markerGeometry, curbMaterial);
      marker.position.set(x, markerGeometry.parameters.height / 2, z);
      marker.rotation.y = Math.random() * Math.PI * 2; // Random rotation
      marker.castShadow = true;
      marker.receiveShadow = true;

      sacbeGroup.add(marker);
    }

    scene.add(sacbeGroup);
    return sacbeGroup;
  };

  // Add a marker at a specific 3D position - SMALLER SIZE
  const createPointMarker = (point: FeaturePoint, isSelected = false) => {
    if (!sceneRef.current) return null;

    // Create a sphere to mark the point - REDUCED SIZE for better viewing
    const markerGeometry = new THREE.SphereGeometry(2.5, 16, 16); // Reduced size from 5 to 2.5
    const markerMaterial = new THREE.MeshBasicMaterial({
      color: isSelected ? 0xff3333 : 0x33aaff,
      opacity: 0.9, // Slightly transparent
      transparent: true,
    });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    marker.position.set(point.position.x, point.position.y, point.position.z);
    marker.userData = { pointId: point.id, type: 'pointMarker', point: point };
    // Make sure markers are rendered on top
    marker.renderOrder = 10;

    // Add point name as a label above the marker
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(point.name, 32, 16);

      const texture = new THREE.CanvasTexture(canvas);
      const labelMaterial = new THREE.SpriteMaterial({
        map: texture,
        depthTest: false, // Ensures label is always visible
        transparent: true,
      });
      const label = new THREE.Sprite(labelMaterial);
      label.scale.set(5, 2.5, 1);
      label.position.set(0, 5, 0);
      label.renderOrder = 100;
      marker.add(label);
    }

    return marker;
  };

  // Show all available point markers for a feature
  const showFeaturePoints = (feature: Feature) => {
    // Clear any existing point markers
    clearPointMarkers();
    // Create and add markers for each predefined point
    const newMarkers: THREE.Mesh[] = [];
    feature.points.forEach((point: FeaturePoint) => {
      // We don't check selectedPoints here anymore since we want a fresh start
      const isSelected = false;
      const marker = createPointMarker(point, isSelected)!;
      newMarkers.push(marker);
      sceneRef.current?.add(marker);
    });
    // Update ref with new markers
    pointMarkersRef.current = newMarkers;
  };

  // Clear all point markers
  const clearPointMarkers = () => {
    // Remove point markers from scene
    if (sceneRef.current) {
      pointMarkersRef.current.forEach((marker) => {
        sceneRef.current?.remove(marker);
      });
    }
    // Clear points arrays
    pointMarkersRef.current = [];
    // Don't clear selected points here to maintain selections across different views
  };

  // Disable context menu to allow right-click for panning
  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
  };

  // Setup lighting
  const setupLighting = (scene: THREE.Scene) => {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    // Directional light (sun)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(380, 100, 250); // Adjusted to new center
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 400;
    dirLight.shadow.camera.left = -100;
    dirLight.shadow.camera.right = 100;
    dirLight.shadow.camera.top = 100;
    dirLight.shadow.camera.bottom = -100;
    scene.add(dirLight);
    // Add a hemisphere light
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemiLight.position.set(330, 50, 220); // Positioned at new center
    scene.add(hemiLight);
  };

  // Create city platform - Updated for new center
  const createCityPlatform = (scene: THREE.Scene) => {
    // Create a rectangular platform for the entire city
    const platformGeometry = new THREE.BoxGeometry(200, 2, 200);
    const platformMaterial = new THREE.MeshStandardMaterial({
      color: 0x5c4033, // Brown
      roughness: 0.7,
      metalness: 0.2,
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.set(330, -1, 220); // Centered at (330, 220)
    platform.receiveShadow = true;
    scene.add(platform);
  };

  // Create labels for structures
  const createLabel = (feature: Feature, parent: THREE.Object3D) => {
    if (!feature || !parent) return null;
    // Create canvas for the label
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 96; // Reduced height
    const context = canvas.getContext('2d')!;
    // Draw background
    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Draw border
    context.strokeStyle = '#' + feature.color.toString(16).padStart(6, '0');
    context.lineWidth = 4;
    context.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);
    // Draw title
    context.font = 'bold 24px Arial';
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(t(feature.name), canvas.width / 2, canvas.height / 3);
    // Draw description
    context.font = '16px Arial';
    context.fillText(t(feature.description), canvas.width / 2, (canvas.height * 2) / 3);
    // Create sprite
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
    });

    const sprite = new THREE.Sprite(spriteMaterial);

    // Position label above structure
    const pos = feature.position;
    const offset = feature.labelOffset || { x: 0, y: 15, z: 0 };
    sprite.position.set(pos.x + offset.x, offset.y, pos.z + offset.z);
    // Scale sprite
    sprite.scale.set(25, 12.5, 1);
    // Store reference and initially hide label
    sprite.visible = false;
    labelsRef.current[feature.id] = sprite;
    parent.add(sprite);
    return sprite;
  };

  // Create ancient city structures
  const createAncientCity = (scene: THREE.Scene) => {
    // Create a group for all structures
    const cityGroup = new THREE.Group();
    cityGroup.userData = { type: 'structures' };
    structuresRef.current = cityGroup;
    // Stone material for structures
    const stoneMaterial = new THREE.MeshStandardMaterial({
      color: 0xdad0c7, // Limestone color
      roughness: 0.7,
      metalness: 0.1,
    });

    // Create each structure based on feature definition
    features.forEach((feature) => {
      // Create appropriate structure based on feature id
      if (feature.id === 'triangleGarden') {
        // Create a triangular garden
        createTriangularGarden(
          feature.position.x,
          feature.position.z,
          feature.size.width,
          feature.size.height,
          feature.size.depth,
          stoneMaterial,
          cityGroup,
        );
      } else if (feature.id === 'plaza') {
        // Create plaza (rectangular)
        createPlatform(
          feature.position.x,
          feature.position.z,
          feature.size.width,
          feature.size.height,
          feature.size.depth,
          stoneMaterial,
          cityGroup,
        );
      } else if (feature.id === 'ballCourt') {
        // Create ball court (polygon)
        createBallCourt(
          feature.position.x,
          feature.position.z,
          feature.size.width,
          feature.size.height,
          feature.size.depth,
          stoneMaterial,
          cityGroup,
        );
      } else if (feature.id === 'reservoir') {
        // Create water reservoir (circle)
        createReservoir(
          feature.position.x,
          feature.position.z,
          feature.size.width,
          feature.size.height,
          feature.size.depth,
          stoneMaterial,
          cityGroup,
          true, // Make it circular
        );
      }

      // Create label for this feature
      createLabel(feature as Feature, cityGroup);
    });

    // Create additional structures (without labels)
    additionalStructures.forEach((structure) => {
      if (structure.id.includes('Pyramid')) {
        createSteppedPyramid(
          structure.position.x,
          structure.position.z,
          structure.size.width,
          structure.size.height,
          structure.size.depth,
          4, // Steps
          false, // No temple
          stoneMaterial,
          cityGroup,
        );
      } else if (structure.id === 'residential') {
        // Create multiple residential buildings
        const buildingGroup = new THREE.Group();
        buildingGroup.position.set(structure.position.x, 0, structure.position.z);

        // Create a grid of buildings
        const buildingWidth = 8;
        const buildingDepth = 10;
        const rows = 3;
        const cols = 5;
        const spacing = 15;

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = (col - cols / 2) * spacing;
            const z = (row - rows / 2) * spacing;
            createBuilding(x, z, buildingWidth, 5, buildingDepth, stoneMaterial, buildingGroup);
          }
        }
        cityGroup.add(buildingGroup);
      } else if (structure.id === 'defensiveWall') {
        // Create perimeter wall
        createPerimeterWall(
          structure.position.x,
          structure.position.z,
          structure.size.width,
          structure.size.depth,
          structure.size.height,
          4, // Thickness
          stoneMaterial,
          cityGroup,
        );
      } else if (structure.id === 'palaceComplex') {
        // Create palace complex
        createPalaceComplex(
          structure.position.x,
          structure.position.z,
          structure.size.width,
          structure.size.height,
          structure.size.depth,
          stoneMaterial,
          cityGroup,
        );
      } else if (structure.id === 'marketArea') {
        // Create market area
        createMarketArea(
          structure.position.x,
          structure.position.z,
          structure.size.width,
          structure.size.height,
          structure.size.depth,
          stoneMaterial,
          cityGroup,
        );
      }
    });

    scene.add(cityGroup);
  };

  // Create a stepped pyramid
  const createSteppedPyramid = (
    x: number,
    z: number,
    width: number,
    height: number,
    depth: number,
    steps: number,
    addTemple: boolean,
    material: THREE.Material,
    parent: THREE.Group,
  ) => {
    const pyramidGroup = new THREE.Group();
    pyramidGroup.position.set(x, 0, z);
    const stepHeight = height / steps;
    // Create each step of the pyramid
    for (let i = 0; i < steps; i++) {
      const stepWidth = width * (1 - i / steps);
      const stepDepth = depth * (1 - i / steps);
      const stepGeometry = new THREE.BoxGeometry(stepWidth, stepHeight, stepDepth);
      const step = new THREE.Mesh(stepGeometry, material);
      step.position.y = i * stepHeight + stepHeight / 2;
      step.castShadow = true;
      step.receiveShadow = true;
      pyramidGroup.add(step);
    }
    // Add temple on top if requested
    if (addTemple) {
      const templeWidth = width * 0.2;
      const templeHeight = height * 0.2;
      const templeDepth = depth * 0.2;
      const templeGeometry = new THREE.BoxGeometry(templeWidth, templeHeight, templeDepth);
      const temple = new THREE.Mesh(templeGeometry, material);
      temple.position.y = height + templeHeight / 2;
      temple.castShadow = true;
      pyramidGroup.add(temple);
    }

    // Add stairs on one side
    const stairWidth = width * 0.3;
    const stairDepth = depth / 2;

    for (let i = 0; i < steps; i++) {
      const stepWidth = stairWidth;
      const stepDepth = stairDepth / steps;
      const stairGeometry = new THREE.BoxGeometry(stepWidth, stepHeight * 0.5, stepDepth);
      const stair = new THREE.Mesh(stairGeometry, material);
      stair.position.set(0, i * stepHeight, depth / 4 + (i * stepDepth) / 2);
      stair.castShadow = true;
      stair.receiveShadow = true;
      pyramidGroup.add(stair);
    }

    parent.add(pyramidGroup);
    return pyramidGroup;
  };

  // Create a platform structure
  const createPlatform = (
    x: number,
    z: number,
    width: number,
    height: number,
    depth: number,
    material: THREE.Material,
    parent: THREE.Group,
  ) => {
    const platformGroup = new THREE.Group();
    platformGroup.position.set(x, 0, z);

    // Main platform
    const platformGeometry = new THREE.BoxGeometry(width, height, depth);
    const platform = new THREE.Mesh(platformGeometry, material);
    platform.position.y = height / 2;
    platform.castShadow = true;
    platform.receiveShadow = true;
    platformGroup.add(platform);
    // Add stairs on one side
    const stairWidth = width * 0.2;
    const stairHeight = height;
    const stairDepth = depth * 0.1;
    const stairGeometry = new THREE.BoxGeometry(stairWidth, stairHeight * 0.5, stairDepth);
    const stair = new THREE.Mesh(stairGeometry, material);
    stair.position.set(0, 0, depth / 2 + stairDepth / 2);
    stair.castShadow = true;
    stair.receiveShadow = true;
    platformGroup.add(stair);
    platform.renderOrder = 10;
    stair.renderOrder = 10;
    parent.add(platformGroup);
    return platformGroup;
  };

  // Create a building
  const createBuilding = (
    x: number,
    z: number,
    width: number,
    height: number,
    depth: number,
    material: THREE.Material,
    parent: THREE.Group,
  ) => {
    const buildingGroup = new THREE.Group();
    buildingGroup.position.set(x, 0, z);
    // Main building structure
    const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
    const building = new THREE.Mesh(buildingGeometry, material);
    building.position.y = height / 2;
    building.castShadow = true;
    building.receiveShadow = true;
    buildingGroup.add(building);
    // Add doorway
    const doorWidth = width * 0.3;
    const doorHeight = height * 0.6;
    const doorDepth = depth * 0.1;
    const doorGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, doorDepth * 2);
    const doorMaterial = new THREE.MeshBasicMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.8,
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, doorHeight / 2 - height / 4, -(depth / 2) - doorDepth / 2);
    buildingGroup.add(door);
    parent.add(buildingGroup);
    return buildingGroup;
  };

  // Create a perimeter wall
  const createPerimeterWall = (
    x: number,
    z: number,
    width: number,
    depth: number,
    height: number,
    thickness: number,
    material: THREE.Material,
    parent: THREE.Group,
  ) => {
    const wallGroup = new THREE.Group();
    wallGroup.position.set(x, 0, z);
    // North wall
    const northWallGeometry = new THREE.BoxGeometry(width, height, thickness);
    const northWall = new THREE.Mesh(northWallGeometry, material);
    northWall.position.set(0, height / 2, -depth / 2);
    northWall.castShadow = true;
    northWall.receiveShadow = true;
    wallGroup.add(northWall);
    // South wall
    const southWallGeometry = new THREE.BoxGeometry(width, height, thickness);
    const southWall = new THREE.Mesh(southWallGeometry, material);
    southWall.position.set(0, height / 2, depth / 2);
    southWall.castShadow = true;
    southWall.receiveShadow = true;
    wallGroup.add(southWall);
    // East wall
    const eastWallGeometry = new THREE.BoxGeometry(thickness, height, depth);
    const eastWall = new THREE.Mesh(eastWallGeometry, material);
    eastWall.position.set(width / 2, height / 2, 0);
    eastWall.castShadow = true;
    eastWall.receiveShadow = true;
    wallGroup.add(eastWall);
    // West wall
    const westWallGeometry = new THREE.BoxGeometry(thickness, height, depth);
    const westWall = new THREE.Mesh(westWallGeometry, material);
    westWall.position.set(-width / 2, height / 2, 0);
    westWall.castShadow = true;
    westWall.receiveShadow = true;
    wallGroup.add(westWall);
    // Add gates
    createGate(0, -depth / 2, 15, height * 0.8, thickness * 2, material, wallGroup); // North gate
    createGate(0, depth / 2, 15, height * 0.8, thickness * 2, material, wallGroup); // South gate
    createGate(-width / 2, 0, thickness * 2, height * 0.8, 15, material, wallGroup); // West gate
    createGate(width / 2, 0, thickness * 2, height * 0.8, 15, material, wallGroup); // East gate

    parent.add(wallGroup);
    return wallGroup;
  };

  // Create a gate in the wall
  const createGate = (
    x: number,
    z: number,
    width: number,
    height: number,
    depth: number,
    material: THREE.Material,
    parent: THREE.Group,
  ) => {
    // Gate towers
    const towerGeometry = new THREE.BoxGeometry(width / 3, height * 1.5, depth);
    const leftTower = new THREE.Mesh(towerGeometry, material);
    leftTower.position.set(x - width / 3, height * 0.75, z);
    leftTower.castShadow = true;
    leftTower.receiveShadow = true;
    parent.add(leftTower);
    const rightTower = new THREE.Mesh(towerGeometry, material);
    rightTower.position.set(x + width / 3, height * 0.75, z);
    rightTower.castShadow = true;
    rightTower.receiveShadow = true;
    parent.add(rightTower);
    return { leftTower, rightTower };
  };

  // Create a ball court (polygon)
  const createBallCourt = (
    x: number,
    z: number,
    width: number,
    height: number,
    depth: number,
    material: THREE.Material,
    parent: THREE.Group,
  ) => {
    const courtGroup = new THREE.Group();
    courtGroup.position.set(x, 0, z);

    // Court floor
    const floorGeometry = new THREE.BoxGeometry(width, height * 0.2, depth);
    const floor = new THREE.Mesh(floorGeometry, material);
    floor.position.y = height * 0.1;
    floor.receiveShadow = true;
    courtGroup.add(floor);

    // Create a more polygon-like structure with angled walls
    const wallCount = 6; // Hexagonal structure
    for (let i = 0; i < wallCount; i++) {
      const angle = (i / wallCount) * Math.PI * 2;
      const nextAngle = ((i + 1) / wallCount) * Math.PI * 2;
      const x1 = Math.cos(angle) * (width / 2);
      const z1 = Math.sin(angle) * (depth / 2);
      const x2 = Math.cos(nextAngle) * (width / 2);
      const z2 = Math.sin(nextAngle) * (depth / 2);
      // Create a wall segment
      const wallLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(z2 - z1, 2));
      const wallGeometry = new THREE.BoxGeometry(wallLength, height, 2);
      const wall = new THREE.Mesh(wallGeometry, material);
      // Position at midpoint between vertices
      wall.position.set((x1 + x2) / 2, height / 2, (z1 + z2) / 2);
      // Rotate to align with angle
      wall.rotation.y = Math.atan2(z2 - z1, x2 - x1) + Math.PI / 2;
      wall.castShadow = true;
      wall.receiveShadow = true;
      courtGroup.add(wall);
    }
    // Add center piece
    const centerGeometry = new THREE.CylinderGeometry(width / 8, width / 8, height / 2, 8);
    const center = new THREE.Mesh(centerGeometry, material);
    center.position.y = height / 4;
    center.castShadow = true;
    center.receiveShadow = true;
    courtGroup.add(center);
    parent.add(courtGroup);
    return courtGroup;
  };

  // Create a palace complex
  const createPalaceComplex = (
    x: number,
    z: number,
    width: number,
    height: number,
    depth: number,
    material: THREE.Material,
    parent: THREE.Group,
  ) => {
    const palaceGroup = new THREE.Group();
    palaceGroup.position.set(x, 0, z);

    // Main palace building
    const mainGeometry = new THREE.BoxGeometry(width, height, depth * 0.6);
    const main = new THREE.Mesh(mainGeometry, material);
    main.position.set(0, height / 2, -depth * 0.1);
    main.castShadow = true;
    main.receiveShadow = true;
    palaceGroup.add(main);
    // Side wings
    const wingGeometry = new THREE.BoxGeometry(width * 0.4, height * 0.7, depth * 0.3);
    const leftWing = new THREE.Mesh(wingGeometry, material);
    leftWing.position.set(-width * 0.3, height * 0.35, depth * 0.15);
    leftWing.castShadow = true;
    leftWing.receiveShadow = true;
    palaceGroup.add(leftWing);
    const rightWing = new THREE.Mesh(wingGeometry, material);
    rightWing.position.set(width * 0.3, height * 0.35, depth * 0.15);
    rightWing.castShadow = true;
    rightWing.receiveShadow = true;
    palaceGroup.add(rightWing);
    // Front courtyard
    const courtyardGeometry = new THREE.BoxGeometry(width * 0.6, height * 0.1, depth * 0.25);
    const courtyard = new THREE.Mesh(courtyardGeometry, material);
    courtyard.position.set(0, height * 0.05, depth * 0.3);
    courtyard.receiveShadow = true;
    palaceGroup.add(courtyard);
    parent.add(palaceGroup);
    return palaceGroup;
  };

  // Create a market area
  const createMarketArea = (
    x: number,
    z: number,
    width: number,
    height: number,
    depth: number,
    material: THREE.Material,
    parent: THREE.Group,
  ) => {
    const marketGroup = new THREE.Group();
    marketGroup.position.set(x, 0, z);
    // Base platform
    const baseGeometry = new THREE.BoxGeometry(width, height * 0.2, depth);
    const base = new THREE.Mesh(baseGeometry, material);
    base.position.y = height * 0.1;
    base.receiveShadow = true;
    marketGroup.add(base);
    // Market stalls - create grid of small buildings
    const stallRows = 3;
    const stallCols = 5;
    const stallWidth = width / (stallCols + 1);
    const stallDepth = depth / (stallRows + 1);
    const stallHeight = height;
    for (let row = 0; row < stallRows; row++) {
      for (let col = 0; col < stallCols; col++) {
        // Skip some stalls for variety
        if (Math.random() > 0.8) continue;
        const stallX = (col / (stallCols - 1) - 0.5) * (width * 0.8);
        const stallZ = (row / (stallRows - 1) - 0.5) * (depth * 0.8);
        const stallGeometry = new THREE.BoxGeometry(stallWidth, stallHeight, stallDepth);
        const stall = new THREE.Mesh(stallGeometry, material);
        stall.position.set(stallX, stallHeight / 2, stallZ);
        stall.castShadow = true;
        stall.receiveShadow = true;
        marketGroup.add(stall);
      }
    }
    parent.add(marketGroup);
    return marketGroup;
  };

  // Create a water reservoir (circular)
  const createReservoir = (
    x: number,
    z: number,
    width: number,
    height: number,
    depth: number,
    material: THREE.Material,
    parent: THREE.Group,
    makeCircular = false,
  ) => {
    const reservoirGroup = new THREE.Group();
    reservoirGroup.position.set(x, 0, z);
    // Create basin
    const basinGeometry = makeCircular
      ? new THREE.CylinderGeometry(width / 2, width / 2, height, 32)
      : new THREE.BoxGeometry(width, height, depth);
    const basinMaterial = new THREE.MeshStandardMaterial({
      color: 0x0066aa, // Water color
      transparent: true,
      opacity: 0.7,
      roughness: 0.1,
      metalness: 0.3,
    });

    const basin = new THREE.Mesh(basinGeometry, basinMaterial);
    basin.position.y = height / 2;
    basin.receiveShadow = true;
    reservoirGroup.add(basin);
    // Add stone border
    const borderGeometry = makeCircular
      ? new THREE.CylinderGeometry(width / 2 + 2, width / 2 + 2, height * 0.5, 32)
      : new THREE.BoxGeometry(width + 4, height * 0.5, depth + 4);
    const border = new THREE.Mesh(borderGeometry, material);
    border.position.y = height * 0.25;
    border.receiveShadow = true;
    reservoirGroup.add(border);
    parent.add(reservoirGroup);
    return reservoirGroup;
  };

  // Create a triangular garden
  const createTriangularGarden = (
    x: number,
    z: number,
    _width: number,
    height: number,
    _depth: number,
    material: THREE.Material,
    parent: THREE.Group,
  ) => {
    const gardenGroup = new THREE.Group();
    gardenGroup.position.set(x, 0, z);
    // Create a triangular-shaped platform
    const shape = new THREE.Shape();
    shape.moveTo(0, -15); // North point
    shape.lineTo(15, 7.5); // East point
    shape.lineTo(-15, 7.5); // West point
    shape.lineTo(0, -15); // Back to North point
    const extrudeSettings = {
      steps: 1,
      depth: height,
      bevelEnabled: false,
    };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.rotateX(Math.PI / 2); // Rotate to make it flat on the ground
    // Create a custom material for the garden
    const gardenMaterial = new THREE.MeshStandardMaterial({
      color: 0xc5e8b7, // Light green for garden
      roughness: 0.8,
      metalness: 0.1,
    });
    const garden = new THREE.Mesh(geometry, gardenMaterial);
    garden.position.y = height * 0.9;
    garden.receiveShadow = true;
    gardenGroup.add(garden);
    // Add stone border
    const borderShape = new THREE.Shape();
    borderShape.moveTo(0, -16); // North point (slightly larger)
    borderShape.lineTo(16, 8); // East point (slightly larger)
    borderShape.lineTo(-16, 8); // West point (slightly larger)
    borderShape.lineTo(0, -16); // Back to North point
    // Create a hole in the shape for the garden area
    const holeShape = new THREE.Shape();
    holeShape.moveTo(0, -15); // North point
    holeShape.lineTo(15, 7.5); // East point
    holeShape.lineTo(-15, 7.5); // West point
    holeShape.lineTo(0, -15); // Back to North point
    borderShape.holes.push(holeShape);
    const borderExtrudeSettings = {
      steps: 1,
      depth: height * 0.5,
      bevelEnabled: false,
    };
    const borderGeometry = new THREE.ExtrudeGeometry(borderShape, borderExtrudeSettings);
    borderGeometry.rotateX(Math.PI / 2); // Rotate to make it flat on the ground
    const border = new THREE.Mesh(borderGeometry, material);
    border.position.y = 0; // At ground level
    border.receiveShadow = true;
    gardenGroup.add(border);
    // Add a central decorative element
    const centerPieceGeometry = new THREE.CylinderGeometry(1.5, 1.5, 1, 16);
    const centerPiece = new THREE.Mesh(centerPieceGeometry, material);
    centerPiece.position.set(0, 0.6, -3); // Slightly off center
    centerPiece.castShadow = true;
    gardenGroup.add(centerPiece);
    garden.renderOrder = 10;
    border.renderOrder = 10;
    parent.add(gardenGroup);
    return gardenGroup;
  };
  // Create vegetation with more trees including inside structures
  const createVegetation = (scene: THREE.Scene) => {
    const vegetationGroup = new THREE.Group();
    vegetationGroup.userData = { type: 'vegetation' };
    vegetationRef.current = vegetationGroup;
    // Materials
    const trunkMaterial = new THREE.MeshStandardMaterial({
      color: 0x5d4037,
      roughness: 0.9,
    });
    const foliageMaterial = new THREE.MeshStandardMaterial({
      color: 0x2e7d32,
      roughness: 0.8,
    });
    // Create tree models
    const conicalTree = createConicalTree(trunkMaterial, foliageMaterial);
    const sphericalTree = createSphericalTree(trunkMaterial, foliageMaterial);
    const bushyTree = createBushyTree(trunkMaterial, foliageMaterial);
    const palmTree = createPalmTree(trunkMaterial);
    const treeModels = [conicalTree, sphericalTree, bushyTree, palmTree];
    // Add more trees throughout the scene, including inside structures
    const treeCount = 1000; // Increased tree count
    for (let i = 0; i < treeCount; i++) {
      const x = Math.random() * 700 - 20; // Range from ~30 to 730 (centered around 330-ish)
      const z = Math.random() * 700 - 130; // Range from ~50 to 750 (centered around 220-ish)
      // Select a random tree model
      const treeIndex = Math.floor(Math.random() * treeModels.length);
      const treeCopy = treeModels[treeIndex].clone();
      // Random scale
      const scale = 0.7 + Math.random() * 0.6;
      treeCopy.scale.set(scale, scale, scale);
      // Position
      treeCopy.position.set(x, 0, z);
      // Random rotation
      treeCopy.rotation.y = Math.random() * Math.PI * 2;
      vegetationGroup.add(treeCopy);
    }
    // Add ground vegetation (bushes and undergrowth)
    for (let i = 0; i < 1500; i++) {
      const x = Math.random() * 750 + 0; // Adjusted for new center
      const z = Math.random() * 750 - 130; // Adjusted for new center
      const bushGeometry = new THREE.SphereGeometry(1 + Math.random() * 2, 6, 6);
      const bushMaterial = new THREE.MeshStandardMaterial({
        color: 0x1b5e20,
        roughness: 0.8,
      });
      const bush = new THREE.Mesh(bushGeometry, bushMaterial);
      bush.position.set(x, Math.random() * 0.5 + 0.5, z);
      bush.scale.y = 0.6 + Math.random() * 0.4;
      vegetationGroup.add(bush);
    }
    scene.add(vegetationGroup);
  };
  // Create a conical tree (like a pine) - Increased size
  const createConicalTree = (trunkMaterial: THREE.Material, foliageMaterial: THREE.Material) => {
    const treeGroup = new THREE.Group();
    // Trunk - Increased sizes by about 1.5x
    const trunkHeight = 6 + Math.random() * 3;
    const trunkRadius = 0.6 + Math.random() * 0.4;
    const trunkGeometry = new THREE.CylinderGeometry(trunkRadius * 0.7, trunkRadius, trunkHeight, 8);
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = trunkHeight / 2;
    trunk.castShadow = true;
    treeGroup.add(trunk);
    // Foliage (cone) - Increased sizes by about 1.5x
    const foliageHeight = 12 + Math.random() * 6;
    const foliageRadius = 3 + Math.random() * 2;
    const foliageGeometry = new THREE.ConeGeometry(foliageRadius, foliageHeight, 8);
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.y = trunkHeight + foliageHeight / 2 - 0.5;
    foliage.castShadow = true;
    treeGroup.add(foliage);
    return treeGroup;
  };
  // Create a spherical tree (like a deciduous tree) - Increased size
  const createSphericalTree = (trunkMaterial: THREE.Material, foliageMaterial: THREE.Material) => {
    const treeGroup = new THREE.Group();
    // Trunk - Increased sizes by about 1.5x
    const trunkHeight = 4.5 + Math.random() * 3;
    const trunkRadius = 0.75 + Math.random() * 0.4;
    const trunkGeometry = new THREE.CylinderGeometry(trunkRadius * 0.6, trunkRadius, trunkHeight, 8);
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = trunkHeight / 2;
    trunk.castShadow = true;
    treeGroup.add(trunk);
    // Foliage (sphere) - Increased sizes by about 1.5x
    const foliageRadius = 4.5 + Math.random() * 3;
    const foliageGeometry = new THREE.SphereGeometry(foliageRadius, 8, 8);
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.y = trunkHeight + foliageRadius * 0.7;
    foliage.scale.set(1, 0.8, 1); // Slightly flattened on top
    foliage.castShadow = true;
    treeGroup.add(foliage);
    return treeGroup;
  };

  // Create a bushy tree (like a jungle tree) - Increased size
  const createBushyTree = (trunkMaterial: THREE.Material, foliageMaterial: THREE.Material) => {
    const treeGroup = new THREE.Group();
    // Trunk - Increased sizes by about 1.5x
    const trunkHeight = 7.5 + Math.random() * 4.5;
    const trunkRadius = 0.9 + Math.random() * 0.6;
    const trunkGeometry = new THREE.CylinderGeometry(trunkRadius * 0.8, trunkRadius, trunkHeight, 8);
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = trunkHeight / 2;
    trunk.castShadow = true;
    treeGroup.add(trunk);
    // Multiple foliage clusters - Increased sizes
    const clusterCount = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < clusterCount; i++) {
      const height = trunkHeight * (0.5 + i * 0.15);
      const radius = 3 + Math.random() * 2.5;
      const foliageGeometry = new THREE.SphereGeometry(radius, 8, 8);
      const clusterMaterial = foliageMaterial.clone();
      // Slight color variation
      const color = new THREE.Color(0x2e7d32);
      color.r += Math.random() * 0.1 - 0.05;
      color.g += Math.random() * 0.1 - 0.05;
      clusterMaterial.blendColor = color;
      const foliageCluster = new THREE.Mesh(foliageGeometry, clusterMaterial);
      // Position clusters at different points around the trunk
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 1.2;
      foliageCluster.position.set(Math.cos(angle) * distance, height, Math.sin(angle) * distance);
      foliageCluster.castShadow = true;
      treeGroup.add(foliageCluster);
    }
    return treeGroup;
  };

  // Create a palm tree - Increased size
  const createPalmTree = (trunkMaterial: THREE.Material) => {
    const treeGroup = new THREE.Group();
    // Trunk - curved palm trunk - Increased size
    const trunkHeight = 10 + Math.random() * 7;
    const trunkRadius = 0.6 + Math.random() * 0.3;
    // Create a curved trunk using segments
    const segments = 10;
    let previousSection = null;
    const curve = Math.random() * 0.4; // Increased curve amount
    for (let i = 0; i < segments; i++) {
      const sectionHeight = trunkHeight / segments;
      const sectionGeometry = new THREE.CylinderGeometry(
        trunkRadius * 0.9,
        trunkRadius * (i === segments - 1 ? 0.7 : 1),
        sectionHeight,
        8,
      );
      const section = new THREE.Mesh(sectionGeometry, trunkMaterial);
      // Add curve as we go up
      const curveAmount = Math.sin((i / segments) * Math.PI) * curve;
      const angle = Math.random() * Math.PI * 2; // Random curve direction
      if (previousSection) {
        section.position.set(
          previousSection.position.x + Math.cos(angle) * curveAmount,
          previousSection.position.y + sectionHeight,
          previousSection.position.z + Math.sin(angle) * curveAmount,
        );
        // Orient section to continue curve
        section.lookAt(previousSection.position);
        section.rotateX(Math.PI / 2); // Adjust for cylinder default orientation
      } else {
        section.position.set(0, sectionHeight / 2, 0);
      }
      section.castShadow = true;
      treeGroup.add(section);
      previousSection = section;
    }
    // Palm fronds - Increased size
    const frondCount = 6 + Math.floor(Math.random() * 5);
    const frondMaterial = new THREE.MeshStandardMaterial({
      color: 0x4caf50,
      roughness: 0.8,
      side: THREE.DoubleSide,
    });
    for (let i = 0; i < frondCount; i++) {
      const angle = (i / frondCount) * Math.PI * 2;
      const tilt = Math.PI / 4 + Math.random() * (Math.PI / 4); // Tilt angle from vertical
      // Create frond shape - Increased size
      const frondLength = 9 + Math.random() * 4.5;
      const frondWidth = 1.2 + Math.random() * 0.6;
      const frondShape = new THREE.Shape();
      frondShape.moveTo(0, 0);
      frondShape.lineTo(frondWidth / 2, frondLength * 0.1);
      frondShape.lineTo(frondWidth * 0.8, frondLength * 0.2);
      frondShape.lineTo(frondWidth, frondLength * 0.4);
      frondShape.lineTo(frondWidth * 0.8, frondLength * 0.6);
      frondShape.lineTo(frondWidth / 2, frondLength * 0.8);
      frondShape.lineTo(0, frondLength);
      frondShape.lineTo(-frondWidth / 2, frondLength * 0.8);
      frondShape.lineTo(-frondWidth * 0.8, frondLength * 0.6);
      frondShape.lineTo(-frondWidth, frondLength * 0.4);
      frondShape.lineTo(-frondWidth * 0.8, frondLength * 0.2);
      frondShape.lineTo(-frondWidth / 2, frondLength * 0.1);
      frondShape.lineTo(0, 0);
      const frondGeometry = new THREE.ShapeGeometry(frondShape);
      const frond = new THREE.Mesh(frondGeometry, frondMaterial);
      // Position at top of last trunk section
      frond.position.copy(previousSection?.position ?? new THREE.Vector3(0, trunkHeight, 0));
      frond.position.y += 1.5; // Increased height
      // Rotate frond
      frond.rotation.y = angle;
      frond.rotation.x = tilt;
      frond.castShadow = true;
      treeGroup.add(frond);
    }
    return treeGroup;
  };

  // Function to add outline to the selected structure
  const addStructureOutline = (feature: Feature) => {
    // Remove any existing outline
    if (outlineRef.current && sceneRef.current) {
      sceneRef.current.remove(outlineRef.current);
      outlineRef.current = null;
    }
    if (!feature || !sceneRef.current) return;
    // Create outline based on feature type
    let outlinePoints = [];
    // Get positions for the outline based on feature type
    if (feature.id === 'triangleGarden') {
      // True triangular outline - Updated for new coordinates
      outlinePoints = [
        new THREE.Vector3(290, 2, 165), // North Corner
        new THREE.Vector3(305, 2, 187.5), // East Corner
        new THREE.Vector3(275, 2, 187.5), // West Corner
        new THREE.Vector3(290, 2, 165), // Close the loop
      ];
    } else if (feature.id === 'plaza') {
      // Rectangular outline - Updated for new coordinates
      outlinePoints = [
        new THREE.Vector3(305, 5, 195), // NW
        new THREE.Vector3(355, 5, 195), // NE
        new THREE.Vector3(355, 5, 245), // SE
        new THREE.Vector3(305, 5, 245), // SW
        new THREE.Vector3(305, 5, 195), // Close the loop
      ];
    } else if (feature.id === 'reservoir') {
      // Circular outline - Updated for new coordinates
      const radius = 10;
      const center = new THREE.Vector3(270, 2.5, 210);
      const segments = 32;
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const x = center.x + Math.cos(angle) * radius;
        const z = center.z + Math.sin(angle) * radius;
        outlinePoints.push(new THREE.Vector3(x, center.y, z));
      }
    }

    // Create geometry from points
    const geometry = new THREE.BufferGeometry().setFromPoints(outlinePoints);
    // Create a bright blue line material
    const material = new THREE.LineBasicMaterial({
      color: 0x3388ff,
      linewidth: 3,
      transparent: true,
      opacity: 0.8,
    });
    // Create the line
    const outline = new THREE.Line(geometry, material);
    outline.renderOrder = 99; // Ensure it renders on top of most objects
    // Add to scene and store reference
    sceneRef.current.add(outline);
    outlineRef.current = outline;
  };
  // Select a feature for measurement
  const selectFeature = (featureId: string) => {
    if (selectedFeature?.id === featureId) return; // Prevent re-selecting the same feature
    if (featureId === 'plaza') {
      onInteraction({
        'step-2-completed': true,
      });
    } else if (featureId === 'triangleGarden') {
      onInteraction({
        'step-3-completed': true,
      });
    } else if (featureId === 'reservoir') {
      onInteraction({
        'step-4-completed': true,
      });
    }
    // Clear any existing points
    clearPointMarkers();
    // Clear selected points array first
    setSelectedPoints([]);
    const feature = features.find((f) => f.id === featureId);
    if (!feature) return;
    // Hide all feature labels when a feature is selected for measurement
    Object.values(labelsRef.current).forEach((label) => {
      if (label) {
        label.visible = false;
      }
    });
    setSelectedFeature(feature as Feature);
    setMeasurementResults({
      perimeter: '0 ft',
      area: '0 sq ft',
      method: '',
    });
    // Show predefined points for this feature - AFTER clearing selected points
    showFeaturePoints(feature as Feature);
    setSelectedPoints(feature.points);
    // Add outline to the selected feature
    addStructureOutline(feature as Feature);
    // Zoom in to focus on the selected feature in the top-down view
    if (topDownCameraRef.current && feature && containerRef.current) {
      // Calculate a good zoom level based on feature size
      const featureSize = Math.max(feature.size.width, feature.size.depth);
      // MODIFIED: Better focus for Triangle Garden
      const viewSize = featureId === 'plaza' ? featureSize * 1.5 : featureSize * 2;
      // Update orthographic camera's frustum to zoom in
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const aspectRatio = width / height;
      topDownCameraRef.current.left = (-viewSize * aspectRatio) / 2;
      topDownCameraRef.current.right = (viewSize * aspectRatio) / 2;
      topDownCameraRef.current.top = viewSize / 2;
      topDownCameraRef.current.bottom = -viewSize / 2;
      // Center the camera on the feature
      topDownCameraRef.current.position.set(
        feature.position.x,
        200, // Keep the same height
        feature.position.z,
      );
      // Look at the feature center
      topDownCameraRef.current.lookAt(feature.position.x, 0, feature.position.z);
      topDownCameraRef.current.updateProjectionMatrix();
      // Force a render if we're in the measurement step
      if (currentStep === 2 && rendererRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, topDownCameraRef.current);
      }
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (rendererRef.current) {
          rendererRef.current.setSize(width, height);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect(); // Clean up on unmount
    };
  }, []);

  // Reset all selected points and reset camera to overview
  const resetMeasurement = () => {
    // Clear selected points
    setSelectedPoints([]);
    selectFeature('');
    // Reset measurements
    setMeasurementResults({
      perimeter: '0 ft',
      area: '0 sq ft',
      method: '',
    });
    // Reset camera to zoomed out overview
    if (topDownCameraRef.current && containerRef.current) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const aspectRatio = width / height;
      const viewSize = 150; // Default overview size
      topDownCameraRef.current.left = -viewSize * aspectRatio;
      topDownCameraRef.current.right = viewSize * aspectRatio;
      topDownCameraRef.current.top = viewSize;
      topDownCameraRef.current.bottom = -viewSize;
      // Reset to center view at the new center (330, 220)
      topDownCameraRef.current.position.set(330, 200, 220);
      topDownCameraRef.current.lookAt(330, 0, 220);
      topDownCameraRef.current.updateProjectionMatrix();
      // Force a render
      if (rendererRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, topDownCameraRef.current);
      }
    }
    // Remove feature outline
    if (outlineRef.current && sceneRef.current) {
      sceneRef.current.remove(outlineRef.current);
      outlineRef.current = null;
    }
    // Reset selected feature
    setSelectedFeature(null);
  };
  // Setup camera controls
  const setupCameraControls = () => {
    if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
    // Create OrbitControls for perspective camera
    const controls = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    controls.enableDamping = true; // Adds smooth inertia
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 50; // Minimum zoom distance
    controls.maxDistance = 800; // Maximum zoom distance
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent going below ground
    controls.target.set(330, 0, 220); // Look at center (330, 220)
    controls.update();
    // Store reference to controls
    orbitControlsRef.current = controls;
    // Prevent context menu on right click
    containerRef.current.addEventListener('contextmenu', handleContextMenu);
  };
  // Animation loop
  const animate = () => {
    if (!sceneRef.current || !rendererRef.current) return;
    // Use the appropriate camera based on the current step
    const camera = currentStep === 2 ? topDownCameraRef.current : cameraRef.current;
    if (!camera) return;
    // Update orbit controls if in step 1
    if (currentStep === 1 && orbitControlsRef.current) {
      orbitControlsRef.current.update();
    }
    // Handle smooth zoom animation
    if (cameraRef.current && cameraRef.current.userData.zoomTarget) {
      const elapsed = Date.now() - cameraRef.current.userData.zoomStartTime;
      const progress = Math.min(elapsed / cameraRef.current.userData.zoomDuration, 1);
      // Use easeOutQuad easing function
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      if (progress < 1) {
        // Interpolate between start and target position
        cameraRef.current.position.lerpVectors(
          cameraRef.current.userData.zoomStart,
          cameraRef.current.userData.zoomTarget,
          easedProgress,
        );
        // Keep the camera looking at the center
        cameraRef.current.lookAt(330, 0, 220); // Look at center (330, 220)
      } else {
        // Animation complete, clear the animation data
        cameraRef.current.position.copy(cameraRef.current.userData.zoomTarget);
        cameraRef.current.lookAt(330, 0, 220); // Look at center (330, 220)
        delete cameraRef.current.userData.zoomTarget;
      }
    }
    // Render scene
    rendererRef.current.render(sceneRef.current, camera);
    // Continue animation loop
    animationFrameId.current = requestAnimationFrame(animate);
  };

  // Handle window resize
  const handleResize = () => {
    if (!containerRef.current || !rendererRef.current || !cameraRef.current || !topDownCameraRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    // Update perspective camera
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    // Update orthographic camera
    const aspectRatio = width / height;
    const viewSize = 180;
    topDownCameraRef.current.left = -viewSize * aspectRatio;
    topDownCameraRef.current.right = viewSize * aspectRatio;
    topDownCameraRef.current.top = viewSize;
    topDownCameraRef.current.bottom = -viewSize;
    topDownCameraRef.current.updateProjectionMatrix();
    // Update renderer
    rendererRef.current.setSize(width, height);
  };

  // Toggle layer visibility
  const toggleLayer = (layerId: keyof typeof layerFilters) => {
    // Prevent toggling structures layer (always visible)
    if (layerId === 'structures') return;
    setLayerFilters((prev) => {
      const newState = { ...prev, [layerId]: !prev[layerId] };
      // Update scene visibility immediately
      if (layerId === 'vegetation' && vegetationRef.current) {
        vegetationRef.current.visible = newState.vegetation;
      }
      // Update grid visibility
      if (layerId === 'grid' && gridRef.current) {
        gridRef.current.visible = newState.grid;
      }
      // Show/hide labels when layers are toggled off
      if (layerId === 'vegetation') {
        Object.values(labelsRef.current).forEach((label) => {
          if (label) {
            // Show labels when either vegetation or ground is hidden
            label.visible = !newState.vegetation;
          }
        });
      }
      return newState;
    });
  };

  // Render the improved component with better UI organization
  return (
    <div className="h-[80vh] w-full flex flex-col gap-4 mb-4">
      <span className="sr-only">{t(translations.canvasDescription)}</span>
      {/* Main content - 3D View takes most of the space */}
      <div role="application" className="flex-1 relative w-full min-h-72 overflow-hidden" ref={containerRef}>
        <div className="absolute top-4 flex flex-col lg:flex-row justify-between w-full gap-4 px-2 text-white">
          {/* Step title overlay */}
          <span className="font-semibold text-lg flex items-center">
            {currentStep === 1 ? (
              <>
                <IconFilter className="mr-2" />
                {t(step1.mode)}
              </>
            ) : (
              <>
                <IconRuler className="mr-2" />
                {t(step2.mode)}
              </>
            )}
          </span>

          {/* Instructions tooltip */}
          <p>{currentStep === 1 ? t(step1.description) : t(step2.description)}</p>
        </div>
      </div>

      {/* Bottom Controls Panel */}
      <div>
        {currentStep === 1 ? (
          /* Filtering Controls */
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-4">
              <div className="flex items-center">
                <IconLayers className="mr-2" />
                <span className="font-semibold">{t(step1.toggleLays)}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleLayer('vegetation')}
                  className="px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 text-[#006BE0] bg-white hover:bg-blue-100 border border-blue-500"
                >
                  <span className="flex items-center">
                    {layerFilters.vegetation ? <IconEye className="mr-2" /> : <IconEyeOff className="mr-2" />}
                    <span>{t(step1.vegetation)}</span>
                    <span className="sr-only">
                      &nbsp;{layerFilters.vegetation ? t(step1.enabled) : t(step1.disabled)}
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Measurement Controls - Improved Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Feature Selector */}
            <div className="col-span-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <IconBox className="mr-2" />
                  <span className="font-semibold">{t(step2.selectFeature)}</span>
                </div>
                {selectedFeature && (
                  <button
                    onClick={resetMeasurement}
                    className="px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 text-[#006BE0] bg-white hover:bg-blue-100 border border-blue-500"
                    aria-label={t(step2.reset)}
                  >
                    <IconRotateCcw className="mr-1" />
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2 max-h-32 overflow-y-auto p-2">
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => selectFeature(feature.id)}
                    className={`px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 border ${selectedFeature?.id === feature.id ? 'bg-[#006BE0] hover:bg-blue-600 text-white' : 'text-[#006BE0] bg-white hover:bg-blue-100 border-blue-500'}`}
                  >
                    <div className="font-medium">{t(feature.name)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Points */}
            <div className="col-span-3">
              <div className="flex items-center mb-2">
                <IconMapPin className="mr-2" />
                <span className="font-semibold">{t(step2.selectedPoints)}</span>
              </div>
              {selectedPoints.length > 0 ? (
                <div className="grid grid-cols-1 gap-2 max-h-36 overflow-y-auto">
                  {selectedPoints.map((point) => (
                    <div tabIndex={0} key={point.id} className="border border-[#333333] p-1 px-2 rounded-md ">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-[#e0002b] mr-1"></div>
                          <span>
                            {t(step2.point)} <span className="font-besley text-[#e0002b]">{point.name}</span>
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="font-[Besley] text-[#8e24aa] italic">x</span>:{' '}
                        {point.position.x.toFixed(1)} ft,
                      </div>
                      <div>
                        <span className="font-[Besley] text-[#633300] italic">y</span>:{' '}
                        {point.position.z.toFixed(1)} ft
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p>{t(step2.selectedPointsDescription)}</p>
                </div>
              )}
            </div>

            {/* Measurements Results - 4 columns */}
            <div className="col-span-5">
              <div className="flex items-center mb-2">
                <IconRuler className="mr-2" />
                <span className="font-semibold">{t(step2.measurements)}</span>
              </div>

              {selectedPoints.length >= 2 ? (
                <div className="flex flex-col gap-2 max-h-36 overflow-y-auto">
                  <div tabIndex={0} className="grid grid-cols-2 gap-2">
                    <div className="border border-[#333333] p-2 rounded-md">
                      <div>
                        {t(step2.perimeter)}: {measurementResults.perimeter}
                      </div>
                    </div>
                    <div className="border border-[#333333] p-2 rounded-md">
                      <div>
                        {t(step2.area)}: {measurementResults.area}
                      </div>
                    </div>
                  </div>

                  {selectedPoints.length >= 3 && measurementResults.method && (
                    <div tabIndex={0}>
                      <p>{parse(t(measurementResults.method))}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p>{t(step2.measurementDescription)}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AncientCityExplorer;

// Custom icon components to replace lucide-react dependency
const IconFilter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const IconRuler = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4Z"></path>
    <path d="m7.5 10.5 2 2"></path>
    <path d="m10.5 7.5 2 2"></path>
    <path d="m13.5 4.5 2 2"></path>
    <path d="m4.5 13.5 2 2"></path>
  </svg>
);

const IconEye = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const IconEyeOff = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
    <line x1="2" x2="22" y1="2" y2="22"></line>
  </svg>
);

const IconRotateCcw = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
    <path d="M3 3v5h5"></path>
  </svg>
);

const IconBox = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
    <path d="m3.3 7 8.7 5 8.7-5"></path>
    <path d="M12 22V12"></path>
  </svg>
);

const IconMapPin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const IconLayers = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path>
    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path>
    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path>
  </svg>
);
