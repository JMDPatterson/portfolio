'use client'  // Add this at the top to mark as client component

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, shaderMaterial } from '@react-three/drei'
import { Suspense, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

// Update color constants to include satellite colors
const COLORS = {
  background: '#E8E6E1',  // Warm light gray
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

// Core sphere positions and sizes - with more size variation
const CORE_SPHERES = [
  // Central cluster
  { position: [0, 0, 0] as [number, number, number], radius: 0.85 },          // Main central
  { position: [0.9, 0.2, 0.3] as [number, number, number], radius: 0.45 },    // Smaller right
  { position: [-0.7, 0.3, -0.2] as [number, number, number], radius: 0.6 },   // Medium left
  { position: [0.3, -0.8, 0.4] as [number, number, number], radius: 0.5 },    // Medium bottom
  
  // Upper central cluster (new)
  { position: [0.1, 1.0, 0.3] as [number, number, number], radius: 0.75 },    // Large upper center
  { position: [-0.4, 1.2, 0.1] as [number, number, number], radius: 0.55 },   // Medium upper left
  { position: [0.5, 1.3, -0.2] as [number, number, number], radius: 0.5 },    // Medium upper right
  
  // Existing upper spheres adjusted
  { position: [0.2, 0.4, 0.8] as [number, number, number], radius: 0.4 },     // Small top
  { position: [-0.4, 0.6, 0.7] as [number, number, number], radius: 0.35 },   // Smaller top left
  
  // Left cluster (moved slightly outward to prevent overlap)
  { position: [-1.6, -0.3, 0.2] as [number, number, number], radius: 0.65 },  // Main left
  { position: [-2.0, 0.4, -0.3] as [number, number, number], radius: 0.4 },   // Small outer left
  { position: [-1.4, 0.2, 0.8] as [number, number, number], radius: 0.45 },   // Small upper left
  
  // Right cluster (moved slightly outward to prevent overlap)
  { position: [1.8, -0.5, -0.2] as [number, number, number], radius: 0.6 },   // Main right
  { position: [2.1, 0.3, 0.4] as [number, number, number], radius: 0.35 },    // Small outer right
  { position: [1.5, 0.1, 0.9] as [number, number, number], radius: 0.4 },     // Small upper right
]

// Adjusted satellite positions to prevent clipping
const SATELLITE_POSITIONS: [number, number, number][] = [
  // Right hemisphere satellites (moved outward)
  [2.4, 0.8, 0.6],
  [2.0, 1.4, -0.3],
  [2.2, -0.9, 0.4],
  [1.7, -1.3, -0.5],
  [2.6, 0.2, -0.3],
  [2.3, 0.5, 0.9],
  [2.1, -0.4, 0.8],
  [2.5, -0.2, 0.5],
  [1.9, 1.1, 0.4],
  [2.2, 0.3, -0.7],
  
  // Left hemisphere satellites (moved outward)
  [-2.3, 0.7, 0.5],
  [-1.9, 1.5, -0.2],
  [-2.4, -0.8, 0.3],
  [-1.8, -1.2, -0.4],
  [-2.5, 0.1, -0.5],
  [-2.1, 0.4, 0.8],
  [-2.2, -0.3, 0.7],
  [-2.0, 0.9, 0.3],
  [-2.4, 0.2, -0.6],
  [-1.7, -1.0, 0.5],
  
  // Top connections (adjusted height)
  [0, 2.0, 0.5],
  [0.6, 1.8, -0.4],
  [-0.5, 1.9, 0.2],
  [0.3, 2.1, 0.3],
  [-0.4, 2.0, -0.3],
  [0.7, 1.7, 0.5],
  
  // Central connections (adjusted positions)
  [1.0, 0.8, 0.7],
  [-0.9, 0.7, 0.6],
  [0.6, -0.6, 0.8],
  [-0.5, -0.7, 0.7],
  [0.7, 0.5, 1.0],
  [-0.8, 0.6, 0.9],
  [0.5, -0.5, 1.1],
  [-0.6, -0.4, 0.8],
  
  // Lower connections (adjusted depth)
  [0.4, -1.7, 0.3],
  [-0.4, -1.8, 0.2],
  [0.7, -1.5, -0.4],
  [0.5, -1.6, 0.5],
  [-0.6, -1.7, -0.3],
  [0.8, -1.4, 0.4],
  
  // Depth connections (z-axis, adjusted positions)
  [0.6, 0.5, 1.4],
  [-0.5, 0.6, 1.3],
  [0.7, -0.4, 1.5],
  [-0.6, -0.5, 1.4],
]

// Add satellite size variations
const SATELLITE_SIZES = [0.08, 0.06, 0.04]

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
    uniform float time;
    uniform float scale;
    
    void main() {
      vNormal = normal;
      vPosition = position;
      
      // Subtle vertex displacement
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
    uniform vec3 color;
    uniform float time;
    
    void main() {
      // Fresnel effect
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnelTerm = 1.0 - max(dot(viewDirection, vNormal), 0.0);
      fresnelTerm = pow(fresnelTerm, 3.0);
      
      // Subtle color variation based on position and time
      vec3 gradientColor = color + vec3(
        sin(vPosition.x * 2.0 + time * 0.5) * 0.1,
        sin(vPosition.y * 2.0 + time * 0.3) * 0.1,
        sin(vPosition.z * 2.0 + time * 0.4) * 0.1
      );
      
      // Combine effects
      vec3 finalColor = mix(gradientColor, vec3(1.0), fresnelTerm * 0.5);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
)

// Extend Three.js with our custom material
extend({ GooeyMaterial })

// Core sphere component
function CoreSphere({ position, radius, colorIndex }: { 
  position: [number, number, number], 
  radius: number,
  colorIndex: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.03
      meshRef.current.scale.set(scale, scale, scale)
      
      // Update shader uniforms
      materialRef.current.time = state.clock.elapsedTime
      materialRef.current.scale = scale
    }
  })

  const color = new THREE.Color(COLORS.spheres[colorIndex])

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 64, 64]} />
      {/* @ts-ignore */}
      <gooeyMaterial 
        ref={materialRef}
        color={color}
        time={0}
        scale={1.0}
      />
    </mesh>
  )
}

