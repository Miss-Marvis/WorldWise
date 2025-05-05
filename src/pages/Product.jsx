import PageNav from '../components/PageNav'
import styles from './Product.module.css'

export default function Product() {
	return (
		<main className={styles.product}>
			<PageNav className={styles.productNav} />
			<section>
				<img src='/Man.jpg' alt='Person standing on mountain at sunset' />
				<div>
					<h2>About WorldWide.</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo sed
						dicta illum vel culpa cum quaerat architecto sapiente alias non
						soluta, molestiae nisi laborum, placeat debitis, blanditiis et fugit
						perspiciatis? Lorem ipsum dolor sit amet consectetur adipisicing
						elit. Quasi aut corrupti doloribus. Numquam itaque iste, debitis
						explicabo, sapiente ipsum perferendis ipsa cumque unde pariatur cum
						facere libero tempore nisi sequi?
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
						dolores illum sunt expedita ratione iusto, magni id sapiente sequi
						officia et. Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Itaque, vero facilis totam maiores iusto saepe?
					</p>
				</div>
			</section>
		</main>
	)
}
