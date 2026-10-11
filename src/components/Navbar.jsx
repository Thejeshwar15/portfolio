import React from 'react'
import {
  FileText,
  Github,
  Linkedin,
  Mail,
  Volume2,
  VolumeX,
  Sun,
  Moon
} from 'lucide-react'

/**
 * Navbar:
 * Minimalist glassmorphic navigation fixed permanently atop the 3D background.
 * Includes interactive Light / Dark theme switcher with smooth SVG transitions.
 */
export default function Navbar({
  personal,
  onOpenResume,
  onOpenContact,
  soundActive,
  onToggleSound,
  onScrollToTop,
  theme,
  onToggleTheme
}) {
  const isLight = theme === 'light'

  return (
    <header className="navbar-fixed">
      {/* Brand Badge */}
      <div className="brand-badge" onClick={onScrollToTop} title="Scroll to top">
        <div className="brand-logo-hex">
          <span>BT</span>
        </div>
        <div>
          <h1 className="brand-text-name">{personal.name}</h1>
          <p className="brand-text-role">CSE (CyberSecurity)</p>
        </div>
      </div>

      {/* Section Jump Links */}
      <nav className="nav-center-links" aria-label="Page Sections">
        <a href="#about" className="nav-link">About</a>
        <a href="#project" className="nav-link">Project</a>
        <a href="#education" className="nav-link">Education</a>
        <a href="#skills" className="nav-link">Skills</a>
        <a href="#achievements" className="nav-link">Achievements</a>
      </nav>

      {/* Navigation Actions */}
      <div className="nav-actions">
        {/* Light / Dark Theme Switcher Button */}
        <button
          className="nav-btn theme-toggle-btn"
          onClick={onToggleTheme}
          title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          aria-label="Toggle theme mode"
        >
          <span className={`theme-icon-wrap ${isLight ? 'is-light' : 'is-dark'}`}>
            {isLight ? (
              <Moon size={16} className="theme-svg moon-svg" />
            ) : (
              <Sun size={16} className="theme-svg sun-svg" />
            )}
          </span>
          <span className="theme-text-label">{isLight ? 'Dark' : 'Light'}</span>
        </button>

        {/* Sound Toggle */}
        <button
          className="nav-btn"
          onClick={onToggleSound}
          title={soundActive ? 'Mute ambient sound' : 'Activate ambient sound'}
          aria-label="Toggle ambient audio"
        >
          {soundActive ? <Volume2 size={16} color="var(--neon-cyan)" /> : <VolumeX size={16} />}
        </button>

        {/* Resume Modal Action */}
        <button
          className="nav-btn"
          onClick={onOpenResume}
          title="View verified curriculum vitae"
        >
          <FileText size={16} />
          <span className="label">Resume</span>
        </button>

        {/* GitHub External */}
        <a
          href={personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-btn"
          title="GitHub Profile"
        >
          <Github size={16} />
          <span className="label">GitHub</span>
        </a>

        {/* LinkedIn External */}
        <a
          href={personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-btn"
          title="LinkedIn Profile"
        >
          <Linkedin size={16} />
          <span className="label">LinkedIn</span>
        </a>

        {/* Email Contact CTA */}
        <button
          className="nav-btn primary"
          onClick={onOpenContact}
          title="Send a direct message"
        >
          <Mail size={16} />
          <span className="label">Contact</span>
        </button>
      </div>
    </header>
  )
}
