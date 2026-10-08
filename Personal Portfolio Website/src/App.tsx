import { useEffect, useRef, useState, useCallback } from 'react'
import girlImg from './assets/girl-reference.png'

// ─── Decorative SVG doodles ───────────────────────────────────────────────────
function StarDoodle({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2 L13.5 9.5 L21 12 L13.5 14.5 L12 22 L10.5 14.5 L3 12 L10.5 9.5 Z" fill="currentColor" />
    </svg>
  )
}

function SparkleIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 1 L13 8 L20 9 L13 10 L12 17 L11 10 L4 9 L11 8 Z" fill="currentColor" opacity="0.9" />
      <path d="M19 3 L19.5 6 L22.5 6.5 L19.5 7 L19 10 L18.5 7 L15.5 6.5 L18.5 6 Z" fill="currentColor" opacity="0.6" />
      <path d="M4 16 L4.4 18.4 L6.8 18.8 L4.4 19.2 L4 21.6 L3.6 19.2 L1.2 18.8 L3.6 18.4 Z" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

function ArrowRight({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

// ─── Animated Girl Illustration ───────────────────────────────────────────────
function AnimatedGirl() {
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const wrapRef = useRef<HTMLDivElement>(null)
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number }>>([])
  const starIdRef = useRef(0)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!wrapRef.current) return
    const rect = wrapRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePos({ x, y })
    if (Math.random() > 0.72) {
      const id = starIdRef.current++
      const sx = e.clientX - rect.left
      const sy = e.clientY - rect.top
      setStars(s => [...s.slice(-8), { id, x: sx, y: sy }])
      setTimeout(() => setStars(s => s.filter(st => st.id !== id)), 950)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="relative select-none"
      style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }) }}
      onMouseMove={handleMouseMove}
    >
      {/* Soft lavender glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 65% at 50% 60%, rgba(196,181,253,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
        transition: 'transform 0.6s ease',
      }} />

      {/* Floating sparkle doodles */}
      {([
        { ch: '✦', top: '7%',  left: '4%',  d: '3.2s', delay: '0s',   cls: 'text-violet-300 text-lg' },
        { ch: '✦', top: '14%', right: '6%', d: '2.8s', delay: '0.5s', cls: 'text-violet-400 text-sm' },
        { ch: '✦', top: '42%', right: '2%', d: '3.6s', delay: '1s',   cls: 'text-purple-300 text-xs' },
        { ch: '✦', bottom: '24%', left: '2%',  d: '4s', delay: '0.3s', cls: 'text-violet-300 text-base' },
        { ch: '♡', bottom: '32%', right: '5%', d: '2.5s', delay: '0.8s', cls: 'text-fuchsia-300 text-xs' },
        { ch: '✿', top: '58%', left: '0%',  d: '3s',   delay: '1.4s', cls: 'text-violet-200 text-sm' },
      ] as Array<{ ch: string; top?: string; bottom?: string; left?: string; right?: string; d: string; delay: string; cls: string }>)
        .map((s, i) => (
          <span
            key={i}
            className={`absolute z-10 pointer-events-none ${s.cls}`}
            style={{ top: s.top, bottom: s.bottom, left: s.left, right: s.right,
                     animation: `sparkleFloat ${s.d} ease-in-out infinite ${s.delay}` }}
          >{s.ch}</span>
        ))}

      {/* Cursor trail stars */}
      {stars.map(s => (
        <div key={s.id} className="pointer-events-none absolute z-20 text-violet-400"
          style={{ left: s.x, top: s.y, transform: 'translate(-50%,-50%)', fontSize: 13,
                   animation: 'fadeOut 0.95s ease forwards' }}>✦</div>
      ))}

      {/* Illustration image — breathing + hover tilt */}
      <img
        src={girlImg}
        alt="Nireeksha A P — UI/UX Designer at a cozy desk"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          borderRadius: '1.5rem',
          animation: 'breathe 3s ease-in-out infinite',
          transform: hovered
            ? `scale(1.018) perspective(900px) rotateY(${mousePos.x * 2.5}deg) rotateX(${-mousePos.y * 1.8}deg)`
            : 'scale(1)',
          transition: 'transform 0.45s cubic-bezier(0.34,1.4,0.64,1), filter 0.4s ease',
          filter: hovered
            ? 'drop-shadow(0 18px 44px rgba(124,58,237,0.22))'
            : 'drop-shadow(0 8px 28px rgba(124,58,237,0.12))',
        }}
      />
    </div>
  )
}

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
        }
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── Cursor ───────────────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
      if (ringRef.current) {
        setTimeout(() => {
          if (ringRef.current) {
            ringRef.current.style.left = e.clientX + 'px'
            ringRef.current.style.top = e.clientY + 'px'
          }
        }, 60)
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Home', 'Work', 'About', 'Experience', 'Skills', 'Contact']

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(250,247,255,0.88)' : 'rgba(250,247,255,0.95)',
        backdropFilter: scrolled ? 'blur(16px)' : 'blur(4px)',
        borderBottom: scrolled ? '1px solid #ede9fe' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(124,58,237,0.06)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-1.5 group" style={{ textDecoration: 'none' }}>
          <span className="font-display font-semibold text-lg" style={{ color: '#2d1b69', letterSpacing: '-0.02em' }}>
            Nireeksha A P
          </span>
          <StarDoodle size={13} className="text-violet-400 animate-star-twinkle" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">{link}</a>
          ))}
        </div>

        {/* Resume btn */}
        <a
          href="#"
          className="hidden md:flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full"
          style={{
            border: '1.5px solid #7c3aed',
            color: '#7c3aed',
            textDecoration: 'none',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.background = '#7c3aed'; (e.target as HTMLElement).style.color = 'white' }}
          onMouseLeave={e => { (e.target as HTMLElement).style.background = 'transparent'; (e.target as HTMLElement).style.color = '#7c3aed' }}
        >
          Resume ↓
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(m => !m)}
          aria-label="Toggle menu"
        >
          <span className="w-5 h-0.5 rounded" style={{ background: '#2d1b69', transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
          <span className="w-5 h-0.5 rounded" style={{ background: '#2d1b69', opacity: menuOpen ? 0 : 1, transition: 'all 0.2s' }} />
          <span className="w-5 h-0.5 rounded" style={{ background: '#2d1b69', transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-5 pt-2 flex flex-col gap-4" style={{ background: 'rgba(250,247,255,0.98)', borderTop: '1px solid #ede9fe' }}>
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="nav-link text-base" onClick={() => setMenuOpen(false)}>{link}</a>
          ))}
          <a href="#" className="text-sm font-medium px-4 py-2 rounded-full text-center" style={{ border: '1.5px solid #7c3aed', color: '#7c3aed', textDecoration: 'none' }}>
            Resume ↓
          </a>
        </div>
      )}
    </nav>
  )
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="reveal mb-12 text-center">
      <div className="inline-flex items-center gap-2 mb-3">
        <SparkleIcon size={16} className="text-violet-400" />
        <h2 className="font-display text-3xl sm:text-4xl font-semibold" style={{ color: '#2d1b69', letterSpacing: '-0.02em' }}>
          {title}
        </h2>
        <SparkleIcon size={16} className="text-violet-400" />
      </div>
      {subtitle && (
        <p className="text-base mt-2 max-w-xl mx-auto" style={{ color: '#7c6fa0' }}>{subtitle}</p>
      )}
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, #faf7ff 0%, #f3f0ff 50%, #fdf4ff 100%)' }}>
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #c4b5fd, transparent 70%)' }} />
        <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }} />
        {/* Doodle dots */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute w-2 h-2 rounded-full" style={{
            background: '#c4b5fd',
            opacity: 0.35,
            left: `${10 + i * 11}%`,
            top: `${15 + (i % 3) * 20}%`,
            animation: `sparkleFloat ${2.5 + i * 0.3}s ease-in-out infinite ${i * 0.2}s`
          }} />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left */}
        <div className="order-2 lg:order-1">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
            <span className="inline-block text-sm font-medium px-3 py-1 rounded-full mb-4" style={{ background: '#ede9fe', color: '#7c3aed' }}>
              ✦ Hi, I'm
            </span>
          </div>

          <h1
            className="font-display font-bold mb-4 animate-fade-in-up"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#2d1b69',
              animationDelay: '0.2s',
              opacity: 0,
              animationFillMode: 'forwards'
            }}
          >
            Nireeksha<br />
            <span style={{ color: '#7c3aed' }}>A P</span>
          </h1>

          <p
            className="text-lg font-medium mb-4 animate-fade-in-up"
            style={{ color: '#5b21b6', animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards', letterSpacing: '0.02em' }}
          >
            UI/UX Designer · Frontend Developer
          </p>

          <p
            className="text-base leading-relaxed mb-7 max-w-lg animate-fade-in-up"
            style={{ color: '#7c6fa0', animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards', lineHeight: 1.75 }}
          >
            I turn ideas into thoughtful digital experiences — from first sketch to working interface.
            I design, build and experiment with AI to create meaningful, user-friendly and visually engaging products.
          </p>

          {/* Skill pills */}
          <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
            {['UI/UX', 'Frontend', 'Visual Design', 'AI × Design'].map((tag, i) => (
              <span
                key={tag}
                className="skill-pill text-sm font-medium px-4 py-1.5 rounded-full"
                style={{
                  background: '#ede9fe',
                  color: '#5b21b6',
                  border: '1px solid #c4b5fd',
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mb-7 animate-fade-in-up" style={{ animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards' }}>
            <a
              href="#work"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 group"
              style={{ background: '#7c3aed', color: 'white', textDecoration: 'none', boxShadow: '0 4px 20px rgba(124,58,237,0.3)' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 28px rgba(124,58,237,0.45)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.3)')}
            >
              View My Work
              <ArrowRight size={15} />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300"
              style={{ background: 'white', color: '#7c3aed', border: '1.5px solid #c4b5fd', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.background = '#faf5ff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#c4b5fd'; e.currentTarget.style.background = 'white' }}
            >
              Let's Connect ✉
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm animate-fade-in-up" style={{ color: '#a78bfa', animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}>
            <span>📍</span>
            <span>Bengaluru, India</span>
          </div>
        </div>

        {/* Right — illustration */}
        <div className="order-1 lg:order-2 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
          <AnimatedGirl />
        </div>
      </div>
    </section>
  )
}

// ─── What I Do ────────────────────────────────────────────────────────────────
function WhatIDo() {
  const cards = [
    {
      title: 'UI/UX Design',
      icon: '✏️',
      items: ['User interface design', 'User flows & wireframes', 'Prototyping & usability', 'Design systems', 'Responsive layouts'],
      gradient: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
    },
    {
      title: 'Frontend Development',
      icon: '💻',
      items: ['HTML, CSS, JavaScript', 'React', 'Interactive UI', 'Responsive websites', 'GSAP / animation'],
      gradient: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
    },
    {
      title: 'Visual Design',
      icon: '🎨',
      items: ['Posters & social media', 'Event branding', 'Campaign graphics', 'Promotional materials', 'Visual identity'],
      gradient: 'linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)',
    },
    {
      title: 'AI-Assisted Design',
      icon: '✦',
      description: 'I use AI as a creative and productivity tool — from ideation and visual exploration to prompt engineering and rapid prototyping, while refining the final design through my own decisions.',
      gradient: 'linear-gradient(135deg, #f0f9ff 0%, #ede9fe 100%)',
    },
  ]

  return (
    <section id="experience" className="py-24 px-5 sm:px-8" style={{ background: '#faf7ff' }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="What I Do" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="reveal card-hover p-6 rounded-2xl"
              style={{
                background: card.gradient,
                border: '1.5px solid #e9d5ff',
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300"
                style={{ background: 'white', boxShadow: '0 4px 12px rgba(124,58,237,0.12)' }}
              >
                {card.icon}
              </div>
              <h3 className="font-display font-semibold text-lg mb-3" style={{ color: '#2d1b69' }}>{card.title}</h3>
              {card.items ? (
                <ul className="space-y-1.5">
                  {card.items.map(item => (
                    <li key={item} className="text-sm flex items-center gap-2" style={{ color: '#7c6fa0' }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#a78bfa' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-relaxed" style={{ color: '#7c6fa0', lineHeight: 1.7 }}>{card.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Featured Work ────────────────────────────────────────────────────────────
function FeaturedWork() {
  const projects = [
    {
      num: '01',
      title: 'Brand Identity & Website Redesign',
      desc: 'End-to-end UI/UX redesign for a local business — from user research and wireframes to high-fidelity Figma prototype and React frontend.',
      tags: ['Figma', 'React', 'UI/UX', 'Branding'],
      color: '#7c3aed',
      bg: 'linear-gradient(135deg, #2d1b69 0%, #1e0a4e 100%)',
    },
    {
      num: '02',
      title: 'Event Platform UI',
      desc: 'Designed and built an event discovery platform with responsive layouts, micro-interactions and custom design system components.',
      tags: ['Design System', 'Frontend', 'Prototyping'],
      color: '#a78bfa',
      bg: 'linear-gradient(135deg, #4c1d95 0%, #2d1b69 100%)',
    },
    {
      num: '03',
      title: 'AI-Assisted Portfolio Tool',
      desc: 'Conceptualized and built a personal portfolio generator using AI prompting, visual exploration and React frontend implementation.',
      tags: ['AI Tools', 'React', 'Prompt Engineering'],
      color: '#c4b5fd',
      bg: 'linear-gradient(135deg, #5b21b6 0%, #3b0764 100%)',
    },
  ]

  return (
    <section id="work" className="py-24 px-5 sm:px-8" style={{ background: '#f3f0ff' }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Featured Work"
          subtitle="Selected projects combining design, frontend development and creative experimentation."
        />
        <div className="grid gap-6">
          {projects.map((proj, i) => (
            <div
              key={proj.num}
              className="project-card reveal rounded-2xl overflow-hidden"
              style={{
                border: '1.5px solid #e9d5ff',
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div className="grid md:grid-cols-2">
                {/* Image placeholder */}
                <div
                  className="project-img relative h-56 md:h-72 flex items-center justify-center overflow-hidden"
                  style={{ background: proj.bg }}
                >
                  <div className="text-center">
                    <div className="text-7xl font-display font-bold opacity-10" style={{ color: 'white' }}>{proj.num}</div>
                    <div className="mt-3 flex gap-2 justify-center">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="rounded" style={{ width: 40 + j * 20, height: 6, background: 'rgba(255,255,255,0.2)' }} />
                      ))}
                    </div>
                    <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>[ project screenshot ]</p>
                  </div>
                  {/* Decorative */}
                  <div className="absolute top-4 right-4 text-white opacity-20 text-3xl">✦</div>
                  <div className="absolute bottom-4 left-4 text-white opacity-10 text-5xl font-display italic">design</div>
                </div>

                {/* Info */}
                <div className="p-7 flex flex-col justify-between" style={{ background: 'white' }}>
                  <div>
                    <span className="text-xs font-mono font-semibold px-2 py-1 rounded" style={{ background: '#ede9fe', color: '#7c3aed' }}>
                      Project {proj.num}
                    </span>
                    <h3 className="font-display text-xl font-semibold mt-3 mb-3" style={{ color: '#2d1b69' }}>{proj.title}</h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: '#7c6fa0', lineHeight: 1.7 }}>{proj.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map(tag => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full" style={{ background: '#f3f0ff', color: '#5b21b6', border: '1px solid #ddd6fe' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="arrow-btn mt-6 flex items-center gap-2 text-sm font-semibold self-start"
                    style={{ color: '#7c3aed', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    View Case Study <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Design & Community ───────────────────────────────────────────────────────
function DesignCommunity() {
  return (
    <section className="py-24 px-5 sm:px-8" style={{ background: '#faf7ff' }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Design & Community" />
        <div className="grid md:grid-cols-2 gap-6">
          {/* UbuCon card */}
          <div className="reveal card-hover rounded-2xl p-7 relative overflow-hidden" style={{ background: 'white', border: '1.5px solid #e9d5ff' }}>
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5" style={{ background: 'radial-gradient(circle, #e95420, transparent)' }} />
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: '#fff3ee', border: '1.5px solid #fed7aa' }}>
              🐧
            </div>
            <div className="inline-block text-xs font-medium px-2 py-0.5 rounded mb-2" style={{ background: '#fff3ee', color: '#9a3412' }}>
              Volunteer Designer · Ubuntu India
            </div>
            <h3 className="font-display text-xl font-semibold mb-3" style={{ color: '#2d1b69' }}>UbuCon India 2026</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#7c6fa0', lineHeight: 1.7 }}>
              Contributing to visual communication and design for India's Ubuntu community conference.
              Creating event materials, social assets and conference branding.
            </p>
            <button className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#7c3aed', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              View Work <ArrowRight size={14} />
            </button>
            {/* Decorative dots */}
            <div className="absolute bottom-5 right-5 flex gap-1.5">
              {[...Array(3)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full" style={{ background: '#e9d5ff' }} />)}
            </div>
          </div>

          {/* SLUG card */}
          <div className="reveal card-hover rounded-2xl p-7 relative overflow-hidden" style={{ background: 'white', border: '1.5px solid #e9d5ff', transitionDelay: '0.1s' }}>
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5" style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: '#ede9fe', border: '1.5px solid #ddd6fe' }}>
              🐧
            </div>
            <div className="inline-block text-xs font-medium px-2 py-0.5 rounded mb-2" style={{ background: '#ede9fe', color: '#5b21b6' }}>
              Design Lead · SNPSU
            </div>
            <h3 className="font-display text-xl font-semibold mb-3" style={{ color: '#2d1b69' }}>SLUG</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#7c6fa0', lineHeight: 1.7 }}>
              Leading design contributions for the university's open-source and Linux community.
              Creating visual identity, community materials and event graphics.
            </p>
            <button className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#7c3aed', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              View Work <ArrowRight size={14} />
            </button>
            <div className="absolute bottom-5 right-5 flex gap-1.5">
              {[...Array(3)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full" style={{ background: '#e9d5ff' }} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-24 px-5 sm:px-8" style={{ background: '#f3f0ff' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div className="reveal">
            <div className="flex items-center gap-2 mb-4">
              <SparkleIcon size={16} className="text-violet-400" />
              <h2 className="font-display text-3xl sm:text-4xl font-semibold" style={{ color: '#2d1b69', letterSpacing: '-0.02em' }}>
                A Little About Me
              </h2>
            </div>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#5b21b6', lineHeight: 1.8 }}>
              I'm Nireeksha A P, a Computer Science engineering student from Bengaluru, exploring the intersection of UI/UX, frontend development, visual design and AI.
            </p>
            <p className="text-base leading-relaxed mb-7" style={{ color: '#7c6fa0', lineHeight: 1.8 }}>
              I enjoy turning ideas into interfaces, experimenting with creative tools, and contributing to technology communities through design and leadership.
            </p>
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
              style={{ background: '#7c3aed', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(124,58,237,0.25)' }}
            >
              More About Me <ArrowRight size={15} />
            </button>
          </div>

          {/* Design Process */}
          <div className="reveal reveal-delay-2">
            <h3 className="font-display text-lg font-semibold mb-6" style={{ color: '#2d1b69' }}>My Design Process</h3>
            <div className="relative">
              {['Understand', 'Explore', 'Structure', 'Design', 'Prototype', 'Build', 'Refine'].map((step, i) => (
                <div
                  key={step}
                  className="flex items-center gap-4 mb-4 reveal"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: i < 4 ? '#7c3aed' : '#c4b5fd',
                      color: i < 4 ? 'white' : '#4c1d95',
                      fontSize: '0.7rem'
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-semibold" style={{ color: '#2d1b69' }}>{step}</span>
                  </div>
                  {i < 6 && (
                    <div className="absolute left-4.5" style={{ top: `${i * 52 + 44}px`, width: 2, height: 20, background: 'linear-gradient(to bottom, #c4b5fd, #e9d5ff)', borderRadius: 1, transform: 'translateX(-1px)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  const groups = [
    {
      label: 'Design',
      emoji: '✏️',
      items: ['Figma', 'Canva', 'UI/UX', 'Graphic Design', 'Prototyping', 'Visual Design'],
    },
    {
      label: 'Development',
      emoji: '💻',
      items: ['HTML', 'CSS', 'JavaScript', 'React', 'Frontend', 'Git & GitHub'],
    },
    {
      label: 'AI',
      emoji: '✦',
      items: ['Prompt Engineering', 'Generative AI', 'AI Tools', 'AI-assisted Design'],
    },
    {
      label: 'Workflow',
      emoji: '🔄',
      items: ['Responsive Design', 'Design-to-Code', 'Project Management', 'Prototyping'],
    },
  ]

  return (
    <section id="skills" className="py-24 px-5 sm:px-8" style={{ background: '#faf7ff' }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Skills" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {groups.map((group, gi) => (
            <div key={group.label} className="reveal" style={{ transitionDelay: `${gi * 0.1}s` }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{group.emoji}</span>
                <h3 className="font-display font-semibold text-base" style={{ color: '#2d1b69' }}>{group.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, ii) => (
                  <span
                    key={item}
                    className="skill-pill text-sm px-3 py-1.5 rounded-full font-medium"
                    style={{
                      background: '#ede9fe',
                      color: '#5b21b6',
                      border: '1px solid #ddd6fe',
                      animationDelay: `${(gi * 2 + ii) * 0.15}s`
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Certifications ───────────────────────────────────────────────────────────
function Certifications() {
  const certs = [
    { icon: '✦', name: '[Certification Name]', issuer: '[Issuer / Platform]', year: '2024', category: 'Prompt Engineering' },
    { icon: '🎨', name: '[Certification Name]', issuer: '[Issuer / Platform]', year: '2024', category: 'UI/UX Design' },
    { icon: '💻', name: '[Certification Name]', issuer: '[Issuer / Platform]', year: '2024', category: 'Frontend Development' },
    { icon: '🤖', name: '[Certification Name]', issuer: '[Issuer / Platform]', year: '2025', category: 'AI / Technology' },
  ]

  return (
    <section className="py-24 px-5 sm:px-8" style={{ background: '#f3f0ff' }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Certifications" />
        <div className="grid gap-4">
          {certs.map((cert, i) => (
            <div
              key={i}
              className="reveal card-hover flex items-center gap-5 p-5 rounded-xl"
              style={{
                background: 'white',
                border: '1.5px solid #e9d5ff',
                transitionDelay: `${i * 0.08}s`
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: '#ede9fe' }}>
                {cert.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate" style={{ color: '#2d1b69' }}>{cert.name}</div>
                <div className="text-xs mt-0.5" style={{ color: '#7c6fa0' }}>{cert.issuer}</div>
              </div>
              <div className="hidden sm:block text-xs px-2.5 py-1 rounded-full" style={{ background: '#ede9fe', color: '#5b21b6' }}>
                {cert.category}
              </div>
              <div className="text-xs font-mono" style={{ color: '#a78bfa' }}>{cert.year}</div>
              <ArrowRight size={14} className="text-violet-400 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── AI × Design ──────────────────────────────────────────────────────────────
function AIDesign() {
  const steps = ['IDEATE', 'PROMPT', 'GENERATE', 'SELECT', 'REFINE', 'DESIGN', 'BUILD']

  return (
    <section className="py-24 px-5 sm:px-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e0a4e 0%, #2d1b69 60%, #1e0a4e 100%)' }}>
      {/* Stars bg */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: 'white',
            opacity: 0.2 + (i % 5) * 0.1,
            left: `${5 + i * 4.8}%`,
            top: `${10 + (i % 6) * 14}%`,
            animation: `starTwinkle ${2 + (i % 3)}s ease-in-out infinite ${i * 0.2}s`
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto text-center relative">
        <div className="reveal mb-4">
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(196,181,253,0.2)', color: '#c4b5fd' }}>
            ✦ AI × Design
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4" style={{ color: 'white', letterSpacing: '-0.02em' }}>
            Designing with AI
          </h2>
          <p className="text-base" style={{ color: '#a78bfa' }}>AI is part of my creative workflow — not a replacement for design thinking.</p>
        </div>

        {/* Flow */}
        <div className="reveal mt-12 flex flex-wrap justify-center items-center gap-2">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className="relative px-4 py-2.5 rounded-xl text-sm font-bold"
                style={{
                  background: 'rgba(196,181,253,0.15)',
                  color: '#e9d5ff',
                  border: '1px solid rgba(196,181,253,0.3)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {step}
                {/* Sparkle */}
                <span
                  className="absolute -top-2 -right-1 text-xs"
                  style={{ color: '#c4b5fd', animation: `sparkleFloat ${2 + i * 0.3}s ease-in-out infinite ${i * 0.2}s` }}
                >✦</span>
              </div>
              {i < steps.length - 1 && (
                <span style={{ color: '#a78bfa', fontSize: '1.2rem' }}>↓</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Currently Exploring ─────────────────────────────────────────────────────
function CurrentlyExploring() {
  const items = ['AI × Design', 'Frontend Animation', 'Design Systems', 'Creative Coding', 'Open Source', 'Japanese']

  return (
    <section className="py-20 px-5 sm:px-8" style={{ background: '#faf7ff' }}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="reveal mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <SparkleIcon size={16} className="text-violet-400" />
            <h2 className="font-display text-2xl font-semibold" style={{ color: '#2d1b69' }}>Currently Exploring</h2>
          </div>
        </div>
        <div className="reveal flex flex-wrap justify-center gap-3">
          {items.map((item, i) => (
            <span
              key={item}
              className="skill-pill text-sm font-medium px-5 py-2.5 rounded-full animate-pill-float"
              style={{
                background: 'white',
                color: '#5b21b6',
                border: '1.5px solid #ddd6fe',
                boxShadow: '0 4px 12px rgba(124,58,237,0.08)',
                animationDelay: `${i * 0.4}s`,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-20 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <div
          className="reveal rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #2d1b69 0%, #4c1d95 50%, #2d1b69 100%)' }}
        >
          {/* Stars */}
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 rounded-full" style={{
              background: 'white', opacity: 0.15,
              left: `${8 + i * 8}%`, top: `${10 + (i % 4) * 22}%`,
              animation: `starTwinkle ${2.5 + i * 0.3}s ease-in-out infinite ${i * 0.25}s`
            }} />
          ))}

          {/* Small illustration */}
          <div className="text-4xl mb-6">💌</div>

          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4" style={{ color: 'white', letterSpacing: '-0.02em' }}>
            Have an idea worth building?
          </h2>
          <p className="text-base mb-9" style={{ color: '#c4b5fd', lineHeight: 1.7 }}>
            I'm always open to interesting design, frontend and creative technology projects.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="mailto:nireeksha@example.com"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
              style={{ background: 'white', color: '#2d1b69', textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
            >
              Get in Touch <ArrowRight size={14} />
            </a>
            {[
              { label: 'LinkedIn', href: '#' },
              { label: 'GitHub', href: '#' },
              { label: 'Email', href: 'mailto:' },
            ].map(btn => (
              <a
                key={btn.label}
                href={btn.href}
                className="px-5 py-3 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: '#e9d5ff',
                  textDecoration: 'none',
                  border: '1px solid rgba(196,181,253,0.3)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 px-5 sm:px-8 text-center" style={{ borderTop: '1px solid #ede9fe', background: '#faf7ff' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <span className="font-display font-semibold text-lg" style={{ color: '#2d1b69' }}>Nireeksha A P</span>
          <StarDoodle size={13} className="text-violet-400" />
        </div>
        <p className="text-sm mb-5" style={{ color: '#7c6fa0' }}>UI/UX Designer × Frontend Developer × CSE Student</p>
        <div className="flex justify-center gap-6 mb-6">
          {['LinkedIn', 'GitHub', 'Email'].map(link => (
            <a key={link} href="#" className="text-sm" style={{ color: '#a78bfa', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#7c3aed')}
              onMouseLeave={e => (e.currentTarget.style.color = '#a78bfa')}
            >
              {link}
            </a>
          ))}
        </div>
        <p className="text-xs" style={{ color: '#c4b5fd' }}>Let's create something beautiful ♡</p>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useScrollReveal()

  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <WhatIDo />
        <FeaturedWork />
        <DesignCommunity />
        <About />
        <Skills />
        <Certifications />
        <AIDesign />
        <CurrentlyExploring />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
