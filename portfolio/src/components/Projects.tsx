import React from 'react';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Free Your Mind",
      description: "Interactive ASCII art web app, inspired by the Matrix film franchise",
      tags: ["Vercel", "v0"],
      link: "https://free-your-mind.vercel.app",
      mediaUrl: "/neo-demo.mp4",
      mediaType: "video" as const
    },
    {
      title: "Project 2",
      description: "Description for project 2",
      tags: ["React", "Node.js"],
      link: "#",
      mediaUrl: "/project2.jpg",
      mediaType: "image" as const
    },
    // Add more projects as needed
  ];

  return (
    <section className={styles.projectsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Projects</h2>
        <p className={styles.description}>
          A collection of my recent work showcasing my skills and experience in web development.
        </p>
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 