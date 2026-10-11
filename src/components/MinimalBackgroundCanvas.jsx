import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * AmbientParticles:
 * Minimal, delicate floating dust/star particles that drift slowly,
 * dynamically colored to contrast seamlessly in both dark and light modes.
 */
function AmbientParticles({ count = 650, isLight = false }) {
  const pointsRef = useRef()

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const cols = new Float32Array(count * 3)

    // Dynamic palette depending on theme
    const darkPalette = [
      new THREE.Color('#00f0ff'),
      new THREE.Color('#b026ff'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#475569')
    ]
    const lightPalette = [
      new THREE.Color('#0284c7'), // vibrant electric sky
      new THREE.Color('#7c3aed'), // deep electric violet
      new THREE.Color('#2563eb'), // royal blue
      new THREE.Color('#64748b')  // slate dust
    ]

    const palette = isLight ? lightPalette : darkPalette

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 36
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 26

      const c = palette[Math.floor(Math.random() * palette.length)]
      cols[i * 3 + 0] = c.r
      cols[i * 3 + 1] = c.g
      cols[i * 3 + 2] = c.b
    }
    return [pos, cols]
  }, [count, isLight])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    pointsRef.current.rotation.y = t * 0.015
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.04
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isLight ? 0.08 : 0.065}
        vertexColors
        transparent
        opacity={isLight ? 0.7 : 0.55}
        blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/**
 * MinimalGeometricCore:
 * Elegant rotating wireframe structure with dynamic theme responsiveness.
 */
function MinimalGeometricCore({ isLight = false }) {
  const groupRef = useRef()
  const innerRef = useRef()
  const ringRef = useRef()

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    // Smooth subtle mouse parallax
    const targetRotX = state.pointer.y * 0.18
    const targetRotY = state.pointer.x * 0.25

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05)

    // Slow ambient rotation
    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.12
      innerRef.current.rotation.x += delta * 0.08
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.14
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.35
    }
  })

  const ringColor1 = isLight ? '#0284c7' : '#00f0ff'
  const ringColor2 = isLight ? '#7c3aed' : '#b026ff'
  const icosaColor = isLight ? '#2563eb' : '#00f0ff'
  const octaColor = isLight ? '#7c3aed' : '#b026ff'

  return (
    <group ref={groupRef} position={[3.8, 0.5, -4]}>
      {/* Outer subtle orbital ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.2, 0.02, 16, 64]} />
        <meshBasicMaterial
          color={ringColor1}
          transparent
          opacity={isLight ? 0.45 : 0.25}
          wireframe
        />
      </mesh>

      {/* Second soft ring */}
      <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.6, 0.015, 16, 64]} />
        <meshBasicMaterial
          color={ringColor2}
          transparent
          opacity={isLight ? 0.4 : 0.2}
          wireframe
        />
      </mesh>

      {/* Central rotating low-poly crystalline wireframe */}
      <group ref={innerRef}>
        <mesh>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial
            color={icosaColor}
            wireframe
            transparent
            opacity={isLight ? 0.4 : 0.25}
          />
        </mesh>
        <mesh scale={0.75}>
          <octahedronGeometry args={[1.5, 0]} />
          <meshBasicMaterial
            color={octaColor}
            wireframe
            transparent
            opacity={isLight ? 0.45 : 0.3}
          />
        </mesh>
      </group>
    </group>
  )
}

/**
 * MinimalBackgroundCanvas:
 * 3D background with dynamic Light/Dark theme switching integration.
 */
export default function MinimalBackgroundCanvas({ theme = 'dark' }) {
  const isLight = theme === 'light'
  const bgColor = isLight ? '#f8fafc' : '#030712'

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={[bgColor]} />
        
        {/* Responsive Lights for Dark/Light mode */}
        <ambientLight intensity={isLight ? 1.1 : 0.6} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={isLight ? 1.3 : 0.8}
          color={isLight ? '#0284c7' : '#00f0ff'}
        />
        <directionalLight
          position={[-5, -5, -2]}
          intensity={isLight ? 0.9 : 0.5}
          color={isLight ? '#7c3aed' : '#b026ff'}
        />

        {/* Minimal 3D floating background elements */}
        <MinimalGeometricCore isLight={isLight} />
        <AmbientParticles count={700} isLight={isLight} />
      </Canvas>
    </div>
  )
}
