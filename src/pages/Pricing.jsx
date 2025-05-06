// import React from 'react'
import styles from './pricing.module.css'
import PageNav from '../components/PageNav'

function Pricing() {
	return (
		<main className={styles.pricingPage}>
			<PageNav className={styles.productNav} />
			<section>
				<div>
					<h2>
						Simple Pricing.
						<br /> Just $9/month.
					</h2>

					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
						dolores illum sunt expedita ratione iusto, magni id sapiente sequi
						officia et. Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Itaque, vero facilis totam maiores iusto saepe?
					</p>
				</div>
				<img
					src='/Mountain.jpg'
					alt='Person standing on mountain with sunset'
				/>
			</section>
		</main>
	)
}

export default Pricing
