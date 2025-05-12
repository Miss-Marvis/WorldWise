import { Children, useContext } from 'react'
import { createContext, useReducer } from 'react'

// import { useContext } from 'react'
import { useEffect } from 'react'

import avatarImage from '/src/avater.png'

const AuthContext = createContext()

// Define FAKE_USER first before using it
const FAKE_USER = {
	name: 'Jack',
	email: 'jack@example.com',
	password: 'Qwerty',
	avatar: avatarImage,
}

// Check localStorage for registered users
const getRegisteredUsers = () => {
	const storedUsers = localStorage.getItem('worldWiseUsers')
	return storedUsers ? JSON.parse(storedUsers) : [FAKE_USER]
}

// Check if there's saved auth state in localStorage
const storedUser = localStorage.getItem('worldWiseUser')
const storedAuth = localStorage.getItem('worldWiseAuth')

const initialState = {
	user: storedUser ? JSON.parse(storedUser) : null,
	isAuthenticated: storedAuth ? JSON.parse(storedAuth) : false,
	registeredUsers: getRegisteredUsers(),
}

function reducer(state, action) {
	switch (action.type) {
		case 'login':
			// Save to localStorage when logging in
			localStorage.setItem('worldWiseUser', JSON.stringify(action.payload))
			localStorage.setItem('worldWiseAuth', JSON.stringify(true))
			return { ...state, user: action.payload, isAuthenticated: true }
		case 'logout':
			// Remove from localStorage when logging out
			localStorage.removeItem('worldWiseUser')
			localStorage.removeItem('worldWiseAuth')
			return { ...state, user: null, isAuthenticated: false }
		case 'signup':
			// Add new user to registered users
			const updatedUsers = [...state.registeredUsers, action.payload]
			localStorage.setItem('worldWiseUsers', JSON.stringify(updatedUsers))
			return { ...state, registeredUsers: updatedUsers }
		default:
			throw new Error('Unknown action')
	}
}

function AuthProvider({ children }) {
	const [{ user, isAuthenticated, registeredUsers }, dispatch] = useReducer(
		reducer,
		initialState
	)

	function login(email, password) {
		// Find user in registered users
		const user = registeredUsers.find(
			(user) => user.email === email && user.password === password
		)

		if (user) {
			dispatch({ type: 'login', payload: user })
			return true
		}

		return false
	}

	function logout() {
		dispatch({ type: 'logout' })
	}

	function signup(fullName, email, password) {
		// Check if email already exists
		const emailExists = registeredUsers.some((user) => user.email === email)

		if (emailExists) {
			return false
		}

		// Create new user
		const newUser = {
			name: fullName,
			email,
			password,
			avatar: avatarImage, // Default avatar for new users
		}

		dispatch({ type: 'signup', payload: newUser })
		return true
	}

	// Save registered users to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem('worldWiseUsers', JSON.stringify(registeredUsers))
	}, [registeredUsers])

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, login, logout, signup }}
		>
			{children}
		</AuthContext.Provider>
	)
}

function useAuth() {
	const context = useContext(AuthContext)
	if (context === undefined)
		throw new Error('AuthContext was used outside AuthProvider')
	return context
}

export { AuthProvider, useAuth }
