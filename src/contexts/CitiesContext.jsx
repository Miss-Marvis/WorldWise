import {
	useEffect,
	createContext,
	useContext,
	useReducer,
	useCallback,
} from 'react'
import PropTypes from 'prop-types'

const isDevelopment =
	window.location.hostname === 'localhost' ||
	window.location.hostname === '127.0.0.1' ||
	window.location.port === '3000' ||
	window.location.hostname.includes('dev')

const BASE_URL = isDevelopment ? 'http://localhost:9000' : null

const CitiesContext = createContext()

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: '',
}

function reducer(state, action) {
	switch (action.type) {
		case 'loading':
			return { ...state, isLoading: true }
		case 'cities/loaded':
			return {
				...state,
				isLoading: false,
				cities: action.payload,
			}
		case 'city/loaded':
			return { ...state, isLoading: false, currentCity: action.payload }
		case 'city/created':
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			}
		case 'city/deleted':
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter((city) => city.id !== action.payload),
				currentCity: {},
			}
		case 'rejected':
			return {
				...state,
				isLoading: false,
				error: action.payload,
			}
		default:
			throw new Error('unknown action type')
	}
}

function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
		reducer,
		initialState
	)

	useEffect(function () {
		fetchCities()
	}, [])

	// Helper function to get cities from localStorage
	const getCitiesFromLocalStorage = () => {
		try {
			const stored = localStorage.getItem('worldwise-cities')
			return stored ? JSON.parse(stored) : []
		} catch {
			return []
		}
	}

	// Helper function to save cities to localStorage
	const saveCitiesToLocalStorage = (cities) => {
		try {
			localStorage.setItem('worldwise-cities', JSON.stringify(cities))
		} catch (error) {
			console.warn('Failed to save cities to localStorage:', error)
		}
	}

	async function fetchCities() {
		dispatch({ type: 'loading' })
		try {
			let data = []

			if (BASE_URL) {
				// Development: fetch from backend
				const res = await fetch(`${BASE_URL}/cities`)
				data = await res.json()
			} else {
				// Production: try to fetch from public folder, fallback to localStorage
				try {
					const res = await fetch('/cities.json')
					const jsonData = await res.json()
					data = jsonData.cities || jsonData
				} catch {
					// If public JSON fails, use localStorage or default data
					data = getCitiesFromLocalStorage()
					if (data.length === 0) {
						// Default demo data if nothing exists
						data = [
							{
								id: 'demo1',
								cityName: 'Lagos',
								country: 'Nigeria',
								emoji: '🇳🇬',
								date: '2025-01-01T12:00:00.000Z',
								notes: 'Amazing city! (Demo data)',
								position: { lat: 6.5244, lng: 3.3792 },
							},
							{
								id: 'demo2',
								cityName: 'London',
								country: 'United Kingdom',
								emoji: '🇬🇧',
								date: '2025-01-02T12:00:00.000Z',
								notes: 'Historic city! (Demo data)',
								position: { lat: 51.5074, lng: -0.1278 },
							},
						]
					}
				}
			}

			dispatch({ type: 'cities/loaded', payload: data })
		} catch (err) {
			dispatch({
				type: 'rejected',
				payload: 'There was an error loading cities data...',
			})
		}
	}

	const getCity = useCallback(
		async function getCity(id) {
			if (Number(id) === currentCity.id || id === currentCity.id) return

			dispatch({ type: 'loading' })
			try {
				let data = null

				if (BASE_URL) {
					// Development: fetch from backend
					const res = await fetch(`${BASE_URL}/cities/${id}`)
					if (!res.ok) throw new Error('City not found')
					data = await res.json()
				} else {
					// Production: find in current cities array
					data = cities.find((city) => city.id === id || city.id === Number(id))
					if (!data) throw new Error('City not found')
				}

				dispatch({ type: 'city/loaded', payload: data })
			} catch (err) {
				dispatch({
					type: 'rejected',
					payload: 'There was an error loading city',
				})
			}
		},
		[currentCity.id, cities, BASE_URL]
	)

	async function createCity(newCity) {
		dispatch({ type: 'loading' })
		try {
			let data = newCity

			if (BASE_URL) {
				// Development: post to backend
				const res = await fetch(`${BASE_URL}/cities`, {
					method: 'POST',
					body: JSON.stringify(newCity),
					headers: {
						'Content-Type': 'application/json',
					},
				})
				if (!res.ok) throw new Error('Failed to create city')
				data = await res.json()
			} else {
				// Production: add to localStorage
				data = { ...newCity, id: Date.now().toString() }
				const updatedCities = [...cities, data]
				saveCitiesToLocalStorage(updatedCities)
			}

			dispatch({ type: 'city/created', payload: data })
		} catch {
			dispatch({
				type: 'rejected',
				payload: 'There was an error creating the city',
			})
		}
	}

	async function deleteCity(id) {
		dispatch({ type: 'loading' })
		try {
			if (BASE_URL) {
				// Development: delete from backend
				await fetch(`${BASE_URL}/cities/${id}`, {
					method: 'DELETE',
				})
			} else {
				// Production: remove from localStorage
				const updatedCities = cities.filter((city) => city.id !== id)
				saveCitiesToLocalStorage(updatedCities)
			}

			dispatch({ type: 'city/deleted', payload: id })
		} catch {
			dispatch({
				type: 'rejected',
				payload: 'There was an error deleting the city',
			})
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				error,
				getCity,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	)
}

function useCities() {
	const context = useContext(CitiesContext)
	if (context === undefined)
		throw new Error('CitiesContext was used outside the CitiesProvider')
	return context
}

CitiesProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

export { CitiesProvider, useCities }
