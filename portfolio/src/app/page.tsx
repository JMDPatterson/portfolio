'use client'

import Scene from '@/components/Scene'
import AboutPanel from '@/components/AboutPanel'
import styles from './page.module.css'
import { useState, useCallback } from 'react'
import Link from 'next/link'

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
        <header className={styles.header}>
          <h1 className={styles.title}>James Patterson</h1>
          <nav className={styles.navigation}>
            <a href="#" onClick={handleAboutClick}>About Me</a>
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>
      </div>
      <AboutPanel 
        isOpen={isAboutOpen}
        onClose={handleClose}
      />
    </main>
  )
}
