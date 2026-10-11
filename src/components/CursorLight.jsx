import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * CursorLight component:
 * Dynamic PointLight that follows user pointer coordinates across the screen in real-time,
 * dynamically illuminating the specular and emissive contours of the low-poly geometries.
 */
export default function CursorLight({ isMobile = false }) {
  const lightRef = useRef()
  const glowMeshRef = useRef()
  const { camera } = useThree()

  // Reusable vectors to avoid allocations in 60fps render loop
  const targetPos = useRef(new THREE.Vector3())

  useFrame((state, delta) => {
    if (!lightRef.current) return

    // If mobile, keep light smoothly centered or following touch position
    const px = state.pointer.x
    const py = state.pointer.y

    // Calculate light world position based on camera's current Z position and orientation
    // Place the light a few units in front of the camera towards the scene
    const forwardVec = new THREE.Vector3(0, 0, -3.5).applyQuaternion(camera.quaternion)
    const rightVec = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion)
    const upVec = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion)

    const spreadX = isMobile ? 3.0 : 5.0
    const spreadY = isMobile ? 2.5 : 3.5

    targetPos.current.copy(camera.position)
      .add(forwardVec)
      .addScaledVector(rightVec, px * spreadX)
      .addScaledVector(upVec, py * spreadY)

    // Smooth lerp (0.15) for fluid organic motion without lag
    lightRef.current.position.lerp(targetPos.current, 0.18)

    if (glowMeshRef.current) {
      glowMeshRef.current.position.copy(lightRef.current.position)
      // Subtle pulse on the cursor light core
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.15
      glowMeshRef.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <>
      <pointLight
        ref={lightRef}
        color="#00f0ff"
        intensity={isMobile ? 2.2 : 3.5}
        distance={9.0}
        decay={2}
      />
      {/* Subtle glowing cursor point in 3D space */}
      <mesh ref={glowMeshRef}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  )
}
