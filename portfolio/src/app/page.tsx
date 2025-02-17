'use client'

import Scene from '@/components/Scene'
import AboutPanel from '@/components/AboutPanel'
import styles from './page.module.css'
import { useState, useCallback } from 'react'

export default function Home() {
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  const handleAboutClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsAboutOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsAboutOpen(false)
  }, [])

  return (
    <main className={styles.main}>
      <Scene />
      <div className={styles.content}>
        <h1 className={styles.title}>James Patterson</h1>
        <nav className={styles.navigation}>
          <a href="#" onClick={handleAboutClick}>About Me</a>
          <a href="/projects">Projects</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
      <AboutPanel 
        isOpen={isAboutOpen}
        onClose={handleClose}
      />
    </main>
  )
}
