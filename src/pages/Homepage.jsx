import PageNav from '../components/PageNav'
import styles from './Homepage.module.css'
import { Link } from 'react-router-dom'

export default function Homepage() {
	return (
		<main className={styles.homepage}>
			<PageNav className={styles.homeNav} />

			<section className={styles.homeSection}>
				<h1>You travel the world.</h1>
				<h1>WorldWise keeps track of your adventures.</h1>

				<p>
					A world map that tracks your footsteps into every city you can think
					of. Never forget your wonderful experiences, and show your friends how
					you have wandered the world.
				</p>

				<Link to='/login' className={styles.cta}>
					START TRACKING NOW
				</Link>
			</section>
		</main>
	)
}
