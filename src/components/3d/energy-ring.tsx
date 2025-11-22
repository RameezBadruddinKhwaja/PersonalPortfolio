"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Torus } from "@react-three/drei"
import type { Mesh } from "three"

function RotatingRing() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return

    // Rotate the ring slowly
    meshRef.current.rotation.x = Math.PI / 3
    meshRef.current.rotation.y += 0.003
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1

    // Subtle floating animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
  })

  return (
    <Torus ref={meshRef} args={[3, 0.3, 16, 100]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#0fa15d"
        emissive="#0fa15d"
        emissiveIntensity={0.2}
        wireframe
        transparent
        opacity={0.6}
      />
    </Torus>
  )
}

export function EnergyRing() {
  return (
    <div className="absolute inset-0 -z-10 opacity-40 dark:opacity-30 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d97e" />
        <RotatingRing />
      </Canvas>
    </div>
  )
}
