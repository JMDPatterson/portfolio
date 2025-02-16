// src/components/Scene.tsx
import { Canvas } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'

export default function Scene() {
  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      {/* Corrected: Use lowercase for JSX elements */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <meshPhongMaterial color="#F5F0FF" />
      </Sphere>
    </Canvas>
  )
}