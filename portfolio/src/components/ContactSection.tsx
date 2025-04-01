import React from 'react';
import styles from './ContactSection.module.css';
import ContactSpheres from './ContactSpheres';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className={styles.contactSection}>
      <ContactSpheres />
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h2 className={`${styles.title} title`}>Let's Connect</h2>
        </div>
        
        <div className={styles.content}>
          <div className={styles.mainColumn}>
            <p className={styles.description}>
              Technology moves fast, and I love exchanging ideas with fellow innovators. Whether you want to share ideas, or exchange perspectives on emerging technology, feel free to reach out!
            </p>
            
            <a 
              href="https://form.typeform.com/to/z6VvFjSJ" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.contactButton}
            >
              <span className={styles.buttonText}>Say Hello</span>
              <span className={styles.buttonIcon}>→</span>
            </a>
          </div>

          <div className={styles.socialColumn}>
            <div className={styles.socialLinks}>
              <a 
                href="https://github.com/JMDPatterson"
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
              >
                <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                <span>GitHub</span>
              </a>
              
              <a 
                href="https://linkedin.com/in/JMDPatterson" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
              >
                <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 