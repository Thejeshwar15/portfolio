import React, { useState, useEffect, useRef } from 'react'
import { Lock, Unlock, Eye, Copy, Check, Sparkles, Mail, Phone } from 'lucide-react'

/**
 * ContactRevealButton:
 * Interactive pill-shaped glassmorphic reveal button for sensitive contact data.
 * Features:
 *  - Cybernetic text scramble/decode micro-animation on reveal.
 *  - One-click copy to clipboard with glowing success badge.
 *  - Accessible keyboard interaction.
 */
export default function ContactRevealButton({
  type = 'email', // 'email' | 'phone'
  value,
  label
}) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [isDecoding, setIsDecoding] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const intervalRef = useRef(null)

  const defaultLabel = label || (type === 'email' ? 'Reveal Email' : 'Reveal Phone')
  const IconComponent = type === 'email' ? Mail : Phone

  // Cybernetic text decode effect on reveal
  const handleReveal = (e) => {
    e.stopPropagation()
    if (isRevealed) {
      handleCopy()
      return
    }

    setIsDecoding(true)
    setIsRevealed(true)

    const glyphs = '01#%*&!?><_+=/'
    let iteration = 0
    const target = value
    const maxIterations = target.length

    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDisplayText(
        target
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return target[index]
            }
            return glyphs[Math.floor(Math.random() * glyphs.length)]
          })
          .join('')
      )

      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current)
        setIsDecoding(false)
        setDisplayText(target)
      }

      iteration += 1 / 2
    }, 28)
  }

  // Copy to clipboard with success feedback
  const handleCopy = () => {
    if (!isRevealed) return
    navigator.clipboard.writeText(value)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2200)
  }

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <div className="contact-reveal-wrapper">
      <button
        type="button"
        className={`contact-reveal-btn ${isRevealed ? 'revealed' : 'locked'} ${type}`}
        onClick={isRevealed ? handleCopy : handleReveal}
        title={isRevealed ? 'Click to copy to clipboard' : `Click to reveal ${type}`}
        aria-label={isRevealed ? `Copy ${value}` : defaultLabel}
      >
        <span className="btn-icon-slot">
          {isCopied ? (
            <Check size={15} className="icon-pulse text-green" />
          ) : isRevealed ? (
            <IconComponent size={15} />
          ) : (
            <Lock size={14} className="icon-lock" />
          )}
        </span>

        <span className="btn-text-slot">
          {isRevealed ? (
            <span className={`revealed-val ${isDecoding ? 'scrambling' : ''}`}>
              {displayText || value}
            </span>
          ) : (
            <span className="reveal-prompt">{defaultLabel}</span>
          )}
        </span>

        <span className="btn-action-slot">
          {isCopied ? (
            <span className="copy-badge">
              <Sparkles size={12} />
              <span>Copied! ✨</span>
            </span>
          ) : isRevealed ? (
            <span className="copy-hint" title="Copy to clipboard">
              <Copy size={13} />
            </span>
          ) : (
            <span className="reveal-hint">
              <Eye size={13} />
            </span>
          )}
        </span>
      </button>

      {/* Floating Success Pill when copied */}
      {isCopied && (
        <div className="floating-copy-toast" role="status">
          <span>Copied to clipboard! ✨</span>
        </div>
      )}
    </div>
  )
}