function Satellite({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const lineRef = useRef<THREE.Line>(null)
  const currentPosition = useRef(new THREE.Vector3(...position))
  const materialRef = useRef<any>(null)

  // Deterministic size and color based on position
  const satelliteStyle = useMemo(() => ({
    size: SATELLITE_SIZES[Math.abs(Math.round(position[0] * position[1])) % SATELLITE_SIZES.length],
    color: COLORS.satellites[Math.abs(Math.round(position[2] * position[0])) % COLORS.satellites.length]
  }), [position])

  // Find closest core sphere for connection
  const closestCore = useMemo(() => {
    return CORE_SPHERES.reduce((closest, core) => {
      const distance = new THREE.Vector3(...position).distanceTo(new THREE.Vector3(...core.position))
      return distance < closest.distance ? { position: core.position, distance } : closest
    }, { position: CORE_SPHERES[0].position, distance: Infinity })
  }, [position])

  // Generate deterministic motion parameters based on position
  const motionParams = useMemo(() => ({
    xFreq: 0.5 + Math.abs(Math.cos(position[0])) * 0.3,
    yFreq: 0.5 + Math.abs(Math.cos(position[1])) * 0.3,
    zFreq: 0.5 + Math.abs(Math.cos(position[2])) * 0.3,
    xAmp: 0.05 + Math.abs(Math.sin(position[0])) * 0.02,  // Increased amplitude
    yAmp: 0.05 + Math.abs(Math.sin(position[1])) * 0.02,
    zAmp: 0.05 + Math.abs(Math.sin(position[2])) * 0.02,
    phase: Math.atan2(position[1], position[0])
  }), [position])

  const color = new THREE.Color(satelliteStyle.color)

  useFrame((state) => {
    if (meshRef.current && lineRef.current && materialRef.current) {
      const time = state.clock.elapsedTime

      // Update current position with animation
      currentPosition.current.set(
        position[0] + Math.sin(time * motionParams.xFreq + motionParams.phase) * motionParams.xAmp,
        position[1] + Math.sin(time * motionParams.yFreq + motionParams.phase) * motionParams.yAmp,
        position[2] + Math.sin(time * motionParams.zFreq + motionParams.phase) * motionParams.zAmp
      )

      // Update mesh position
      meshRef.current.position.copy(currentPosition.current)

      // Update line vertices
      const positions = new Float32Array([
        closestCore.position[0], closestCore.position[1], closestCore.position[2],
        currentPosition.current.x, currentPosition.current.y, currentPosition.current.z
      ])
      
      lineRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      )

      // Update shader uniforms
      materialRef.current.time = time
      materialRef.current.scale = satelliteStyle.size / SATELLITE_SIZES[0]
    }
  })

  return (
    <>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[satelliteStyle.size, 32, 32]} />
        {/* @ts-ignore */}
        <gooeyMaterial 
          ref={materialRef}
          color={color}
          time={0}
          scale={1.0}
        />
      </mesh>
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([
              closestCore.position[0], closestCore.position[1], closestCore.position[2],
              position[0], position[1], position[2]
            ])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color={COLORS.lines} 
          opacity={0.15 * (satelliteStyle.size / SATELLITE_SIZES[0])} // Adjust line opacity based on satellite size
          transparent 
        />
      </line>
    </>
  )
}

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
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} />
          <OrbitControls enableZoom={false} enablePan={false} />
          
      <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          {/* Render core spheres */}
          {CORE_SPHERES.map((core, index) => (
            <CoreSphere 
              key={`core-${index}`} 
              position={core.position} 
              radius={core.radius}
              colorIndex={index % COLORS.spheres.length}
            />
          ))}
          
          {/* Render satellites */}
          {SATELLITE_POSITIONS.map((pos, index) => (
            <Satellite key={`satellite-${index}`} position={pos} />
          ))}
        </Suspense>
    </Canvas>
    </div>
  )
}

export default Scene