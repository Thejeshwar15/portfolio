import React from 'react'
import { ArrowDown, ExternalLink, Sparkles, Terminal, Layers } from 'lucide-react'

/**
 * ScrollSections:
 * Renders the HTML scroll content layered above the canvas.
 * Uses pointer-events: none on wrappers and pointer-events: auto on interactive cards,
 * enabling full 3D canvas interaction while maintaining rich readable narrative context.
 */
export default function ScrollSections({
  stages,
  skills,
  onSelectSkill,
  onOpenContact
}) {
  return (
    <div className="scroll-canvas-wrapper">
      {stages.map((stage, idx) => {
        const associatedSkill = skills.find(s => s.id === stage.targetShapeId)
        
        // Alternating layout for cinematic rhythm
        let alignment = 'left-aligned'
        if (stage.id === 'hero' || stage.id === 'contact') {
          alignment = 'center-aligned'
        } else if (idx % 2 === 0) {
          alignment = 'right-aligned'
        }

        return (
          <section
            key={stage.id}
            id={`section-${stage.id}`}
            className={`journey-section ${alignment}`}
          >
            <div className="section-card">
              {/* Station Tag */}
              <div className="station-badge">
                <Terminal size={13} />
                <span>{stage.scrollProgressText}</span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="section-title">{stage.title}</h2>
              <h3 className="section-subtitle">{stage.subtitle}</h3>

              {/* Description */}
              <p className="section-description">{stage.description}</p>

              {/* Interactive Actions */}
              {associatedSkill ? (
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    className="action-trigger-btn"
                    onClick={() => onSelectSkill(associatedSkill)}
                  >
                    <Layers size={16} />
                    <span>Inspect 3D Geometry</span>
                  </button>
                  <button
                    className="btn-secondary-action"
                    onClick={() => onSelectSkill(associatedSkill)}
                    style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
                  >
                    <span>View Project Specs</span>
                  </button>
                </div>
              ) : stage.id === 'hero' ? (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                  <a
                    href="#section-react"
                    className="action-trigger-btn"
                    style={{ textDecoration: 'none' }}
                  >
                    <span>Begin Journey</span>
                    <ArrowDown size={16} />
                  </a>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                  <button
                    className="action-trigger-btn"
                    onClick={onOpenContact}
                  >
                    <Sparkles size={16} />
                    <span>Send Direct Transmission</span>
                  </button>
                </div>
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}
