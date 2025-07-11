import styles from './Map.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvent,
} from 'react-leaflet'
import { useState } from 'react'
import { useCities } from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeolocation'
import { useUrlPosition } from '../hooks/useUrlPosition'
import Button from './Button'
import PropTypes from 'prop-types'

export default function Map() {
	// const navigate = useNavigate()
	const { cities } = useCities()
	const [mapPosition, setMapPosition] = useState([40, 0])

	const {
		isLoading: isLoadingPosition,
		position: geolocationPosition,
		getPosition,
	} = useGeolocation()

	const [mapLat, mapLng] = useUrlPosition()

	useEffect(() => {
		if (mapLat !== null && mapLng !== null) {
			setMapPosition([mapLat, mapLng])
		}
	}, [mapLat, mapLng])

	useEffect(
		function () {
			if (geolocationPosition) {
				setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
			}
			console.log('Geolocation position:', geolocationPosition)
		},
		[geolocationPosition]
	)

	return (
		<div className={styles.mapContainer}>
			{!geolocationPosition && (
				<Button type='position' onClick={getPosition}>
					{isLoadingPosition ? 'Loading...' : 'use your position'}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				zoom={6}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				{cities.map((city) => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup>
							<span>{city.emoji}</span> <span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	)
}

function ChangeCenter({ position }) {
	const map = useMap()

	useEffect(() => {
		if (Array.isArray(position) && !position.some((v) => isNaN(v))) {
			map.setView(position)
		}
	}, [position, map])

	return null
}

// Add PropTypes validation
ChangeCenter.propTypes = {
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
}

function DetectClick() {
	const navigate = useNavigate()

	useMapEvent({
		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	})

	return null
}
