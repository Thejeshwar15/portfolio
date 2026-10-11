import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * CameraRig:
 * Controls the 3D camera flight along the Z-axis driven by GSAP ScrollTrigger.
 * Dynamically handles:
 *  - Scroll-driven cinematic flight
 *  - Object-focus transition when a skill is clicked
 *  - Mobile pullback distance adjustments
 *  - Subtle mouse parallax
 */
export default function CameraRig({
  scrollProgress,
  selectedSkill,
  isMobile,
  onUpdateTelemetry
}) {
  const { camera } = useThree()
  
  // Target position and lookAt reference vectors
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 9))
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))

  // Base camera path coordinates corresponding to scroll journey [progress 0 to 1]
  // Z goes from +9.0 down to -26.0
  const startZ = 9.0
  const endZ = -26.0
  const mobileZPullback = isMobile ? 3.2 : 0

  useFrame((state, delta) => {
    const mouseX = state.pointer.x * (isMobile ? 0.2 : 0.6)
    const mouseY = state.pointer.y * (isMobile ? 0.2 : 0.4)

    if (selectedSkill) {
      // FOCUS MODE: Camera moves in front of the selected object
      const [sx, sy, sz] = selectedSkill.position
      const focusDist = isMobile ? 3.8 : 2.7
      
      targetCamPos.current.set(
        sx + mouseX * 0.3,
        sy + mouseY * 0.3,
        sz + focusDist
      )
      targetLookAt.current.set(sx, sy, sz)
    } else {
      // SCROLL FLIGHT MODE: Camera travels along Z-axis
      const currentScrollZ = THREE.MathUtils.lerp(startZ, endZ, scrollProgress.current)
      
      // Calculate gentle S-curve horizontal banking based on depth
      const bankX = Math.sin(scrollProgress.current * Math.PI * 4) * 0.8 + mouseX
      const bankY = Math.cos(scrollProgress.current * Math.PI * 3) * 0.4 + mouseY

      targetCamPos.current.set(
        bankX,
        bankY,
        currentScrollZ + mobileZPullback
      )

      // Look slightly ahead on the Z path
      targetLookAt.current.set(
        bankX * 0.3,
        bankY * 0.3,
        currentScrollZ - 6.0
      )
    }

    // Smoothly damp camera position & lookAt target (60 FPS fluid motion)
    camera.position.lerp(targetCamPos.current, 0.08)
    currentLookAt.current.lerp(targetLookAt.current, 0.08)
    camera.lookAt(currentLookAt.current)

    // Send telemetry to HUD
    if (onUpdateTelemetry) {
      onUpdateTelemetry({
        x: camera.position.x.toFixed(2),
        y: camera.position.y.toFixed(2),
        z: camera.position.z.toFixed(2)
      })
    }
  })

  // Set initial camera configuration
  useEffect(() => {
    camera.fov = isMobile ? 65 : 50
    camera.updateProjectionMatrix()
  }, [camera, isMobile])

  return null
}
