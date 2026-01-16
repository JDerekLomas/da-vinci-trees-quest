import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useTranslations } from '../../../hooks/useTranslations';
import inverseSquareConfig from '../configs/inverse-square-law';
import '../../../shared/slider.css';
import { WavefrontProps, RaysProps, Scene3DProps, ControlsProps } from './interface';

// Wavefront Component
function Wavefront({ radius, intensity }: WavefrontProps) {
  const { t } = useTranslations();
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(radius, 32, 32, 0, Math.PI * 0.5, 0, Math.PI * 0.5);
  }, [radius]);

  const color = new THREE.Color().setHSL(0.6 - intensity * 0.5, 1, 0.5);

  return (
    <group>
      <mesh geometry={geometry} rotation={[0, (3 * Math.PI) / 4, 0]}>
        <meshPhongMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} wireframe={true} />
      </mesh>
      {/* Top label for intensity */}
      <Text
        position={[radius * Math.cos(Math.PI / 4), radius * Math.sin(Math.PI / 4) + 0.3, 0]}
        fontSize={0.2}
        color="white"
      >
        {`${t(inverseSquareConfig.labels.intensity)} / ${radius * radius}`}
      </Text>
      {/* Bottom label for radius */}
      <Text
        position={[radius * Math.cos(Math.PI / 4), radius * Math.sin(Math.PI / 4) - 0.3, 0]}
        fontSize={0.2}
        color="white"
      >
        {`${radius}${t(inverseSquareConfig.labels.radiusUnit)}`}
      </Text>
    </group>
  );
}

// SourceSphere Component
function SourceSphere() {
  const { t } = useTranslations();
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshPhongMaterial color="white" />
      </mesh>
      {/* Sound Source (Speaker) label */}
      <Text position={[0, 0.3, 0]} fontSize={0.05} color="white">
        {t(inverseSquareConfig.labels.soundSource)}
      </Text>
    </group>
  );
}

// Rays Component
function Rays({ distance }: RaysProps) {
  const { t } = useTranslations();
  const rayCount = 8;
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 0.5;
      pts.push(new THREE.Vector3(0, 0, 0));
      pts.push(new THREE.Vector3(Math.cos(angle) * 5, Math.sin(angle) * 5, 0));
    }
    return pts;
  }, []);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <>
      {/* Rays */}
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color="white" opacity={0.3} transparent />
      </lineSegments>
      {/* Spheres */}
      {points.map((point, index) => {
        if (index % 2 === 0) return null;
        const spherePos = new THREE.Vector3().copy(point).multiplyScalar(distance / 5);
        return (
          <group key={index}>
            <mesh position={spherePos}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color={distance % 1 != 0 ? 'red' : 'yellow'} />
            </mesh>

            {index % 3 == 0 && (
              <Text position={[spherePos.x, spherePos.y + 0.2, spherePos.z]} fontSize={0.05} color="white">
                {`${t(inverseSquareConfig.labels.intensity)} = ${(100 / (distance * distance)).toFixed(2)}`}
              </Text>
            )}
          </group>
        );
      })}
    </>
  );
}

// Scene3D Component
function Scene3D({ distance }: Scene3DProps) {
  const panGroupRef = useRef<THREE.Group>(null);
  const rotateGroupRef = useRef<THREE.Group>(null);

  const wavefronts = useMemo(() => {
    const fronts = [];
    for (let i = 1; i <= 4; i++) {
      const radius = i;
      const intensity = 1 / (radius * radius);
      fronts.push({ radius, intensity });
    }
    return fronts;
  }, []);

  return (
    <group ref={panGroupRef} name="panGroup">
      <group ref={rotateGroupRef} name="rotateGroup" rotation={[0, Math.PI / 2, 0]}>
        <SourceSphere />
        <Rays distance={distance} />
        {wavefronts.map((wf, index) => (
          <Wavefront key={index} radius={wf.radius} intensity={wf.intensity} />
        ))}
      </group>
    </group>
  );
}

