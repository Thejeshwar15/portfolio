/**
 * Ambient Audio synthesizer using Web Audio API:
 * Zero external audio assets required. Generates futuristic spatial sci-fi drones
 * and subtle resonant chimes for shape inspection.
 */
class AudioManager {
  constructor() {
    this.ctx = null
    this.droneOsc = null
    this.gainNode = null
    this.isPlaying = false
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (AudioContext) {
        this.ctx = new AudioContext()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  toggle() {
    this.init()
    if (!this.ctx) return false

    if (this.isPlaying) {
      this.stopDrone()
      this.isPlaying = false
    } else {
      this.startDrone()
      this.isPlaying = true
    }
    return this.isPlaying
  }

  startDrone() {
    if (!this.ctx) return

    try {
      this.droneOsc = this.ctx.createOscillator()
      this.gainNode = this.ctx.createGain()

      // Low frequency soothing cosmic hum (55 Hz - A1 note)
      this.droneOsc.type = 'sine'
      this.droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime)

      // Very soft ambient volume
      this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime)
      this.gainNode.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 2.0)

      this.droneOsc.connect(this.gainNode)
      this.gainNode.connect(this.ctx.destination)
      this.droneOsc.start()
    } catch (e) {
      console.warn('Audio start error:', e)
    }
  }

  stopDrone() {
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8)
        setTimeout(() => {
          if (this.droneOsc) {
            this.droneOsc.stop()
            this.droneOsc.disconnect()
            this.droneOsc = null
          }
        }, 850)
      } catch (e) {
        // ignore
      }
    }
  }

  playChime(freq = 440) {
    if (!this.isPlaying || !this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.65)
    } catch (e) {
      // ignore
    }
  }
}

export const audioManager = new AudioManager()
