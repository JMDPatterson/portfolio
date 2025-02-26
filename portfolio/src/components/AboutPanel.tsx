'use client'

import { motion, AnimatePresence } from 'framer-motion'
import styles from './AboutPanel.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import portraitImage from '@/assets/portrait.jpg'

interface AboutPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function AboutPanel({ isOpen, onClose }: AboutPanelProps) {
  const [imageError, setImageError] = useState(false)

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className={styles.panel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={onClose}>
              <span className={styles.closeIcon}>×</span>
            </button>
            
            <div className={styles.content}>
              <div className={styles.bioColumn}>
                <h2>About Me</h2>
                <p>
                  I'm a software engineer with a passion for creating elegant solutions 
                  to complex problems. My expertise spans full-stack development, with 
                  a particular focus on building scalable web applications and 
                  interactive experiences.
                </p>
                <p>
                  With a background in computer science and years of industry experience, 
                  I bring both technical depth and creative problem-solving to every project. 
                  I'm particularly interested in the intersection of performance optimization 
                  and user experience.
                </p>
                <p className={styles.imageCaption}>
                  Currently working on innovative web solutions and exploring new technologies 
                  in the realm of interactive 3D graphics and real-time applications.
                </p>
              </div>
              
              <div className={styles.imageColumn}>
                <div className={styles.imageContainer}>
                  {!imageError ? (
                    <Image
                      src={portraitImage}
                      alt="Profile"
                      width={1200}
                      height={1600}
                      className={styles.headshot}
                      priority
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <span>Image not found</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 