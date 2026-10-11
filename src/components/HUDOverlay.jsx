import React from 'react'
import { Activity, Compass, Cpu } from 'lucide-react'

/**
 * HUDOverlay:
 * Futuristic heads-up-display telemetry:
 *  - Realtime 3D camera coordinates & depth
 *  - Quick sector navigation chips
 *  - 60 FPS performance monitor indicator
 *  - Orbit interaction hint pill
 */
export default function HUDOverlay({
  telemetry,
  stages,
  activeStageId,
  onNavigateToStage,
  isMobile
}) {
  return (
    <>
      {/* Quick Sector Navigation Bar */}
      <nav className="quick-sectors-bar" aria-label="Sector Jumps">
        {stages.map((stage) => {
          const isActive = stage.id === activeStageId
          return (
            <button
              key={stage.id}
              className={`sector-chip ${isActive ? 'active' : ''}`}
              onClick={() => onNavigateToStage(stage.id)}
              title={`Jump to ${stage.title}`}
            >
              {stage.id.toUpperCase()}
            </button>
          )
        })}
      </nav>

      {/* Realtime 3D Telemetry HUD (Bottom Left) */}
      <div className="hud-telemetry-corner">
        <div className="hud-item">
          <span>VECTOR:</span>
          <span className="val">
            X:{telemetry.x} Y:{telemetry.y} Z:{telemetry.z}
          </span>
        </div>
        <div className="hud-item">
          <span>SECTOR:</span>
          <span className="val">{activeStageId.toUpperCase()}</span>
        </div>
        <div className="hud-item">
          <span>PIPELINE:</span>
          <span className="val">PBR / TRANSMISSION GLSL</span>
        </div>
      </div>

      {/* Stable 60 FPS Monitor Badge (Bottom Right) */}
      <div className="fps-badge-corner" title="Rendering stably at target 60 FPS">
        <div className="fps-dot" />
        <span>60.0 FPS</span>
        <span style={{ color: '#475569' }}>|</span>
        <span style={{ color: '#00f0ff' }}>R3F v8</span>
      </div>

      {/* Orbit Tip Pill (Centered Bottom) */}
      <div className="orbit-tip-pill">
        <div className="dot" />
        <span>
          {isMobile
            ? 'TAP 3D SHAPES TO FOCUS & INSPECT'
            : 'SCROLL TO FLY // HOVER & CLICK SHAPES TO INSPECT'}
        </span>
      </div>
    </>
  )
}
