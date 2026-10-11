import React, { useState } from 'react'
import { X, Send, Copy, Check, Mail, MapPin, Phone } from 'lucide-react'

/**
 * ContactModal:
 * Clean, glassmorphic contact form and direct contact interface for Bupathi Thejeshwar.
 */
export default function ContactModal({ personal, onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const handleCopyPhone = () => {
    if (personal.phone) {
      navigator.clipboard.writeText(personal.phone)
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2000)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      window.location.href = `mailto:${personal.email}?subject=Software Opportunity for Bupathi Thejeshwar from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`
    }, 1200)
  }

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal-card" style={{ maxWidth: '560px' }}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close contact modal"
        >
          <X size={18} />
        </button>

        <div className="modal-header-badge" style={{ background: 'rgba(0, 240, 255, 0.1)', color: '#00f0ff' }}>
          <Mail size={14} />
          <span>DIRECT TRANSMISSION</span>
        </div>

        <h2 className="modal-title">Get in Touch</h2>
        <p className="modal-tagline">
          Interested in software development, AI-powered applications, and CyberSecurity engineering roles.
        </p>

        {/* Contact Info Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.4rem' }}>
          {/* Email */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Mail size={16} color="#00f0ff" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem' }}>
                {personal.email}
              </span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="btn-secondary-action"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
            >
              {copiedEmail ? <Check size={14} color="#00ff9d" /> : <Copy size={14} />}
              <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Phone */}
          {personal.phone && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="#00ff9d" />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem' }}>
                  {personal.phone}
                </span>
              </div>
              <button
                onClick={handleCopyPhone}
                className="btn-secondary-action"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
              >
                {copiedPhone ? <Check size={14} color="#00ff9d" /> : <Copy size={14} />}
                <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          )}

          {/* Location */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.6rem 1rem',
            borderRadius: '10px',
            background: 'rgba(15, 23, 42, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            color: '#94a3b8',
            fontSize: '0.82rem'
          }}>
            <MapPin size={15} color="#38bdf8" />
            <span>{personal.location}</span>
          </div>
        </div>

        {submitted ? (
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            background: 'rgba(0, 255, 157, 0.08)',
            border: '1px solid #00ff9d',
            borderRadius: '12px'
          }}>
            <h4 style={{ color: '#00ff9d', marginBottom: '0.5rem', fontFamily: "'Space Grotesk', sans-serif" }}>
              Transmission Prepared!
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>
              Opening your default mail client with prefilled parameters...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="contact-form-group">
              <label className="contact-label">Your Name</label>
              <input
                type="text"
                required
                className="contact-input"
                placeholder="Engineering Recruiter / Team Lead"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="contact-form-group">
              <label className="contact-label">Your Email</label>
              <input
                type="email"
                required
                className="contact-input"
                placeholder="recruiter@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="contact-form-group">
              <label className="contact-label">Role Details or Message</label>
              <textarea
                required
                rows={4}
                className="contact-textarea"
                placeholder="Hello Bupathi! We came across your portfolio and the Radix talent match project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button
                type="submit"
                className="btn-primary-action"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Send size={16} />
                <span>Send Message to Bupathi</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
