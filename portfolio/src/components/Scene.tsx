'use client'  // Add this at the top to mark as client component

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, shaderMaterial } from '@react-three/drei'
import { Suspense, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

// Update color constants
const COLORS = {
  background: '#FDFCFB',
  spheres: [
    '#FFE4D6',  // Soft peach
    '#FFD9D9',  // Light pink
    '#F0E6FF',  // Soft lavender
    '#E6F0FF',  // Light blue
    '#FFE8E8',  // Pale rose
  ],
  satellites: [
    '#F5F5F5',  // White
    '#FFE8E8',  // Light rose
    '#E8F0FF',  // Light blue
    '#F0F0F5',  // Light gray
  ],
  lines: '#FFFFFF'  // White with low opacity
}

// Custom shader material for gooey effect
const GooeyMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.0, 0.0, 0.0),
    scale: 1.0
  },
  // Vertex shader
  `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    varying vec3 vEyeVector;
    uniform float time;
    uniform float scale;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      vEyeVector = normalize(worldPosition.xyz - cameraPosition);
      
      // Enhanced vertex displacement
      float displacement = sin(position.x * 5.0 + time) * 
                         sin(position.y * 5.0 + time) * 
                         sin(position.z * 5.0 + time) * 0.01 * scale;
                         
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
    
    void main() {
      // Enhanced Fresnel effect
      vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
      float fresnelTerm = 1.0 - max(dot(viewDirection, vNormal), 0.0);
      fresnelTerm = pow(fresnelTerm, 2.0);
      
      // Soft shadow simulation
      float shadowTerm = max(dot(vNormal, normalize(vec3(1.0, 1.0, 1.0))), 0.0);
      shadowTerm = pow(shadowTerm, 0.5);
      
      // Refraction-like effect
      vec3 refraction = reflect(vEyeVector, vNormal);
      float refractionStrength = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);
      
      // Subtle color variation based on position and time
      vec3 gradientColor = color + vec3(
        sin(vPosition.x * 2.0 + time * 0.5) * 0.1,
        sin(vPosition.y * 2.0 + time * 0.3) * 0.1,
        sin(vPosition.z * 2.0 + time * 0.4) * 0.1
      );
      
      // Highlight color
      vec3 highlightColor = vec3(1.0, 1.0, 1.0);
      
      // Combine all effects
      vec3 finalColor = mix(gradientColor, highlightColor, fresnelTerm * 0.5);
      finalColor = mix(finalColor, gradientColor * 0.5, (1.0 - shadowTerm) * 0.5);
      finalColor += vec3(refractionStrength * 0.1);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

// Extend Three.js with our custom material
extend({ GooeyMaterial });

// Main scene component
function Scene() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      zIndex: -1,
      background: COLORS.background 
    }}>
      {/* Text overlay */}
      <div className="text-overlay">
        <h1 className="headline">Imagine. Build. Inspire.</h1>
        <p className="subheadline">
          Bridging human creativity and emerging<br />
          tech to redefine experiences.
        </p>
      </div>
      
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={45} />
          <OrbitControls enableZoom={false} enablePan={false} />
          
          {/* Enhanced lighting setup */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <pointLight position={[-5, 5, -5]} intensity={0.5} />
          <spotLight
            position={[5, 5, 5]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            castShadow
          />
          
          <CellStructure />
        </Suspense>
    </Canvas>
      
      <style jsx>{`
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
        }
        
        .headline {
          font-size: 3.5rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          margin: 0 0 1rem 0;
          color: #222;
          text-align: center;
          line-height: 1.1;
          text-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        
        .subheadline {
          font-size: 1.2rem;
          font-weight: 400;
          letter-spacing: 0.01em;
          margin: 0;
          color: #444;
          text-align: center;
          line-height: 1.6;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
          .headline {
            font-size: 2.5rem;
          }
          
          .subheadline {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

// Cell structure component - all hooks are inside Canvas now
function CellStructure() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate cell structure spheres inside the component
  const cellSpheres = useMemo(() => {
    const count = 400; // Reduced slightly for larger spheres
    const radius = 2.2; // Increased main sphere radius
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
      
      // Larger spheres with more size variation like in the brief
      const sphereRadius = (0.12 + Math.random() * 0.15) * radius;
      
      // Minimal jitter to maintain surface integrity
      const jitter = 0.02;
      const position: [number, number, number] = [
        x * radius * (1 - jitter + Math.random() * jitter * 2),
        y * radius * (1 - jitter + Math.random() * jitter * 2),
        z * radius * (1 - jitter + Math.random() * jitter * 2)
      ];
      
      positions.push({ position, radius: sphereRadius });
    }
    
    // Add a layer just below the surface for depth
    const subSurfaceCount = 150;
    for (let i = 0; i < subSurfaceCount; i++) {
      const phi = Math.acos(1 - 2 * (i / subSurfaceCount));
      const theta = Math.PI * 2 * i * (1 + Math.sqrt(5)) / 2;
      
      // Calculate position slightly below surface
      const surfaceDepth = 0.85; // Position at 85% of radius
      const x = surfaceDepth * Math.cos(theta) * Math.sin(phi);
      const y = surfaceDepth * Math.sin(theta) * Math.sin(phi);
      const z = surfaceDepth * Math.cos(phi);
      
      // Larger spheres for subsurface too
      const sphereRadius = (0.12 + Math.random() * 0.15) * radius;
      
      positions.push({ 
        position: [x * radius, y * radius, z * radius], 
        radius: sphereRadius 
      });
    }
    
    return positions;
  }, []);
  
  // Generate satellite positions distributed across the page
  const satellitePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const count = 225;
    
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
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Very slow rotation of the central structure only
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
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
          />
        ))}
      </group>
      
      {/* Render satellites outside the rotating group */}
      {satellitePositions.map((pos, index) => (
        <Satellite key={`satellite-${index}`} position={pos} />
      ))}
    </>
  );
}

