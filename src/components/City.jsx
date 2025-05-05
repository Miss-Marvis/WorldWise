import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { useCities } from '../contexts/CitiesContext'
import Spinner from '../components/Spinner'
import styles from './City.module.css'
import BackButton from './BackButton'
// import Button from './Button'

const formatDate = (date) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'long',
	}).format(new Date(date))

function City() {
	const { id } = useParams()
	const { getCity, currentCity, isLoading } = useCities()

	useEffect(
		function () {
			console.log('Getting city with id:', id)
			getCity(id)
		},
		[id, getCity]
	)

	if (isLoading) return <Spinner />

	if (!currentCity.cityName) return <Spinner />

	const { cityName, emoji, date, notes, position } = currentCity

	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					<span>{emoji}</span> {cityName}
				</h3>
			</div>

			{position && (
				<div className={styles.row}>
					<h6>Position</h6>
					<p>
						{position.lat}, {position.lng}
					</p>
				</div>
			)}

			<div className={styles.row}>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date)}</p>
			</div>

			{notes && (
				<div className={styles.row}>
					<h6>Your notes</h6>
					<p>{notes}</p>
				</div>
			)}

			<div className={styles.row}>
				<h6>Learn more</h6>
				<a
					href={`https://en.wikipedia.org/wiki/${cityName}`}
					target='_blank'
					rel='noreferrer'
				>
					Check out {cityName} on Wikipedia &rarr;
				</a>
			</div>
			<div className={styles.buttons}>
				<BackButton />
			</div>
		</div>
	)
}

export default City
