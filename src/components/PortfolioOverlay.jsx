import React, { useState } from 'react'
import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Code2,
  Trophy,
  Terminal,
  Layers,
  CheckCircle2,
  Copy,
  Check,
  Send,
  FileText,
  ArrowRight,
  Shield,
  Sparkles,
  Award
} from 'lucide-react'
import StickyProfileCard from './StickyProfileCard'
import ContactRevealButton from './ContactRevealButton'

/**
 * PortfolioOverlay:
 * Clean split-screen layout with a sticky profile card on the left
 * and smooth scrolling resume sections on the right.
 */
export default function PortfolioOverlay({
  portfolioData,
  onOpenResume,
  onOpenContact
}) {
  const { personal, education, skills, project, achievements } = portfolioData

  return (
    <main className="portfolio-content-overlay">
      <div className="container-split">
        
        {/* ================= LEFT COLUMN: STICKY PROFILE CARD ================= */}
        <StickyProfileCard
          personal={personal}
          onOpenResume={onOpenResume}
          onOpenContact={onOpenContact}
        />

        {/* ================= RIGHT COLUMN: SCROLLING CONTENT ================= */}
        <div className="scrolling-content-column">
          
          {/* ----- ABOUT / HERO SECTION ----- */}
          <section id="about" className="content-card hero-intro-card">
            <div className="section-badge">
              <Sparkles size={13} />
              <span>OVERVIEW & OBJECTIVE</span>
            </div>

            <h1 className="hero-heading">{personal.name}</h1>
            <p className="hero-subheading">
              {personal.role} • <span className="highlight-text">{personal.subtitle}</span>
            </p>

            <div className="career-objective-box">
              <h4 className="objective-label">Career Objective</h4>
              <p className="objective-text">
                "{personal.careerObjective}"
              </p>
            </div>

            {/* Quick Contact Reveal Buttons in Hero */}
            <div className="hero-reveal-pills-row">
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

            <div className="hero-cta-actions">
              <a href="#project" className="btn-primary-action">
                <span>View Radix Project</span>
                <ArrowRight size={15} />
              </a>

              <button onClick={onOpenResume} className="btn-secondary-action">
                <FileText size={15} />
                <span>View Verified CV</span>
              </button>
            </div>
          </section>

          {/* ----- FEATURED PROJECT: RADIX TALENT MATCH ----- */}
          <section id="project" className="section-block">
            <div className="section-header">
              <div className="section-badge badge-purple">
                <Terminal size={13} />
                <span>FEATURED PROJECT // AUG 2026</span>
              </div>
              <h2 className="section-heading">Radix Talent Match</h2>
              <p className="section-subheading">
                {project.roleType}
              </p>
            </div>

            <div className="content-card project-spotlight-card">
              <div className="project-top-row">
                <div>
                  <span className="project-meta-pill">AI RESUME EVALUATION</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-tagline">{project.tagline}</p>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-action project-repo-btn"
                >
                  <Github size={16} />
                  <span>github.com/irumos/Radix</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <p className="project-overview-text">
                {project.overview}
              </p>

              {/* 3-Step Architecture Pipeline */}
              <div className="project-workflow-grid">
                <div className="workflow-step">
                  <span className="step-num">01</span>
                  <strong>Document Ingestion</strong>
                  <p>PyMuPDF & python-docx for PDF & DOCX text parsing</p>
                </div>
                <div className="workflow-step">
                  <span className="step-num">02</span>
                  <strong>Semantic AI Analysis</strong>
                  <p>GPT & LangChain parsing candidate skills vs job descriptions</p>
                </div>
                <div className="workflow-step">
                  <span className="step-num">03</span>
                  <strong>FastAPI Backend</strong>
                  <p>Asynchronous REST endpoints orchestrating parsing workflow</p>
                </div>
              </div>

              {/* Exact Resume Bullet Points */}
              <div className="project-bullets-container">
                <h4 className="bullets-heading">Key Engineering Contributions:</h4>
                <ul className="project-bullet-list">
                  {project.bulletPoints.map((bullet, idx) => (
                    <li key={idx}>
                      <span className="bullet-point">▹</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Tags */}
              <div className="project-tech-stack">
                <span className="tech-label">Tech Stack:</span>
                <div className="tag-cloud">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="tech-chip">#{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ----- EDUCATION ----- */}
          <section id="education" className="section-block">
            <div className="section-header">
              <div className="section-badge">
                <GraduationCap size={13} />
                <span>ACADEMIC BACKGROUND</span>
              </div>
              <h2 className="section-heading">Education History</h2>
            </div>

            <div className="education-timeline">
              {education.map((edu, idx) => (
                <div key={idx} className="content-card education-card">
                  <div className="edu-header">
                    <div>
                      <span className="edu-type-pill">{edu.type}</span>
                      <h3 className="edu-institution">{edu.institution}</h3>
                      <p className="edu-degree">{edu.degree}</p>
                    </div>
                    <div className="edu-meta">
                      <span className="edu-duration">{edu.duration}</span>
                      <span className="edu-score" style={{ color: edu.badgeColor }}>
                        {edu.score}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ----- TECHNICAL & SOFT SKILLS ----- */}
          <section id="skills" className="section-block">
            <div className="section-header">
              <div className="section-badge">
                <Code2 size={13} />
                <span>TECHNICAL FOUNDATIONS</span>
              </div>
              <h2 className="section-heading">Skills & Tooling</h2>
            </div>

            <div className="skills-grid">
              {/* Programming Languages */}
              <div className="content-card skill-category-card">
                <h3 className="category-title" style={{ color: 'var(--neon-cyan)' }}>
                  Languages
                </h3>
                <div className="skill-pills-wrap">
                  {skills.languages.map((item, i) => (
                    <span key={i} className="skill-item-pill highlight-cyan">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Database & Data */}
              <div className="content-card skill-category-card">
                <h3 className="category-title" style={{ color: 'var(--neon-purple)' }}>
                  Database & Data
                </h3>
                <div className="skill-pills-wrap">
                  {skills.data.map((item, i) => (
                    <span key={i} className="skill-item-pill highlight-purple">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Web Basics */}
              <div className="content-card skill-category-card">
                <h3 className="category-title" style={{ color: 'var(--neon-blue)' }}>
                  Web Basics
                </h3>
                <div className="skill-pills-wrap">
                  {skills.web.map((item, i) => (
                    <span key={i} className="skill-item-pill highlight-blue">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="content-card skill-category-card">
                <h3 className="category-title" style={{ color: 'var(--neon-green)' }}>
                  Developer Tools
                </h3>
                <div className="skill-pills-wrap">
                  {skills.tools.map((item, i) => (
                    <span key={i} className="skill-item-pill highlight-green">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="content-card skill-category-card full-width">
                <h3 className="category-title" style={{ color: 'var(--neon-amber)' }}>
                  Soft Skills & Team Collaboration
                </h3>
                <div className="skill-pills-wrap">
                  {skills.softSkills.map((item, i) => (
                    <span key={i} className="skill-item-pill highlight-amber">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ----- ACHIEVEMENTS & ATHLETICS ----- */}
          <section id="achievements" className="section-block">
            <div className="section-header">
              <div className="section-badge badge-amber">
                <Trophy size={13} />
                <span>ATHLETICS & LEADERSHIP</span>
              </div>
              <h2 className="section-heading">Achievements & Activities</h2>
            </div>

            <div className="achievements-list">
              {achievements.map((ach, idx) => (
                <div key={idx} className="content-card achievement-card">
                  <div className="achievement-icon-circle">
                    <span>🏀</span>
                  </div>
                  <div className="achievement-content">
                    <h4 className="achievement-title">{ach.title}</h4>
                    <p className="achievement-meta">
                      <span className="ach-badge">{ach.type}</span>
                      <span>{ach.year}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ----- DIRECT CONTACT CTA ----- */}
          <section id="contact" className="section-block">
            <div className="content-card contact-cta-card">
              <div className="section-badge">
                <Mail size={13} />
                <span>DIRECT TRANSMISSION</span>
              </div>
              <h2 className="contact-cta-heading">Let's Connect & Collaborate</h2>
              <p className="contact-cta-desc">
                Currently open for software engineering and AI applications development opportunities.
              </p>

              {/* Contact Reveal Buttons in Contact Section */}
              <div className="contact-section-reveal-wrap">
                <ContactRevealButton
                  type="email"
                  value={personal.email}
                  label="Reveal Email Address"
                />
                <ContactRevealButton
                  type="phone"
                  value={personal.phone}
                  label="Reveal Phone Number"
                />
              </div>

              <div className="contact-cta-row">
                <button onClick={onOpenContact} className="btn-primary-action">
                  <Mail size={16} />
                  <span>Send Message Form</span>
                </button>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-action"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </section>

          {/* ----- DECLARATION & FOOTER ----- */}
          <footer className="portfolio-footer">
            <div className="declaration-box">
              <p>"{personal.declaration}"</p>
            </div>
            <div className="footer-bottom-row">
              <p>© {new Date().getFullYear()} {personal.name}. All rights reserved.</p>
              <div className="footer-links">
                <a href={personal.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={`mailto:${personal.email}`}>Email</a>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </main>
  )
}
