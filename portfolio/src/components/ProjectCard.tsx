import React, { useEffect, useRef } from 'react';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  link,
  mediaUrl,
  mediaType
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (mediaType === 'video' && videoRef.current) {
      const video = videoRef.current;
      video.load();
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Error playing video:', error);
        });
      }
    }
  }, [mediaType]);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {mediaType === 'video' ? (
          <video
            ref={videoRef}
            className={styles.image}
            autoPlay
            loop
            muted
            playsInline
            poster="/neo-poster.png"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src={mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={mediaUrl}
            alt={title}
            className={styles.image}
            onError={(e) => console.error('Error loading image:', e)}
          />
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.button}>
          View Project
        </a>
      </div>
    </div>
  );
};

export default ProjectCard; 