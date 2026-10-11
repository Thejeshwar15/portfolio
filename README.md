# 🌌 Bupathi Thejeshwar — 3D Interactive Portfolio

A modern, high-performance portfolio for **Bupathi Thejeshwar** (B.Tech Computer Science Engineering in CyberSecurity at Sri Venkateswara College of Engineering), featuring an elegant **minimal 3D ambient background**, **sticky split-screen profile layout**, **interactive cybernetic contact reveal buttons**, and a **seamless Light/Dark theme switcher**.

---

## 👨‍💻 Profile & Contact
- **Name**: Bupathi Thejeshwar
- **Role**: B.Tech CSE (CyberSecurity) | AI & Software Developer
- **College**: Sri Venkateswara College of Engineering (2023 – 2027) • **CGPA: 8.6 / 10.0**
- **Location**: Chittoor, Andhra Pradesh, India
- **Phone**: +91 9703901110 (protected with interactive reveal button)
- **Email**: [bupathi.thejeshwar@gmail.com](mailto:bupathi.thejeshwar@gmail.com) (protected with interactive reveal button)
- **LinkedIn**: [linkedin.com/in/bthejeshwar](https://linkedin.com/in/bthejeshwar)
- **GitHub**: [github.com/Thejeshwar15](https://github.com/Thejeshwar15)

---

## 🚀 Key Dynamic Features

### 1. Sticky Split-Screen Profile Card (`StickyProfileCard.jsx`)
- **Pinned Layout**: On desktop screens, your profile photo (`/profile.jpg`) stays sticky-pinned (`top: 92px`) in a 340px column while the adjacent column scrolls smoothly.
- **3D Tilt Micro-Interaction**: The glassmorphic card responds dynamically to cursor movements with realistic perspective transforms.
- **Status & Badges**: Displays a pulsing green dot badge (`AVAILABLE FOR ROLES`), degree credentials (`SVCE • CGPA 8.6`), and quick action buttons.
- **Mobile Responsive**: Gracefully unsticks and stacks as an elegant hero card on screens `< 992px`.

### 2. Interactive Contact Reveal Buttons (`ContactRevealButton.jsx`)
- **Cybernetic Decode Animation**: Replaces static email and phone text with pill-shaped glassmorphic buttons. Clicking triggers a rapid algorithmic glyph-scramble effect resolving into your actual contact details.
- **One-Click Instant Copy**: Once revealed, clicking the button instantly copies the value to the clipboard and triggers an animated confirmation badge (`Copied to clipboard! ✨`).

### 3. Seamless Light / Dark Theme Switcher
- **Toggle Button**: Fixed in the navbar with rotating SVG Sun/Moon animations and persistent `localStorage` preference.
- **Palette Shift**:
  - **Dark Mode (Default)**: Deep midnight void (`#030712`), frosted navy glassmorphic cards, glowing neon cyan and purple accents.
  - **Light Mode**: High-contrast daylight aesthetic (`#f8fafc`), clean frosted whites, deep slate typography (`#0f172a`), and vibrant indigo/sky blue accents (`#4f46e5`, `#0284c7`).
- **3D Scene Integration**: The Three.js canvas dynamically updates clear colors, particle palettes, lighting intensities, and wireframe opacities to contrast in both modes.

### 4. Featured Project: Radix Talent Match (AUG 2026)
- **Team Project | Resume Parsing Module**
- **Architecture Pipeline**: Document Ingestion (`PyMuPDF`, `python-docx`) ➔ Semantic AI Analysis (`GPT`, `LangChain`) ➔ Asynchronous Backend (`FastAPI`).
- **All 5 Resume Bullet Points Included**.
- **Repository**: [github.com/irumos/Radix](https://github.com/irumos/Radix).

---

## 💻 Quick Start Guide

```bash
# Start local development server:
npm run dev
# -> http://localhost:3000

# Build for production:
npm run build
npm run preview
```
