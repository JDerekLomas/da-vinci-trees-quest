import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { ParallelogramVerifierProps } from '../interface';
import { useTranslations } from '../../../hooks/useTranslations';

const ParallelogramVerifier: React.FC<ParallelogramVerifierProps> = ({ interaction, onInteraction }) => {
  const { t } = useTranslations();
  const { translations } = interaction;

  // Accessibility state
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [statusAnnouncement, setStatusAnnouncement] = useState('');
  const [isCanvasFocused, setIsCanvasFocused] = useState(false);

  // Announcement helper for screen readers
  const announceToScreenReader = useCallback((message: string, isStatus: boolean = false) => {
    if (isStatus) {
      setStatusAnnouncement(message);
      setTimeout(() => setStatusAnnouncement(''), 100);
    } else {
      setLiveAnnouncement(message);
      setTimeout(() => setLiveAnnouncement(''), 100);
    }
  }, []);

  // Three.js refs
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const animationIdRef = useRef<number>();
  const controlsRef = useRef<any>();

  // Simple orbit controls implementation
  const setupControls = (camera: THREE.Camera, domElement: HTMLElement) => {
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 1;

    const onMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isMouseDown) return;

      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      targetX += deltaX * 0.01;
      targetY += deltaY * 0.01;
      targetY = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetY));

      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const update = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      const distance = 30;
      camera.position.x = Math.cos(currentY) * Math.sin(currentX) * distance;
      camera.position.y = Math.sin(currentY) * distance + 25;
      camera.position.z = Math.cos(currentY) * Math.cos(currentX) * distance;
      camera.lookAt(0, 0, 0);
    };

    domElement.addEventListener('mousedown', onMouseDown);
    domElement.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('mousemove', onMouseMove);
    domElement.addEventListener('mouseleave', onMouseUp);

    return {
      update,
      dispose: () => {
        domElement.removeEventListener('mousedown', onMouseDown);
        domElement.removeEventListener('mouseup', onMouseUp);
        domElement.removeEventListener('mousemove', onMouseMove);
        domElement.removeEventListener('mouseleave', onMouseUp);
      },
    };
  };

  // Keyboard navigation handlers
  const handleCanvasKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isCanvasFocused) {
      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          announceToScreenReader(t(translations.domeRotationAnnouncement));
          break;
        case 'Tab':
          // Allow default tab behavior
          break;
        default:
          // Prevent other keys from affecting the canvas
          event.preventDefault();
          break;
      }
    }
  };

  useEffect(() => {
    const mountElement = mountRef.current;
    if (!mountElement) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a2b34);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      mountElement.clientWidth / mountElement.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(20, 8, 20);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
    mountElement.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Create dome geometry
    const radius = 15;
    const radialSegments = 24;
    const heightSegments = 12;
    const specialLayerIndex = 5; // The 6th layer from the base

    // Generate all vertices on a perfect sphere
    const sphericalVertices = [];
    for (let j = 0; j <= heightSegments; j++) {
      const v = j / heightSegments;
      const phi = v * Math.PI * 0.5;
      for (let i = 0; i <= radialSegments; i++) {
        const u = i / radialSegments;
        const theta = u * Math.PI * 2;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        sphericalVertices.push(new THREE.Vector3(x, y, z));
      }
    }

    // Create dome geometry (with missing layer)
    const domeGeometry = new THREE.BufferGeometry();
    const domeVerticesList = [];
    const domeIndices = [];

    for (let j = 0; j < heightSegments; j++) {
      if (j === specialLayerIndex) continue; // Skip creating faces for the special layer

      for (let i = 0; i < radialSegments; i++) {
        const v1 = sphericalVertices[j * (radialSegments + 1) + i];
        const v2 = sphericalVertices[(j + 1) * (radialSegments + 1) + i];
        const v3 = sphericalVertices[(j + 1) * (radialSegments + 1) + i + 1];
        const v4 = sphericalVertices[j * (radialSegments + 1) + i + 1];

        const baseIndex = domeVerticesList.length / 3;
        domeVerticesList.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, v3.x, v3.y, v3.z, v4.x, v4.y, v4.z);
        domeIndices.push(baseIndex, baseIndex + 1, baseIndex + 3);
        domeIndices.push(baseIndex + 1, baseIndex + 2, baseIndex + 3);
      }
    }
    domeGeometry.setIndex(domeIndices);
    domeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(domeVerticesList, 3));
    domeGeometry.computeVertexNormals();

    // Create parallelogram layer geometry
    const parallelogramLayerGeometry = new THREE.BufferGeometry();
    const parallelogramVertices = [];
    const parallelogramIndices = [];

    for (let i = 0; i < radialSegments; i++) {
      const j = specialLayerIndex;

      // Get three original spherical vertices to define the parallelogram
      const p1 = sphericalVertices[j * (radialSegments + 1) + i];
      const p2 = sphericalVertices[(j + 1) * (radialSegments + 1) + i];
      const p4 = sphericalVertices[j * (radialSegments + 1) + i + 1];

      // Calculate the 4th vertex to create a perfect parallelogram
      const p3 = new THREE.Vector3().addVectors(p4, new THREE.Vector3().subVectors(p2, p1));

      const baseIndex = i * 4;
      parallelogramVertices.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z, p4.x, p4.y, p4.z);

      parallelogramIndices.push(baseIndex, baseIndex + 1, baseIndex + 3);
      parallelogramIndices.push(baseIndex + 1, baseIndex + 2, baseIndex + 3);
    }
    parallelogramLayerGeometry.setIndex(parallelogramIndices);
    parallelogramLayerGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(parallelogramVertices, 3),
    );
    parallelogramLayerGeometry.computeVertexNormals();

    // Create materials and meshes
    const domeMaterial = new THREE.MeshStandardMaterial({
      color: 0x0077ff,
      side: THREE.DoubleSide,
      flatShading: true,
    });
    const dome = new THREE.Mesh(domeGeometry, domeMaterial);
    scene.add(dome);

    const parallelogramLayerMaterial = new THREE.MeshStandardMaterial({
      color: 0xff4136,
      side: THREE.DoubleSide,
      flatShading: true,
    });
    const parallelogramLayer = new THREE.Mesh(parallelogramLayerGeometry, parallelogramLayerMaterial);
    scene.add(parallelogramLayer);

    // Add wireframe to the main dome
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const wireframe = new THREE.Mesh(domeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Add controls
    controlsRef.current = setupControls(camera, renderer.domElement);

    // Handle window resize
    const handleResize = () => {
      if (!mountElement || !camera || !renderer) return;
      camera.aspect = mountElement.clientWidth / mountElement.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      if (controlsRef.current) controlsRef.current.update();
      renderer.render(scene, camera);
    };

    animate();

    // Report interaction on mount
    onInteraction({
      'parallelogram-verifier-loaded': true,
      'dome-type': t(translations.domeType),
    });

    // Announce component load to screen readers
    announceToScreenReader(t(translations.interactionLoaded));
    announceToScreenReader(t(translations.layerDescription));

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onInteraction]);

  return (
    <div className="flex flex-col gap-6">
      {/* Screen Reader Instructions - Hidden from visual users */}
      <div className="sr-only" aria-live="polite">
        {t(translations.screenReaderInstructions)}
      </div>
      <div className="sr-only" aria-live="polite">
        {t(translations.keyboardInstructions)}
      </div>

      {/* Live Announcements for Screen Readers */}
      <div aria-live="polite" className="sr-only">
        {liveAnnouncement}
      </div>
      <div aria-live="assertive" className="sr-only">
        {statusAnnouncement}
      </div>

      {/* Three.js container */}
      <div
        ref={mountRef}
        className={`w-full h-[500px] rounded-lg overflow-hidden bg-gray-200 cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isCanvasFocused ? 'ring-2 ring-blue-500 ring-offset-2' : ''
        }`}
        role="application"
        aria-label={t(translations.canvasAriaLabel)}
        aria-describedby="canvas-instructions"
        tabIndex={0}
        onKeyDown={handleCanvasKeyDown}
        onFocus={() => setIsCanvasFocused(true)}
        onBlur={() => setIsCanvasFocused(false)}
      />
      <div id="canvas-instructions" className="sr-only" aria-live="polite">
        {t(translations.canvasInstructions)}
      </div>
    </div>
  );
};

export default ParallelogramVerifier;
