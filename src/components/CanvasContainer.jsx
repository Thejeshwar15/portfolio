import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import CameraRig from './CameraRig'
import FloatingCluster from './FloatingCluster'
import CursorLight from './CursorLight'
import DustParticles from './DustParticles'

/**
 * CanvasContainer:
 * Houses the WebGL rendering context, lighting setup, dust particle fields,
 * and 3D skill cluster with responsive DPR management for 60 FPS performance.
 */
export default function CanvasContainer({
  skills,
  selectedSkill,
  onSelectSkill,
  scrollProgress,
  isMobile,
  onUpdateTelemetry
}) {
  return (
    <div id="canvas-container">
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1
        }}
        camera={{
          position: [0, 0, 9],
          fov: isMobile ? 65 : 50,
          near: 0.1,
          far: 60
        }}
        onCreated={({ gl, scene }) => {
          // Deep atmospheric void background
          scene.background = new THREE.Color('#030712')
          scene.fog = new THREE.FogExp2('#030712', 0.035)
        }}
      >
        <Suspense fallback={null}>
          {/* Base Ambient Illumination */}
          <ambientLight intensity={0.5} />

          {/* Key Light for specular highlights */}
          <directionalLight
            position={[8, 12, 6]}
            intensity={1.2}
            color="#ffffff"
          />

          {/* Cool Cyan Rim Light from opposite flank */}
          <directionalLight
            position={[-8, -6, -4]}
            intensity={0.8}
            color="#00f0ff"
          />

          {/* Warm/Purple Accent Rim Light */}
          <directionalLight
            position={[4, -10, 8]}
            intensity={0.6}
            color="#b026ff"
          />

          {/* Interactive Cursor-Tracked PointLight */}
          <CursorLight isMobile={isMobile} />

          {/* Deep Space Cosmic Dust Particles */}
          <DustParticles count={isMobile ? 500 : 1200} isMobile={isMobile} />

          {/* Core Low-Poly Glowing Shapes Constellation */}
          <FloatingCluster
            skills={skills}
            selectedSkill={selectedSkill}
            onSelectSkill={onSelectSkill}
            isMobile={isMobile}
          />

          {/* Scroll-Driven Camera Controller */}
          <CameraRig
            scrollProgress={scrollProgress}
            selectedSkill={selectedSkill}
            isMobile={isMobile}
            onUpdateTelemetry={onUpdateTelemetry}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
