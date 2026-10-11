import React, { useState, useRef } from 'react'
import {
  MapPin,
  GraduationCap,
  FileText,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  Sparkles
} from 'lucide-react'
import ContactRevealButton from './ContactRevealButton'

/**
 * StickyProfileCard:
 * Sticky split-screen profile card featuring Bupathi's photo,
 * interactive 3D tilt micro-interaction, cybernetic contact reveal buttons,
 * and quick social links.
 */
export default function StickyProfileCard({
  personal,
  onOpenResume,
  onOpenContact
}) {
  const cardRef = useRef(null)
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    transition: 'transform 0.4s ease'
  })

  // 3D Card tilt micro-interaction on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Moderate tilt angles for sophisticated, non-jarring aesthetic
    const rotateX = ((centerY - y) / centerY) * 7
    const rotateY = ((x - centerX) / centerX) * 7

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`,
      transition: 'transform 0.1s ease-out'
    })
  }

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      transition: 'transform 0.5s ease-out'
    })
  }

  return (
    <aside className="sticky-profile-container">
      <div
        ref={cardRef}
        className="glass-card sticky-profile-card"
        style={tiltStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Profile Image with futuristic glass frame & ambient glow */}
        <div className="profile-image-frame">
          <img
            src="/profile.jpg"
            alt={personal.name}
            className="profile-photo"
            loading="eager"
          />
          <div className="photo-neon-rim" />
          
          {/* Status pill on photo */}
          <div className="photo-status-badge">
            <span className="pulsing-green-dot" />
            <span>AVAILABLE FOR ROLES</span>
          </div>
        </div>

        {/* Identity Details */}
        <div className="profile-info-block">
          <h2 className="profile-name">{personal.name}</h2>
          <p className="profile-title">{personal.role}</p>

          <div className="profile-meta-pills">
            <div className="meta-pill" title="College & GPA">
              <GraduationCap size={14} color="#00f0ff" />
              <span>SVCE • <strong>CGPA {personal.cgpa}</strong></span>
            </div>
            <div className="meta-pill" title="Location">
              <MapPin size={14} color="#38bdf8" />
              <span>{personal.location}</span>
            </div>
          </div>

          <div className="profile-divider" />

          {/* Interactive Contact Reveal Buttons */}
          <div className="profile-reveal-section">
            <p className="reveal-section-title">
              <ShieldCheck size={13} color="#00f0ff" />
              <span>Protected Contact Details</span>
            </p>
            <div className="reveal-buttons-stack">
              <ContactRevealButton
                type="email"
                value={personal.email}
                label="Reveal Email"
              />
              <ContactRevealButton
                type="phone"
                value={personal.phone}
                label="Reveal Phone"
              />
            </div>
          </div>

          <div className="profile-divider" />

          {/* Quick Action Navigation Buttons */}
          <div className="profile-quick-actions">
            <button
              onClick={onOpenResume}
              className="btn-primary-action full-width"
              title="View & Download verified CV"
            >
              <FileText size={15} />
              <span>View Resume</span>
            </button>

            <div className="profile-social-row">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon-action"
                title="GitHub Profile"
              >
                <Github size={17} />
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon-action"
                title="LinkedIn Profile"
              >
                <Linkedin size={17} />
              </a>

              <button
                onClick={onOpenContact}
                className="btn-secondary-action flex-grow"
                title="Send direct email"
              >
                <Mail size={15} />
                <span>Contact</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
