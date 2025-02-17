import Scene from '@/components/Scene'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Scene />
      <div className={styles.content}>
        <h1 className={styles.title}>James Patterson</h1>
        <nav className={styles.navigation}>
          <a href="/projects">Projects</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </main>
  )
}
