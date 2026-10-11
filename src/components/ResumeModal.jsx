import React from 'react'
import {
  X,
  Download,
  FileText,
  GraduationCap,
  Briefcase,
  Award,
  CheckCircle,
  Trophy,
  Code,
  Terminal,
  ExternalLink
} from 'lucide-react'

/**
 * ResumeModal:
 * Clean, structured interactive CV preview displaying Bupathi Thejeshwar's
 * exact education, Radix project, skills, sports achievements, and contact details.
 */
export default function ResumeModal({ personal, onClose }) {
  const handlePrintOrDownload = () => {
    window.print()
  }

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal-card" style={{ maxWidth: '680px' }}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close resume modal"
        >
          <X size={18} />
        </button>

        <div className="modal-header-badge" style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }}>
          <FileText size={14} />
          <span>CURRICULUM VITAE // VERIFIED RESUME</span>
        </div>

        {/* Header Profile Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' }}>
          <div>
            <h2 className="modal-title" style={{ fontSize: '1.65rem' }}>{personal.name}</h2>
            <p style={{ color: '#00f0ff', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.84rem' }}>
              {personal.role}
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.2rem' }}>
              {personal.location} • {personal.phone} • {personal.email}
            </p>
          </div>
          <button
            onClick={handlePrintOrDownload}
            className="btn-primary-action"
            style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}
          >
            <Download size={15} />
            <span>Export / Print PDF</span>
          </button>
        </div>

        {/* Career Objective */}
        <div style={{
          padding: '0.85rem 1rem',
          borderRadius: '10px',
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          marginBottom: '1.4rem'
        }}>
          <h4 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            color: '#00f0ff',
            textTransform: 'uppercase',
            marginBottom: '0.35rem'
          }}>
            Career Objective
          </h4>
          <p style={{ color: '#cbd5e1', fontSize: '0.84rem', lineHeight: 1.55 }}>
            B. Tech Computer Science Engineering student with strong foundations in Python, SQL, and C, interested in software development and AI-powered applications. Seeking opportunities to apply programming and problem-solving skills in a software development role.
          </p>
        </div>

        {/* Education History */}
        <div style={{ marginBottom: '1.4rem' }}>
          <h4 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.8rem',
            color: '#94a3b8',
            textTransform: 'uppercase',
            marginBottom: '0.65rem'
          }}>
            <GraduationCap size={15} color="#00f0ff" />
            <span>Education History</span>
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {/* SVCE */}
            <div style={{
              padding: '0.85rem 1rem',
              borderRadius: '10px',
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: '#f8fafc', flexWrap: 'wrap' }}>
                <span>Sri Venkateswara College of Engineering</span>
                <span style={{ color: '#00f0ff', fontSize: '0.82rem', fontFamily: "'JetBrains Mono', monospace" }}>2023 – 2027</span>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.84rem', marginTop: '0.2rem' }}>
                B.Tech in Computer Science Engineering (CyberSecurity)
              </div>
              <div style={{ color: '#00ff9d', fontSize: '0.82rem', marginTop: '0.25rem', fontFamily: "'JetBrains Mono', monospace" }}>
                CGPA: 8.6 / 10.0
              </div>
            </div>

            {/* Junior College */}
            <div style={{
              padding: '0.8rem 1rem',
              borderRadius: '10px',
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: '#f8fafc', flexWrap: 'wrap' }}>
                <span>Sri Vivekanandha Junior College</span>
                <span style={{ color: '#94a3b8', fontSize: '0.82rem', fontFamily: "'JetBrains Mono', monospace" }}>2021</span>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>Class 12th (State Board) • <span style={{ color: '#00ff9d' }}>88%</span></div>
            </div>

            {/* High School */}
            <div style={{
              padding: '0.8rem 1rem',
              borderRadius: '10px',
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: '#f8fafc', flexWrap: 'wrap' }}>
                <span>Camford English High School</span>
                <span style={{ color: '#94a3b8', fontSize: '0.82rem', fontFamily: "'JetBrains Mono', monospace" }}>2023</span>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>Class 10th (State Board) • <span style={{ color: '#00ff9d' }}>93%</span></div>
            </div>
          </div>
        </div>

        {/* Projects / Technical Work */}
        <div style={{ marginBottom: '1.4rem' }}>
          <h4 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.8rem',
            color: '#94a3b8',
            textTransform: 'uppercase',
            marginBottom: '0.65rem'
          }}>
            <Code size={15} color="#b026ff" />
            <span>Featured Project</span>
          </h4>
          <div style={{
            padding: '1rem',
            borderRadius: '10px',
            background: 'rgba(15, 23, 42, 0.5)',
            border: '1px solid rgba(176, 38, 255, 0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.98rem' }}>Radix Talent Match</span>
                <span style={{ color: '#b026ff', fontSize: '0.8rem', marginLeft: '0.6rem', fontFamily: "'JetBrains Mono', monospace" }}>
                  Team Project | AUG 2026
                </span>
              </div>
              <a
                href="https://github.com/irumos/Radix"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: '#00f0ff',
                  fontSize: '0.78rem',
                  textDecoration: 'none',
                  fontFamily: "'JetBrains Mono', monospace"
                }}
              >
                <span>github.com/irumos/Radix</span>
                <ExternalLink size={13} />
              </a>
            </div>

            <p style={{ color: '#38bdf8', fontSize: '0.82rem', marginTop: '0.25rem', fontWeight: 500 }}>
              Resume Parsing Module
            </p>

            <ul style={{
              listStyle: 'none',
              marginTop: '0.6rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem',
              color: '#cbd5e1',
              fontSize: '0.82rem',
              lineHeight: 1.5
            }}>
              <li>▹ Developed the resume parsing module for a talent-matching application that evaluates a candidate's resume against a given job description.</li>
              <li>▹ Implemented resume processing to extract relevant candidate information and skills from uploaded documents.</li>
              <li>▹ Used Python, PyMuPDF, and python-docx for processing and extracting content from resume documents.</li>
              <li>▹ Integrated GPT and LangChain to support intelligent analysis of extracted resume information.</li>
              <li>▹ Used FastAPI to build backend APIs for the resume parsing workflow.</li>
            </ul>

            <div className="tag-cloud" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
              {['Python', 'FastAPI', 'LangChain', 'GPT', 'PyMuPDF', 'python-docx', 'SQL'].map((tech, i) => (
                <span key={i} className="tag-pill" style={{ color: '#b026ff', borderColor: 'rgba(176, 38, 255, 0.3)' }}>
                  #{tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements & Activities */}
        <div style={{ marginBottom: '1.4rem' }}>
          <h4 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.8rem',
            color: '#94a3b8',
            textTransform: 'uppercase',
            marginBottom: '0.65rem'
          }}>
            <Trophy size={15} color="#ff7e39" />
            <span>Achievements & Athletic Activities</span>
          </h4>
          <div style={{
            padding: '0.85rem 1rem',
            borderRadius: '10px',
            background: 'rgba(15, 23, 42, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.84rem' }}>
              <span style={{ color: '#ff7e39', fontWeight: 'bold' }}>🏀</span>
              <span><strong>Winner (Basketball)</strong> — Inter College Tournament, 2021.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.84rem' }}>
              <span style={{ color: '#ff7e39', fontWeight: 'bold' }}>🏀</span>
              <span><strong>Runners (Basketball)</strong> — Inter College Tournament, 2025–2026.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.84rem' }}>
              <span style={{ color: '#00ff9d', fontWeight: 'bold' }}>🌟</span>
              <span><strong>Represented JNTUA</strong> in South Zone University Games (Basketball) 2025–2026.</span>
            </div>
          </div>
        </div>

        {/* Skills & Tools */}
        <div>
          <h4 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.8rem',
            color: '#94a3b8',
            textTransform: 'uppercase',
            marginBottom: '0.6rem'
          }}>
            <Award size={15} color="#00ff9d" />
            <span>Technical Skills, Tools & Soft Skills</span>
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
              <strong style={{ color: '#00f0ff' }}>Languages:</strong> Python, C
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
              <strong style={{ color: '#38bdf8' }}>Web:</strong> HTML, CSS (Basics) • <strong style={{ color: '#b026ff' }}>Data:</strong> SQL
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
              <strong style={{ color: '#00ff9d' }}>Tools:</strong> GitHub, VS Code, Excel
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
              <strong style={{ color: '#ff7e39' }}>Soft Skills:</strong> Problem Solving, Team Collaboration, Communication, Time Management
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
