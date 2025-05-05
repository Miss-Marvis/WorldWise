import { Children, useContext } from 'react'
import { createContext, useReducer } from 'react'

import avatarImage from '/public/avater.png'

const AuthContext = createContext()

const initialState = {
	user: null,
	isAuthenticated: false,
}
function reducer(state, action) {
	switch (action.type) {
		case 'login':
			return { ...state, user: action.payload, isAuthenticated: true }
		case 'logout':
			return { ...state, user: null, isAuthenticated: false }
		default:
			throw new Error('Unknown action')
	}
}
const FAKE_USER = {
	name: 'Jack',
	email: 'jack@example.com',
	password: 'Qwerty',
	avater: avatarImage,
}

function AuthProvider({ children }) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState
	)

	function login(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password)
			dispatch({ type: 'login', payload: FAKE_USER })
		console.log('Attempting login', email, password)
	}

	function logout() {
		dispatch({ type: 'logout' })
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

function useAuth() {
	const context = useContext(AuthContext)
	if (context === undefined)
		throw new Error('Authcontext was used outside AuthProvider')
	return context
}

export { AuthProvider, useAuth }
