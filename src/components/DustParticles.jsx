import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * DustParticles component:
 * Renders atmospheric cosmic dust floating in the deep void.
 * Highly optimized BufferGeometry with Points to maintain 60 FPS.
 */
export default function DustParticles({ count = 1200, isMobile = false }) {
  const pointsRef = useRef()
  const actualCount = isMobile ? Math.floor(count * 0.4) : count

  // Generate deterministic particle cloud spanning the scroll journey volume
  const [positions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(actualCount * 3)
    const cols = new Float32Array(actualCount * 3)
    const sca = new Float32Array(actualCount)

    const colorPalette = [
      new THREE.Color('#00f0ff'), // cyan
      new THREE.Color('#b026ff'), // purple
      new THREE.Color('#38bdf8'), // electric blue
      new THREE.Color('#ffffff'), // star white
      new THREE.Color('#64748b')  // muted cosmic dust
    ]

    for (let i = 0; i < actualCount; i++) {
      // Spread across X: [-15, 15], Y: [-10, 10], Z: [12, -32] (covering the entire flight path)
      pos[i * 3 + 0] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() * -45) + 12

      // Subtle varied sizes
      sca[i] = Math.random() * 2.0 + 0.5

      // Assign palette colors
      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      cols[i * 3 + 0] = chosenColor.r
      cols[i * 3 + 1] = chosenColor.g
      cols[i * 3 + 2] = chosenColor.b
    }

    return [pos, cols, sca]
  }, [actualCount])

  // Subtle drift animation per frame
  useFrame((state, delta) => {
    if (!pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position
    const array = posAttr.array

    for (let i = 0; i < actualCount; i++) {
      // Gentle oscillation and drift
      array[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.003
      array[i * 3 + 0] += Math.cos(state.clock.elapsedTime * 0.3 + i) * 0.002
    }
    posAttr.needsUpdate = true

    // Very gentle global rotation of the particle field
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.012
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
        size={isMobile ? 0.08 : 0.07}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
