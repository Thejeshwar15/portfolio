import React, { useMemo } from 'react'
import ShapeItem from './ShapeItem'
import * as THREE from 'three'

/**
 * FloatingCluster:
 * Renders the central constellation of glowing low-poly geometric skills
 * plus ambient floating polyhedral debris for atmospheric universe depth.
 */
export default function FloatingCluster({
  skills,
  selectedSkill,
  onSelectSkill,
  isMobile
}) {
  // Generate subtle background floating shards for rich ambient depth
  const ambientShards = useMemo(() => {
    const shardList = []
    const count = isMobile ? 12 : 24
    for (let i = 0; i < count; i++) {
      shardList.push({
        id: `shard-${i}`,
        position: [
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 14,
          (Math.random() * -35) + 5
        ],
        scale: Math.random() * 0.25 + 0.12,
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0]
      })
    }
    return shardList
  }, [isMobile])

  return (
    <group>
      {/* Central Skill Shapes */}
      {skills.map((skill) => (
        <ShapeItem
          key={skill.id}
          skill={skill}
          isSelected={selectedSkill?.id === skill.id}
          onSelect={onSelectSkill}
          isMobile={isMobile}
        />
      ))}

      {/* Low-poly ambient background shards */}
      {ambientShards.map((shard) => (
        <mesh
          key={shard.id}
          position={shard.position}
          rotation={shard.rotation}
          scale={shard.scale}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#1e293b"
            emissive="#0f172a"
            emissiveIntensity={0.2}
            roughness={0.4}
            metalness={0.8}
            wireframe={true}
          />
        </mesh>
      ))}
    </group>
  )
}