// Cell sphere component
function CellSphere({ position, radius, colorIndex }: { 
  position: [number, number, number], 
  radius: number,
  colorIndex: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const initialPosition = useRef(new THREE.Vector3(...position));
  
  // Reduced animation for better performance with more spheres
  const animParams = useMemo(() => ({
    frequency: 0.15 + Math.random() * 0.1,
    amplitude: 0.02 + Math.random() * 0.01, // Reduced amplitude
    phase: Math.random() * Math.PI * 2
  }), []);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      const time = state.clock.elapsedTime;
      
      // Subtle pulsing
      const scale = 1 + Math.sin(time * animParams.frequency + animParams.phase) * animParams.amplitude;
      meshRef.current.scale.set(scale, scale, scale);
      
      // Reduced position shift for better performance
      meshRef.current.position.x = initialPosition.current.x + Math.sin(time * 0.2 + animParams.phase) * 0.01;
      meshRef.current.position.y = initialPosition.current.y + Math.sin(time * 0.25 + animParams.phase) * 0.01;
      meshRef.current.position.z = initialPosition.current.z + Math.sin(time * 0.3 + animParams.phase) * 0.01;
      
      // Update shader uniforms
      materialRef.current.time = time;
      materialRef.current.scale = scale;
    }
  });

  const color = new THREE.Color(COLORS.spheres[colorIndex % COLORS.spheres.length]);

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      {/* @ts-ignore */}
      <gooeyMaterial 
        ref={materialRef}
        color={color}
        time={0}
        scale={1.0}
      />
    </mesh>
  );
}

// Satellite component
function Satellite({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  
  // Satellite size variations - more varied sizes like in the brief
  const SATELLITE_SIZES = [0.4, 0.3, 0.25, 0.2, 0.15, 0.1];
  
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
  
  // Float parameters - only x and y movement with reduced amplitude
  const floatRef = useRef({
    anchor: new THREE.Vector3(...position),
    xSpeed: 0.03 + Math.random() * 0.03, // Slower movement
    ySpeed: 0.03 + Math.random() * 0.03, // Slower movement
    xPhase: Math.random() * Math.PI * 2,
    yPhase: Math.random() * Math.PI * 2,
    xAmplitude: 0.1 + Math.random() * 0.2, // Reduced amplitude
    yAmplitude: 0.1 + Math.random() * 0.2  // Reduced amplitude
  });

  // Animation parameters for color shifting
  const colorAnimParams = useMemo(() => ({
    frequency: 0.1 + Math.random() * 0.05,
    phase: Math.random() * Math.PI * 2
  }), []);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      const time = state.clock.elapsedTime;
      const float = floatRef.current;
      
      // Calculate floating position - only x and y with reduced movement
      const x = float.anchor.x + Math.sin(time * float.xSpeed + float.xPhase) * float.xAmplitude;
      const y = float.anchor.y + Math.sin(time * float.ySpeed + float.yPhase) * float.yAmplitude;
      const z = float.anchor.z;
      
      // Update satellite position
      meshRef.current.position.set(x, y, z);

      // Update shader uniforms
      materialRef.current.time = time;
      materialRef.current.scale = size / SATELLITE_SIZES[0];
      
      // Subtle color shifting between adjacent colors in the palette
      const nextColorIndex = (colorIndex + 1) % COLORS.spheres.length;
      const colorBlend = (Math.sin(time * colorAnimParams.frequency + colorAnimParams.phase) + 1) * 0.5;
      
      const baseColor = new THREE.Color(COLORS.spheres[colorIndex]);
      const nextColor = new THREE.Color(COLORS.spheres[nextColorIndex]);
      baseColor.lerp(nextColor, colorBlend);
      
      materialRef.current.color = baseColor;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      {/* @ts-ignore */}
      <gooeyMaterial 
        ref={materialRef}
        color={color}
        time={0}
        scale={1.0}
      />
    </mesh>
  );
}

export default Scene;