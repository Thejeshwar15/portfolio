import React, { useState, useEffect, useCallback } from 'react'
import { portfolioData } from './data/portfolioData'
import MinimalBackgroundCanvas from './components/MinimalBackgroundCanvas'
import Navbar from './components/Navbar'
import PortfolioOverlay from './components/PortfolioOverlay'
import ContactModal from './components/ContactModal'
import ResumeModal from './components/ResumeModal'
import { audioManager } from './utils/audio'

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'dark'
    }
    return 'dark'
  })

  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [soundActive, setSoundActive] = useState(false)

  // Sync data-theme attribute on document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  // Toggle theme mode
  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  // Toggle ambient synth sound
  const handleToggleSound = useCallback(() => {
    const newState = audioManager.toggle()
    setSoundActive(newState)
  }, [])

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className={`portfolio-app theme-${theme}`}>
      {/* Dynamic 3D ambient background (Adapts lighting, particles & mesh colors to theme) */}
      <MinimalBackgroundCanvas theme={theme} />

      {/* Subtle vignette layer */}
      <div className="ambient-vignette" />

      {/* Fixed 2D Glassmorphic Navbar with Theme Switcher */}
      <Navbar
        personal={portfolioData.personal}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        soundActive={soundActive}
        onToggleSound={handleToggleSound}
        onScrollToTop={handleScrollToTop}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Split-Screen Resume Portfolio Overlay */}
      <PortfolioOverlay
        portfolioData={portfolioData}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Contact Modal */}
      {isContactOpen && (
        <ContactModal
          personal={portfolioData.personal}
          onClose={() => setIsContactOpen(false)}
        />
      )}

      {/* Verified Resume Modal */}
      {isResumeOpen && (
        <ResumeModal
          personal={portfolioData.personal}
          onClose={() => setIsResumeOpen(false)}
        />
      )}
    </div>
  )
}
