'use client'

import Scene from '@/components/Scene'
import AboutPanel from '@/components/AboutPanel'
import styles from './page.module.css'
import { useState, useCallback } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleAboutClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsAboutOpen(true)
    setIsMobileMenuOpen(false)
  }, [])

  const handleClose = useCallback(() => {
    setIsAboutOpen(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  return (
    <main className={styles.main}>
      <Scene />
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>James Patterson</h1>
          <nav className={styles.navigation}>
            <div className={styles.desktopNav}>
              <a href="#" onClick={handleAboutClick}>About Me</a>
              <Link href="/contact">Contact</Link>
            </div>
            <button 
              className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
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
            <a href="#" onClick={handleAboutClick}>About Me</a>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </div>
      <AboutPanel 
        isOpen={isAboutOpen}
        onClose={handleClose}
      />
    </main>
  )
}
