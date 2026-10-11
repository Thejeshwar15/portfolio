import React, { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

/**
 * ShapeItem: Individual low-poly 3D geometric shape with PBR glass transmission,
 * neon emission, hover scaling 1.1x, rotation acceleration, and click selection.
 */
export default function ShapeItem({
  skill,
  isSelected,
  onSelect,
  isMobile
}) {
  const meshRef = useRef()
  const wireRef = useRef()
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Random phase offset so shapes don't bob in mechanical unison
  const phaseOffset = useMemo(() => Math.random() * Math.PI * 2, [])

  // Geometry selector for low-poly primitives
  const geometry = useMemo(() => {
    switch (skill.shape) {
      case 'cube':
        return new THREE.BoxGeometry(1.5, 1.5, 1.5)
      case 'sphere':
        // Low-poly faceted sphere for futuristic look
        return new THREE.IcosahedronGeometry(1.15, 2)
      case 'torus':
        return new THREE.TorusGeometry(0.95, 0.38, 12, 28)
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(1.2, 0)
      case 'octahedron':
        return new THREE.OctahedronGeometry(1.25, 0)
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(1.15, 0)
      default:
        return new THREE.BoxGeometry(1.4, 1.4, 1.4)
    }
  }, [skill.shape])

  // Wireframe edges geometry for technical holographic accent
  const wireGeometry = useMemo(() => {
    return new THREE.WireframeGeometry(geometry)
  }, [geometry])

  // Frame update: idle floating, rotation speed acceleration on hover, scale lerp
  useFrame((state, delta) => {
    if (!groupRef.current || !meshRef.current) return

    const time = state.clock.elapsedTime

    // 1. Idle vertical floating bob
    const floatY = Math.sin(time * 1.4 + phaseOffset) * 0.12
    groupRef.current.position.y = skill.position[1] + floatY

    // 2. Rotation speed: accelerates on hover
    const speedMult = hovered ? 2.6 : 1.0
    const rx = (skill.rotationSpeed[0] || 0.4) * speedMult * delta
    const ry = (skill.rotationSpeed[1] || 0.5) * speedMult * delta
    const rz = (skill.rotationSpeed[2] || 0.3) * speedMult * delta

    meshRef.current.rotation.x += rx
    meshRef.current.rotation.y += ry
    meshRef.current.rotation.z += rz

    if (wireRef.current) {
      wireRef.current.rotation.copy(meshRef.current.rotation)
    }

    // 3. Smooth Scale Lerp: 1.1x when hovered (1.15x for dramatic feel), with base scale
    const targetScale = (hovered ? 1.15 : (isSelected ? 1.1 : 1.0)) * (skill.scale || 1.0)
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.15
    )

    // 4. Smooth Emissive glow brightening
    if (meshRef.current.material) {
      const targetEmissive = hovered ? 1.85 : (isSelected ? 1.4 : 0.45)
      meshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        meshRef.current.material.emissiveIntensity,
        targetEmissive,
        0.15
      )
    }
  })

  return (
    <group
      ref={groupRef}
      position={[skill.position[0], skill.position[1], skill.position[2]]}
    >
      {/* Main PBR Glass & Emission Mesh */}
      <mesh
        ref={meshRef}
        geometry={geometry}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(skill)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
      >
        <meshPhysicalMaterial
          color={skill.color}
          emissive={skill.emissiveColor}
          emissiveIntensity={0.45}
          roughness={0.18}
          metalness={0.12}
          transmission={0.55} // Glass-like transmission
          ior={1.4}
          thickness={1.1}
          flatShading={skill.shape !== 'sphere'}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Holographic glowing wireframe lattice outline */}
      <lineSegments ref={wireRef} geometry={wireGeometry}>
        <lineBasicMaterial
          color={hovered ? '#ffffff' : skill.color}
          transparent
          opacity={hovered ? 0.75 : 0.28}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Floating 3D label badge hovering just above the shape */}
      <Html
        position={[0, 1.5, 0]}
        center
        distanceFactor={isMobile ? 12 : 9}
        style={{
          transition: 'all 0.3s ease',
          opacity: hovered || isSelected ? 1 : 0.75,
          transform: hovered ? 'scale(1.08)' : 'scale(1.0)',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        <div style={{
          background: 'rgba(8, 14, 28, 0.85)',
          border: `1px solid ${hovered ? skill.color : 'rgba(255, 255, 255, 0.12)'}`,
          boxShadow: hovered ? `0 0 15px ${skill.color}` : '0 4px 12px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          borderRadius: '8px',
          padding: '4px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          whiteSpace: 'nowrap'
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: skill.color,
            boxShadow: `0 0 6px ${skill.color}`
          }} />
          <span style={{
            color: '#f8fafc',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.02em'
          }}>
            {skill.name}
          </span>
        </div>
      </Html>
    </group>
  )
}