// Controls Component
function Controls({ distance, onDistanceChange }: ControlsProps) {
  const { t } = useTranslations();
  const BASE_INTENSITY = 100;
  const intensity = BASE_INTENSITY / (distance * distance);
  const calculation = (distance ** 2).toFixed(2);

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #e0e0e0 ${percent}%)`;
  }, []);

  useEffect(() => {
    const baseLevelSlider = document.getElementById('slider-base-level') as HTMLInputElement;
    updateSliderBackground(baseLevelSlider);
  }, [distance]);

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-70 p-3 text-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="w-full lg:w-[40%]">
            <label className="block mb-2">
              <div>
                {t(inverseSquareConfig.labels.distance)}
                {' ('}
                <span className="font-besley">
                  <i>r</i>
                </span>
                {')'}
              </div>
              <input
                id="slider-base-level"
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={distance}
                onChange={(e) => onDistanceChange(Number(e.target.value))}
                className="w-full mt-3 global-slider"
              />
              <div aria-hidden="true" className="text-base">
                {distance.toFixed(1)} {t(inverseSquareConfig.labels.units)}
              </div>
            </label>
          </div>

          <div className="w-full lg:w-[65%] p-3 bg-white rounded-lg overflow-x-auto">
            <span aria-live="polite" className="sr-only">
              {distance.toFixed(1)} {t(inverseSquareConfig.labels.unitsFull)}
              <br />
              {t(inverseSquareConfig.equation1)} {distance.toFixed(2)}
              {t(inverseSquareConfig.equation2)}
              {calculation}
              {t(inverseSquareConfig.equation3)} {intensity.toFixed(2)}
              {t(inverseSquareConfig.equation4)}
            </span>
            <div
              aria-hidden="true"
              style={{
                fontFamily: 'Besley',
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'black',
              }}
            >
              <span style={{ color: '#8E24AA' }}>
                <i>I</i>
                <sub
                  style={{
                    fontSize: '0.8em',
                    verticalAlign: 'baseline',
                    position: 'relative',
                    bottom: '-0.25em',
                    color: '#8E24AA',
                  }}
                >
                  2
                </sub>
              </span>{' '}
              ={' '}
              <span style={{ color: '#E0002B' }}>
                <i>I</i>
                <sub
                  style={{
                    fontSize: '0.8em',
                    verticalAlign: 'baseline',
                    position: 'relative',
                    bottom: '-0.25em',
                    color: '#E0002B',
                  }}
                >
                  1
                </sub>
              </span>{' '}
              ⋅ (
              <span style={{ color: '#677600' }}>
                <i>r</i>
                <sub
                  style={{
                    fontSize: '0.8em',
                    verticalAlign: 'baseline',
                    position: 'relative',
                    bottom: '-0.25em',
                    color: '#677600',
                  }}
                >
                  1
                </sub>
              </span>
              /
              <span style={{ color: '#008217' }}>
                <i>r</i>
                <sub
                  style={{
                    fontSize: '0.8em',
                    verticalAlign: 'baseline',
                    position: 'relative',
                    bottom: '-0.25em',
                    color: '#008217',
                  }}
                >
                  2
                </sub>
              </span>
              )
              <sup
                style={{
                  fontSize: '0.8em',
                  verticalAlign: 'baseline',
                  position: 'relative',
                  top: '-0.5em',
                  color: '#DB0072',
                }}
              >
                2
              </sup>{' '}
              ={' '}
              <span style={{ color: '#E0002B' }}>
                <i>I</i>
                <sub
                  style={{
                    fontSize: '0.8em',
                    verticalAlign: 'baseline',
                    position: 'relative',
                    bottom: '-0.25em',
                    color: '#E0002B',
                  }}
                >
                  1
                </sub>
              </span>{' '}
              ⋅ (1/<span style={{ color: '#008217' }}>{distance.toFixed(2)}</span>)
              <sup
                style={{
                  fontSize: '0.8em',
                  verticalAlign: 'baseline',
                  position: 'relative',
                  top: '-0.5em',
                  color: '#DB0072',
                }}
              >
                2
              </sup>{' '}
              ={' '}
              <span style={{ color: '#E0002B' }}>
                <i>I</i>
                <sub
                  style={{
                    fontSize: '0.8em',
                    verticalAlign: 'baseline',
                    position: 'relative',
                    bottom: '-0.25em',
                    color: '#E0002B',
                  }}
                >
                  1
                </sub>
              </span>
              /<span style={{ color: '#DB0072' }}>{calculation}</span> ={' '}
              <span style={{ color: '#8E24AA' }}>{intensity.toFixed(2)}</span> <i>W/m</i>
              <sup
                style={{
                  fontSize: '0.8em',
                  verticalAlign: 'baseline',
                  position: 'relative',
                  top: '-0.5em',
                }}
              >
                2
              </sup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function InverseSquareViz() {
  const [distance, setDistance] = useState(5);
  const [chartHeight, setChartHeight] = useState(500);
  const { t } = useTranslations();
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight) {
        setChartHeight(window.innerHeight - 150);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerHeight]);

  function KeyboardControls() {
    const { scene } = useThree();
    const panSpeed = 0.4;
    const rotateSpeed = 0.05;

    useEffect(() => {
      const panGroup = scene.getObjectByName('panGroup') as THREE.Group;
      const rotateGroup = scene.getObjectByName('rotateGroup') as THREE.Group;
      const minScale = 0.5;
      const maxScale = 5.0;
      const handleKeyDown = (event: KeyboardEvent) => {
        const slider = document.getElementById('slider-base-level') as HTMLInputElement;
        if (document.activeElement === slider) {
          return;
        }

        if (!panGroup || !rotateGroup) return;

        if (event.key === '+') {
          if (panGroup.scale.x < maxScale) {
            panGroup.scale.multiplyScalar(1.1);
          }
        } else if (event.key === '-') {
          if (panGroup.scale.x > minScale) {
            panGroup.scale.multiplyScalar(0.9);
          }
        }

        if (event.ctrlKey) {
          switch (event.key) {
            case 'ArrowUp':
              panGroup.position.y += panSpeed;
              break;
            case 'ArrowDown':
              panGroup.position.y -= panSpeed;
              break;
            case 'ArrowLeft':
              panGroup.position.z += panSpeed;
              break;
            case 'ArrowRight':
              panGroup.position.z -= panSpeed;
              break;
          }
        } else {
          const quaternion = new THREE.Quaternion();

          switch (event.key) {
            case 'ArrowUp':
              quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), rotateSpeed);
              rotateGroup.quaternion.multiply(quaternion);
              break;
            case 'ArrowDown':
              quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -rotateSpeed);
              rotateGroup.quaternion.multiply(quaternion);
              break;
            case 'ArrowLeft':
              quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotateSpeed);
              rotateGroup.quaternion.multiply(quaternion);
              break;
            case 'ArrowRight':
              quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -rotateSpeed);
              rotateGroup.quaternion.multiply(quaternion);
              break;
          }
        }
      };

      const handleWheel = (event: WheelEvent) => {
        if (!panGroup) return;

        if (event.deltaY < 0) {
          if (panGroup.scale.x < maxScale) {
            panGroup.scale.multiplyScalar(1.1);
          }
        } else {
          if (panGroup.scale.x > minScale) {
            panGroup.scale.multiplyScalar(0.9);
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('wheel', handleWheel);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('wheel', handleWheel);
      };
    }, [scene]);

    return null;
  }

  return (
    <div
      role="application"
      aria-label={t(inverseSquareConfig.graphDescription)}
      tabIndex={0}
      className="w-full relative"
      style={{ height: `${chartHeight}px` }}
    >
      <Canvas camera={{ position: [8, 2, 0] }} className="w-full h-full bg-gray-900">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Scene3D distance={distance} />
        <OrbitControls minDistance={5} maxDistance={10} />
        <KeyboardControls />
      </Canvas>
      <Controls distance={distance} onDistanceChange={setDistance} />
    </div>
  );
}
