'use client'

import Scene from '@/components/Scene'
import Projects from '@/components/Projects'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import styles from './page.module.css'
import { useState, useCallback } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Scene />
        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>James Patterson</h1>
            <nav className={styles.navigation}>
              <div className={styles.desktopNav}>
                <a href="#about" onClick={(e) => handleScroll(e, 'about')} className={styles.navLink}>About Me</a>
                <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className={styles.navLink}>Projects</a>
                <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className={styles.navLink}>Contact</a>
              </div>
              <button 
                className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <div></div>
                <div></div>
                <div></div>
              </button>
            </nav>
          </header>

          {/* Mobile Navigation Overlay */}
          <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}>
            <button 
              className={styles.closeButton} 
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <span className={styles.closeIcon}>×</span>
            </button>
            <nav className={styles.mobileNavContent}>
              <a href="#about" onClick={(e) => handleScroll(e, 'about')} className={styles.mobileNavLink}>About Me</a>
              <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className={styles.mobileNavLink}>Projects</a>
              <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className={styles.mobileNavLink}>Contact</a>
            </nav>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Projects Section */}
      <Projects />

      {/* Contact Section */}
      <ContactSection />
    </main>
  )
}
