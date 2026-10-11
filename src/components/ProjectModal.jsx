import React, { useEffect } from 'react'
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react'

/**
 * ProjectModal:
 * Rich glassmorphism modal presenting deep project architecture,
 * performance benchmarks, and live links when a 3D shape is clicked.
 */
export default function ProjectModal({ skill, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!skill || !skill.project) return null

  const { project } = skill

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal-card">
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close project modal"
          title="Return camera to orbital path"
        >
          <X size={18} />
        </button>

        {/* Header Badge */}
        <div
          className="modal-header-badge"
          style={{
            background: `${skill.color}15`,
            border: `1px solid ${skill.color}40`,
            color: skill.color
          }}
        >
          <Layers size={14} />
          <span>{skill.category} // {skill.shape.toUpperCase()}</span>
        </div>

        {/* Project Title & Tagline */}
        <h2 className="modal-title">{project.title}</h2>
        <p className="modal-tagline">{project.tagline}</p>

        {/* Performance & Metrics Grid */}
        <div className="metrics-grid">
          {project.metrics.map((metric, i) => (
            <div key={i} className="metric-box">
              <div className="label">{metric.label}</div>
              <div
                className="val"
                style={{ color: skill.color }}
              >
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Deep Overview */}
        <p style={{
          fontSize: '0.92rem',
          lineHeight: 1.65,
          color: '#cbd5e1',
          marginBottom: '1.25rem'
        }}>
          {project.overview}
        </p>

        {/* Architectural Features */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.78rem',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.65rem'
          }}>
            Technical Architecture & Engineering Highlights
          </h4>
          <ul className="features-list">
            {project.features.map((feature, idx) => (
              <li key={idx}>
                <span className="bullet" style={{ color: skill.color }}>▹</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Tags */}
        <div className="tag-cloud">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="tag-pill">
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-action"
              style={{ background: skill.color }}
            >
              <span>Launch Demo</span>
              <ExternalLink size={15} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-action"
            >
              <Github size={16} />
              <span>Inspect Source</span>
            </a>
          )}
          <button
            className="btn-secondary-action"
            onClick={onClose}
            style={{ marginLeft: 'auto' }}
          >
            <span>Resume Flight</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
