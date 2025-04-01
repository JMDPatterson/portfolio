import React, { useState } from 'react';
import Image from 'next/image';
import styles from './AboutSection.module.css';

const AboutSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textColumn}>
            <div className={styles.titleWrapper}>
              <h2 className={`${styles.title} title`}>About Me</h2>
            </div>
            <div className={styles.bio}>
              <p>
                I'm a creative technologist passionate about leveraging emerging technologies to craft elegant and meaningful human experiences.
              </p>
              <p>
                With a background in design engineering and software development, I leverage creative problem-solving with technical depth to explore the transformative potential of generative AI and immersive technologies to drive innovation, fostering new ways to connect, engage, and inspire.
              </p>
              <p className={styles.currentRole}>
                Working at PwC UK, I explore the impact of emerging technologies on businesses and society, and guide clients through shaping the future of digital experiences.
              </p>
            </div>
          </div>
          <div className={styles.imageColumn}>
            <div 
              className={styles.imageWrapper}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className={styles.imageContainer}>
                <div className={`${styles.imageOverlay} ${isHovered ? styles.hovered : ''}`}>
                  <Image
                    src="/portrait.JPG"
                    alt="Profile"
                    width={1200}
                    height={1600}
                    className={`${styles.headshot} ${styles.regularPortrait}`}
                    priority
                  />
                  <Image
                    src="/Animated portrait.png"
                    alt="Animated Profile"
                    width={1200}
                    height={1600}
                    className={`${styles.headshot} ${styles.animatedPortrait}`}
                  />
                </div>
              </div>
              <div className={styles.accentBox} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;