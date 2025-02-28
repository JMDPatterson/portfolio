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
                I'm a creative technologist passionate about leveraging emerging technologies to craft elegant and meaningful human experiences.
                </p>
                <p>
                With a background in design engineering and software development, I leverage creative problem-solving with technical depth to explore the transformative potential of generative AI and immersive technologies to drive innovation, fostering new ways to connect, engage, and inspire.
                </p>
                <p className={styles.imageCaption}>
                Currently working at PwC UK, I explore the impact of emerging technologies on businesses and society, and guide clients through shaping the future of digital experiences.
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