import { NavLink } from 'react-router-dom'
import styles from './PageNav.module.css'
import Logo from './Logo'

export default function PageNav({ className = '' }) {
	return (
		<nav className={`${styles.nav} ${className}`}>
			<Logo />
			<ul className={styles.navLinks}>
				<li>
					<NavLink to='/pricing'>Pricing</NavLink>
				</li>
				<li>
					<NavLink to='/product'>Product</NavLink>
				</li>
				<li>
					<NavLink to='/login' className={styles.ctaLink}>
						Login
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}
