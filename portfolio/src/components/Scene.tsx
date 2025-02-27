'use client'  // Add this at the top to mark as client component

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, shaderMaterial } from '@react-three/drei'
import { Suspense, useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

// Update color constants
const COLORS = {
  background: '#FDFCFB',
  spheres: [
    '#FFD8C0',  // More saturated peach
    '#FFD0D0',  // More saturated pink
    '#E8D8FF',  // More saturated lavender
    '#D8E5FF',  // More saturated light blue
    '#FFD8D8',  // More saturated pale rose
  ],
  satellites: [
    '#FFFFFF',  // Pure white
    '#FFE0E0',  // More saturated light rose
    '#E0E8FF',  // More saturated light blue
    '#F0F0F5',  // Light gray
  ],
  lines: '#FFFFFF'  // White with low opacity
}

// Custom shader material for gooey effect
const GooeyMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.0, 0.0, 0.0),
    scale: 1.0,
    opacity: 1.0,
    isMobile: false  // Add mobile flag
  },
  // Vertex shader
  `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    varying vec3 vEyeVector;
    uniform float time;
    uniform float scale;
    uniform bool isMobile;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      vEyeVector = normalize(worldPosition.xyz - cameraPosition);
      
      // Simplified displacement for mobile
      float displacement;
      if (isMobile) {
        displacement = sin(position.x * 4.0 + time) * 
                      sin(position.y * 4.0 + time) * 0.008 * scale;
      } else {
        displacement = sin(position.x * 5.0 + time) * 
                      sin(position.y * 5.0 + time) * 
                      sin(position.z * 5.0 + time) * 0.01 * scale;
      }
                      
      vec3 newPosition = position + normal * displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  // Fragment shader
  `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    varying vec3 vEyeVector;
    uniform vec3 color;
    uniform float time;
    uniform float opacity;
    uniform bool isMobile;
    
    void main() {
      // Simplified calculations for mobile
      vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
      float fresnelTerm = 1.0 - max(dot(viewDirection, vNormal), 0.0);
      fresnelTerm = pow(fresnelTerm, isMobile ? 1.6 : 1.8);
      
      float shadowTerm = max(dot(vNormal, normalize(vec3(1.0, 1.0, 1.0))), 0.0);
      shadowTerm = pow(shadowTerm, isMobile ? 0.5 : 0.4);
      
      // Skip refraction calculation on mobile
      float refractionStrength = 0.0;
      if (!isMobile) {
        vec3 refraction = reflect(vEyeVector, vNormal);
        refractionStrength = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);
      }
      
      // Simplified color variation for mobile
      vec3 gradientColor;
      if (isMobile) {
        gradientColor = color + vec3(
          sin(vPosition.x * 1.5 + time * 0.4) * 0.1,
          sin(vPosition.y * 1.5 + time * 0.2) * 0.1,
          sin(vPosition.z * 1.5 + time * 0.3) * 0.1
        );
      } else {
        gradientColor = color + vec3(
          sin(vPosition.x * 2.0 + time * 0.5) * 0.12,
          sin(vPosition.y * 2.0 + time * 0.3) * 0.12,
          sin(vPosition.z * 2.0 + time * 0.4) * 0.12
        );
      }
      
      vec3 highlightColor = vec3(1.0, 1.0, 1.0);
      
      // Combine effects with mobile optimizations
      vec3 finalColor = mix(gradientColor, highlightColor, fresnelTerm * (isMobile ? 0.5 : 0.6));
      finalColor = mix(finalColor, gradientColor * 0.45, (1.0 - shadowTerm) * (isMobile ? 0.5 : 0.6));
      
      if (!isMobile) {
        finalColor += vec3(refractionStrength * 0.15);
      }
      
      float smoothOpacity = opacity * opacity;
      gl_FragColor = vec4(finalColor, smoothOpacity);
    }
  `
);

// Extend Three.js with our custom material
extend({ GooeyMaterial });

// Add before Scene component
type PerformanceTier = 'low' | 'medium' | 'high';

function getPerformanceTier(): PerformanceTier {
  // Check if running on mobile
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) return 'high';

  // Use hardware concurrency as a rough estimate of device capability
  const cores = navigator.hardwareConcurrency || 4;
  
  // Check if device has coarse pointer (usually means touch screen)
  const hasCoarsePointer = window.matchMedia('(any-pointer: coarse)').matches;
  
  // Simple benchmark - create and delete many objects
  const startTime = performance.now();
  for(let i = 0; i < 1000; i++) {
    const obj: { test?: number } = { test: i };
    delete obj.test;
  }
  const endTime = performance.now();
  const benchmarkScore = endTime - startTime;

  // Determine tier based on device capabilities
  if (cores <= 4 || benchmarkScore > 5 || (hasCoarsePointer && cores <= 6)) {
    return 'low';
  } else if (cores <= 6 || benchmarkScore > 2) {
    return 'medium';
  }
  return 'high';
}

// Main scene component - this is the wrapper that contains both HTML and Canvas
function Scene() {
  const [gradientAngle, setGradientAngle] = useState(45);
  const [isMobile, setIsMobile] = useState(false);
  const [performanceTier, setPerformanceTier] = useState<PerformanceTier>('high');
  const [dpr, setDpr] = useState(1); // Default to 1 for SSR
  
  // Performance detection
  useEffect(() => {
    const tier = getPerformanceTier();
    setPerformanceTier(tier);
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      // Update performance tier on resize
      setPerformanceTier(getPerformanceTier());
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduce background gradient animation frequency for low-end devices
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientAngle(prev => (prev + 0.1) % 360);
    }, performanceTier === 'low' ? 200 : 100);
    
    return () => clearInterval(interval);
  }, [performanceTier]);

  useEffect(() => {
    // Update DPR once we're on the client side
    setDpr(performanceTier === 'low' ? 1 : window.devicePixelRatio);
  }, [performanceTier]);
  
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      zIndex: -1,
      background: `linear-gradient(${gradientAngle}deg, #FDFCFB 0%, #F8F6F6 35%, #F2EDED 65%, #FAF6F6 100%)`,
      transition: 'background 1s ease'
    }}>
      {/* Vignette overlay */}
      <div className="vignette-overlay"></div>
      
      {/* Text overlay */}
      <div className="text-overlay">
        <h1 className="headline">
          <span className="headline-word">Imagine.</span>
          <span className="headline-word">Build.</span>
          <span className="headline-word">Inspire.</span>
        </h1>
        <p className="subheadline">
          I work at the intersection of human creativity and
          emerging technology to redefine experiences.
        </p>
      </div>
      
      <div className="canvas-container">
        <Canvas
          camera={isMobile ? 
            { position: [0, 0, 15], fov: 35 } : 
            { position: [0, 0, 9], fov: 45 }
          }
          style={{ width: '100%', height: '100%' }}
          frameloop={performanceTier === 'low' ? 'demand' : 'always'} // Only render when needed for low-end devices
          dpr={dpr} // Use the state value instead of directly accessing window
        >
          <Suspense fallback={null}>
            <PerspectiveCamera 
              makeDefault 
              position={isMobile ? [0, 0, 15] : [0, 0, 9]} 
              fov={isMobile ? 35 : 45} 
            />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              enableDamping={performanceTier !== 'low'} // Disable damping for low-end devices
            />
            
            {/* Reduce number of lights for low-end devices */}
            <ambientLight intensity={0.4} />
            {performanceTier !== 'low' && (
              <>
                <directionalLight position={[10, 10, 5]} intensity={1.2} />
                <pointLight position={[-5, 5, -5]} intensity={0.8} />
                <spotLight
                  position={[5, 5, 5]}
                  angle={0.3}
                  penumbra={1}
                  intensity={0.8}
                  castShadow
                />
              </>
            )}
            
            <SceneContent isMobile={isMobile} performanceTier={performanceTier} />
          </Suspense>
        </Canvas>
      </div>
      
      <style jsx>{`
        .vignette-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 5;
          background: radial-gradient(
            circle at center,
            transparent 30%,
            rgba(0, 0, 0, 0.03) 60%,
            rgba(0, 0, 0, 0.07) 100%
          );
        }
        
        .text-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          pointer-events: none;
          z-index: 10;
          animation: fadeIn 1.5s ease-out forwards;
          padding: 1rem;
        }
        
        .headline {
          font-size: 3.5rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          margin: 0 0 1rem 0;
          color: #222;
          text-align: center;
          line-height: 1.2;
          text-shadow: 0 1px 2px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
        }

        .headline-word {
          display: inline-block;
        }
        
        .subheadline {
          font-size: 1.4rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          margin: 0;
          color: #333;
          text-align: center;
          line-height: 1.6;
          max-width: 90%;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
          .headline {
            font-size: 2.8rem;
            flex-direction: column;
            gap: 0.2rem;
            line-height: 1.1;
          }
          
          .subheadline {
            font-size: 1.2rem;
            line-height: 1.4;
            br {
              display: none;
            }
          }
        }

        @media (max-width: 480px) {
          .headline {
            font-size: 2.4rem;
          }
          
          .subheadline {
            font-size: 1.1rem;
            padding: 0 1rem;
          }
        }
        
        .canvas-container {
          width: 100%;
          height: 100%;
          opacity: 0;
          animation: canvasFadeIn 1.2s ease-in forwards;
        }
        
        @keyframes canvasFadeIn {
          0% { opacity: 0; }
          20% { opacity: 0.1; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// This component contains all the 3D content that goes inside the Canvas
function SceneContent({ isMobile, performanceTier }: { 
  isMobile: boolean,
  performanceTier: PerformanceTier 
}) {
  const [opacity, setOpacity] = useState(0);
  
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setOpacity(0.01);
      
      const fadeInterval = setInterval(() => {
        setOpacity(prev => {
          const newOpacity = prev + 0.05;
          if (newOpacity >= 1) {
            clearInterval(fadeInterval);
            return 1;
          }
          return newOpacity;
        });
      }, 50);
      
      return () => {
        clearInterval(fadeInterval);
      };
    }, 300);
    
    return () => clearTimeout(startTimer);
  }, []);

  return (
    <>
      <group>
        <CellStructure 
          opacity={opacity} 
          isMobile={isMobile} 
          performanceTier={performanceTier}
        />
        <AbsorptionEffect />
      </group>
    </>
  );
}

// Cell structure component - all hooks are inside Canvas now
function CellStructure({ opacity, isMobile, performanceTier }: { 
  opacity: number, 
  isMobile: boolean,
  performanceTier: PerformanceTier
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate cell structure spheres inside the component
  const cellSpheres = useMemo(() => {
    // Further reduce count for low-end devices
    const count = performanceTier === 'low' ? 150 : 
                 performanceTier === 'medium' ? 250 : 
                 isMobile ? 300 : 400;
                 
    const radius = isMobile ? 1.8 : 2.2;
    const positions: { position: [number, number, number], radius: number }[] = [];
    
    // Create a dense sphere of spheres on the surface
    for (let i = 0; i < count; i++) {
      // Use fibonacci sphere algorithm for even distribution
      const phi = Math.acos(1 - 2 * (i / count));
      const theta = Math.PI * 2 * i * (1 + Math.sqrt(5)) / 2;
      
      // Calculate position on sphere
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);
      
      // Use different sphere sizes based on device
      const sphereRadius = isMobile ? 
        (0.1 + Math.random() * 0.12) * radius :
        (0.12 + Math.random() * 0.15) * radius;
      
      // Minimal jitter to maintain surface integrity
      const jitter = isMobile ? 0.015 : 0.02; // Reduced jitter for mobile
      const position: [number, number, number] = [
        x * radius * (1 - jitter + Math.random() * jitter * 2),
        y * radius * (1 - jitter + Math.random() * jitter * 2),
        z * radius * (1 - jitter + Math.random() * jitter * 2)
      ];
      
      positions.push({ position, radius: sphereRadius });
    }
    
    // Add a layer just below the surface for depth
    const subSurfaceCount = isMobile ? 100 : 150;
    for (let i = 0; i < subSurfaceCount; i++) {
      const phi = Math.acos(1 - 2 * (i / subSurfaceCount));
      const theta = Math.PI * 2 * i * (1 + Math.sqrt(5)) / 2;
      
      // Calculate position slightly below surface
      const surfaceDepth = 0.85;
      const x = surfaceDepth * Math.cos(theta) * Math.sin(phi);
      const y = surfaceDepth * Math.sin(theta) * Math.sin(phi);
      const z = surfaceDepth * Math.cos(phi);
      
      const sphereRadius = isMobile ?
        (0.1 + Math.random() * 0.12) * radius :
        (0.12 + Math.random() * 0.15) * radius;
      
      positions.push({ 
        position: [x * radius, y * radius, z * radius], 
        radius: sphereRadius 
      });
    }
    
    return positions;
  }, [isMobile, performanceTier]);
  
  // Generate satellite positions distributed across the page
  const satellitePositions = useMemo(() => {
    // Don't calculate positions for mobile devices
    if (isMobile) return [];
    
    const positions: [number, number, number][] = [];
    const count = 225; // Full count for desktop only
    
    // Fixed z-position to match the main sphere's z-axis
    const fixedZ = 0;
    
    // Create a distribution that matches the image
    for (let i = 0; i < count; i++) {
      let x, y;
      
      // Determine which region to place this satellite
      const regionSelector = Math.random();
      
      if (regionSelector < 0.3) {
        // Left side satellites (30%)
        x = -12 + Math.random() * 7; // -12 to -5
        y = (Math.random() * 2 - 1) * 8; // Full height
      } 
      else if (regionSelector < 0.6) {
        // Right side satellites (30%)
        x = 5 + Math.random() * 7; // 5 to 12
        y = (Math.random() * 2 - 1) * 8; // Full height
      }
      else if (regionSelector < 0.75) {
        // Bottom satellites (15%)
        x = -5 + Math.random() * 10; // -5 to 5 (center area)
        y = -8 + Math.random() * 4; // -8 to -4 (bottom area)
      }
      else {
        // Middle satellites around the main sphere (25%)
        const angle = Math.random() * Math.PI * 2;
        const distance = 3.5 + Math.random() * 1.5; // 3.5 to 5 units from center
        x = Math.cos(angle) * distance;
        y = Math.sin(angle) * distance;
      }
      
      // Ensure minimum distance from center
      const distFromCenter = Math.sqrt(x*x + y*y);
      if (distFromCenter < 3.5) {
        const factor = 3.5 / distFromCenter;
        positions.push([x * factor, y * factor, fixedZ]);
      } else {
        positions.push([x, y, fixedZ]);
      }
    }
    
    return positions;
  }, [isMobile]);
  
  useFrame((state) => {
    if (groupRef.current) {
      if (performanceTier === 'low' && state.clock.elapsedTime % 3 !== 0) return;
      
      const rotationSpeed = performanceTier === 'low' ? 0.03 :
                          performanceTier === 'medium' ? 0.04 : 0.05;
                          
      groupRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
      
      if (performanceTier !== 'low') {
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
      }
    }
  });

  return (
    <>
      <group ref={groupRef}>
        {/* Render cell structure spheres */}
        {cellSpheres.map((sphere, index) => (
          <CellSphere 
            key={`cell-${index}`} 
            position={sphere.position} 
            radius={sphere.radius}
            colorIndex={index % COLORS.spheres.length}
            opacity={opacity}
            isMobile={isMobile}
            performanceTier={performanceTier}
          />
        ))}
        
        {/* Add absorption effect */}
        <AbsorptionEffect />
      </group>
      
      {/* Only render satellites on non-mobile devices */}
      {!isMobile && satellitePositions.map((pos, index) => (
        <Satellite 
          key={`satellite-${index}`} 
          position={pos} 
          opacity={opacity}
          isMobile={false}
        />
      ))}
    </>
  );
}

// Cell sphere component
function CellSphere({ position, radius, colorIndex, opacity, isMobile, performanceTier }: { 
  position: [number, number, number], 
  radius: number,
  colorIndex: number,
  opacity: number,
  isMobile: boolean,
  performanceTier: PerformanceTier
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const initialPosition = useRef(new THREE.Vector3(...position));
  
  // Reduced animation for better performance with more spheres
  const animParams = useMemo(() => ({
    frequency: 0.15 + Math.random() * 0.1,
    amplitude: isMobile ? 0.015 : 0.02, // Reduced amplitude for mobile
    phase: Math.random() * Math.PI * 2
  }), [isMobile]);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      const time = state.clock.elapsedTime;
      
      // Skip frames based on performance tier
      if ((performanceTier === 'low' && time % 4 !== 0) ||
          (performanceTier === 'medium' && time % 2 !== 0)) return;
      
      // Subtle pulsing
      const scale = 1 + Math.sin(time * animParams.frequency + animParams.phase) * animParams.amplitude;
      meshRef.current.scale.set(scale, scale, scale);
      
      // Reduced position shift and skip for mobile
      if (!isMobile) {
        meshRef.current.position.x = initialPosition.current.x + Math.sin(time * 0.2 + animParams.phase) * 0.01;
        meshRef.current.position.y = initialPosition.current.y + Math.sin(time * 0.25 + animParams.phase) * 0.01;
        meshRef.current.position.z = initialPosition.current.z + Math.sin(time * 0.3 + animParams.phase) * 0.01;
      }
      
      // Update shader uniforms
      materialRef.current.time = time;
      materialRef.current.scale = scale;
      materialRef.current.opacity = opacity;
    }
  });

  const color = new THREE.Color(COLORS.spheres[colorIndex % COLORS.spheres.length]);

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[
        radius,
        performanceTier === 'low' ? 8 : 
        performanceTier === 'medium' ? 12 : 
        isMobile ? 16 : 32,
        performanceTier === 'low' ? 8 : 
        performanceTier === 'medium' ? 12 : 
        isMobile ? 16 : 32
      ]} />
      {/* @ts-ignore */}
      <gooeyMaterial 
        ref={materialRef}
        color={color}
        time={0}
        scale={1.0}
        transparent={true}
        opacity={opacity}
        isMobile={isMobile}
      />
    </mesh>
  );
}

// Satellite component
function Satellite({ position, opacity, isMobile }: { 
  position: [number, number, number],
  opacity: number,
  isMobile: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  
  // Satellite size variations - slightly smaller for mobile
  const SATELLITE_SIZES = isMobile ? 
    [0.35, 0.25, 0.2, 0.15, 0.12, 0.08] :
    [0.4, 0.3, 0.25, 0.2, 0.15, 0.1];
  
  // Reduce number of decaying orbits for mobile
  const hasDecayingOrbit = useMemo(() => Math.random() < (isMobile ? 0.05 : 0.08), []);
  
  // Update the orbit parameters for mobile optimization
  const orbitParams = useMemo(() => {
    const initialDistance = Math.sqrt(position[0] * position[0] + position[1] * position[1]);
    const zPlaneOffset = (Math.abs(position[0] * 100 + position[1] * 50) % 20) - 10;
    
    return {
      initialDistance,
      decayRate: 0.05 + Math.random() * 0.1,
      // Slower speeds for mobile
      speed: (0.05 + Math.random() * 0.15) * (isMobile ? 0.8 : 1),
      startAngle: Math.atan2(position[1], position[0]),
      decayStartTime: 5 + Math.random() * 30,
      // Reduced eccentricity for mobile
      eccentricity: Math.random() * (isMobile ? 0.15 : 0.2),
      // Reduced inclination for mobile
      inclination: Math.random() * Math.PI * (isMobile ? 0.08 : 0.1),
      direction: Math.random() > 0.5 ? 1 : -1,
      zPlaneOffset: zPlaneOffset * (isMobile ? 0.25 : 0.3),
      // Reduced tilt for mobile
      planeTiltX: Math.random() * (isMobile ? 0.25 : 0.3),
      planeTiltY: Math.random() * (isMobile ? 0.25 : 0.3)
    };
  }, [position]);
  
  // Size based on position - weighted to create more small satellites
  const size = useMemo(() => {
    const sizeIndex = Math.abs(Math.round(position[0] * position[1] * 100)) % 100;
    if (sizeIndex < 5) {
      return SATELLITE_SIZES[0]; // 5% chance of largest size
    } else if (sizeIndex < 15) {
      return SATELLITE_SIZES[1]; // 10% chance of second largest
    } else if (sizeIndex < 30) {
      return SATELLITE_SIZES[2]; // 15% chance of third largest
    } else if (sizeIndex < 50) {
      return SATELLITE_SIZES[3]; // 20% chance of medium
    } else if (sizeIndex < 75) {
      return SATELLITE_SIZES[4]; // 25% chance of small
    } else {
      return SATELLITE_SIZES[5]; // 25% chance of smallest
    }
  }, [position]);

  // Use the same color palette as the main sphere
  const colorIndex = useMemo(() => {
    return Math.abs(Math.round(position[0] * 100 + position[1] * 50)) % COLORS.spheres.length;
  }, [position]);

  const color = new THREE.Color(COLORS.spheres[colorIndex]);
  
  // Pulse animation parameters
  const pulseParams = useMemo(() => ({
    shouldPulse: Math.random() < 0.33,
    frequency: 0.2 + Math.random() * 0.3,
    phase: Math.random() * Math.PI * 2,
    amplitude: 0.15 + Math.random() * 0.1
  }), []);
  
  // State to track if this satellite has been absorbed
  const [isAbsorbed, setIsAbsorbed] = useState(false);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      const time = state.clock.elapsedTime;
      
      // Handle decaying orbit animation
      if (hasDecayingOrbit && time > orbitParams.decayStartTime && !isAbsorbed) {
        // Calculate how far along the decay we are
        const decayTime = time - orbitParams.decayStartTime;
        const decayFactor = Math.exp(-decayTime * orbitParams.decayRate);
        
        // Current distance from center (decreasing over time)
        const currentDistance = orbitParams.initialDistance * decayFactor;
        
        // Current angle in orbit (increasing over time)
        const currentAngle = orbitParams.startAngle + time * orbitParams.speed * orbitParams.direction;
        
        // Calculate new position based on decaying orbit with z-plane offset
        const baseX = Math.cos(currentAngle) * currentDistance * (1 + orbitParams.eccentricity * Math.sin(currentAngle));
        const baseY = Math.sin(currentAngle) * currentDistance * (1 + orbitParams.eccentricity * Math.cos(currentAngle));
        
        // Apply orbital plane tilt to create 3D orbits on different planes
        const x = baseX * Math.cos(orbitParams.planeTiltY) - baseY * Math.sin(orbitParams.planeTiltX) * Math.sin(orbitParams.planeTiltY);
        const y = baseX * Math.sin(orbitParams.planeTiltY) * Math.sin(orbitParams.planeTiltX) + baseY * Math.cos(orbitParams.planeTiltX);
        const z = orbitParams.zPlaneOffset + Math.sin(currentAngle + orbitParams.inclination) * 0.2 * currentDistance;
        
        // Update position
        meshRef.current.position.set(x, y, z);
        
        // Increase rotation speed as it gets closer to center
        meshRef.current.rotation.x += 0.01 / decayFactor * 0.1;
        meshRef.current.rotation.y += 0.01 / decayFactor * 0.1;
        
        // Scale down as it approaches the center
        const scaleDown = Math.max(0.1, decayFactor);
        meshRef.current.scale.set(scaleDown, scaleDown, scaleDown);
        
        // If close enough to center, mark as absorbed
        if (currentDistance < 0.3) {
          setIsAbsorbed(true);
        }
      } 
      // Regular orbit animation for non-decaying satellites
      else if (!isAbsorbed) {
        // Current angle in orbit
        const currentAngle = orbitParams.startAngle + time * orbitParams.speed * orbitParams.direction;
        
        // Calculate position based on stable orbit with z-plane offset
        const baseX = Math.cos(currentAngle) * orbitParams.initialDistance * (1 + orbitParams.eccentricity * Math.sin(currentAngle));
        const baseY = Math.sin(currentAngle) * orbitParams.initialDistance * (1 + orbitParams.eccentricity * Math.cos(currentAngle));
        
        // Apply orbital plane tilt to create 3D orbits on different planes
        const x = baseX * Math.cos(orbitParams.planeTiltY) - baseY * Math.sin(orbitParams.planeTiltX) * Math.sin(orbitParams.planeTiltY);
        const y = baseX * Math.sin(orbitParams.planeTiltY) * Math.sin(orbitParams.planeTiltX) + baseY * Math.cos(orbitParams.planeTiltX);
        const z = orbitParams.zPlaneOffset + Math.sin(currentAngle + orbitParams.inclination) * 0.2 * orbitParams.initialDistance;
        
        // Update position
        meshRef.current.position.set(x, y, z);

        // Apply pulse animation if this satellite should pulse
        if (pulseParams.shouldPulse) {
          const pulseScale = 1 + Math.sin(time * pulseParams.frequency + pulseParams.phase) * pulseParams.amplitude;
          meshRef.current.scale.set(pulseScale, pulseScale, pulseScale);
        }
      }
      // If absorbed, hide the satellite
      else {
        meshRef.current.visible = false;
      }

      // Update shader uniforms
      materialRef.current.time = time;
      materialRef.current.scale = size / SATELLITE_SIZES[0];
      
      // Subtle color shifting between adjacent colors in the palette
      const nextColorIndex = (colorIndex + 1) % COLORS.spheres.length;
      const colorBlend = (Math.sin(time * 0.1 + pulseParams.phase) + 1) * 0.5;
      
      const baseColor = new THREE.Color(COLORS.spheres[colorIndex]);
      const nextColor = new THREE.Color(COLORS.spheres[nextColorIndex]);
      baseColor.lerp(nextColor, colorBlend);
      
      materialRef.current.color = baseColor;
      
      // Apply the opacity (but respect the absorbed state)
      if (isAbsorbed) {
        materialRef.current.opacity = 0;
      } else {
        materialRef.current.opacity = opacity;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
      {/* @ts-ignore */}
      <gooeyMaterial 
        ref={materialRef}
        color={color}
        time={0}
        scale={1.0}
        transparent={true}
        opacity={opacity}
        isMobile={isMobile}
      />
    </mesh>
  );
}

// Add this component to create absorption effects when satellites are absorbed
function AbsorptionEffect() {
  // Implementation of absorption effect visual
  // This could be particle effects or glows that appear when satellites are absorbed
  return null; // For now, we'll just implement the satellite decay
}

export default Scene;