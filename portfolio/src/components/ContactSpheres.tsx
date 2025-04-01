import React from 'react';
import styles from './ContactSpheres.module.css';

const SPHERES = [
  { color: '#FFD8C0', size: 120, left: '10%', top: '15%' },
  { color: '#FFD0D0', size: 150, left: '75%', top: '20%' },
  { color: '#E8D8FF', size: 100, left: '25%', top: '60%' },
  { color: '#D8E5FF', size: 140, left: '65%', top: '70%' },
  { color: '#FFD8D8', size: 110, left: '40%', top: '40%' },
  { color: '#FFD0D0', size: 70, left: '85%', top: '45%' },
  { color: '#E8D8FF', size: 60, left: '15%', top: '85%' },
  { color: '#D8E5FF', size: 80, left: '55%', top: '10%' }
];

const ContactSpheres: React.FC = () => {
  return (
    <div className={styles.container}>
      {SPHERES.map((sphere, index) => (
        <div
          key={index}
          className={styles.sphere}
          style={{
            width: `${sphere.size}px`,
            height: `${sphere.size}px`,
            left: sphere.left,
            top: sphere.top,
            backgroundColor: sphere.color,
            animationDelay: `${index * 0.5}s`
          }}
        />
      ))}
    </div>
  );
};

export default ContactSpheres; 