import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import PageNav from './PageNav' // Adjust the import path based on your folder structure
import { useAuth } from '../contexts/FakeAuthContext'
import styles from './login.module.css' // Reusing login styles

export default function SignUp() {
	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')

	const { signup } = useAuth()
	const navigate = useNavigate()

	function handleSubmit(e) {
		e.preventDefault()
		setError('')

		// Form validation
		if (!fullName || !email || !password || !confirmPassword) {
			setError('Please fill in all fields')
			return
		}

		if (password !== confirmPassword) {
			setError('Passwords do not match')
			return
		}

		if (password.length < 6) {
			setError('Password must be at least 6 characters long')
			return
		}

		// Attempt signup
		const success = signup(fullName, email, password)

		if (success) {
			// Redirect to login page after successful signup
			navigate('/login', { replace: true })
		} else {
			setError('Email already in use. Please try another email.')
		}
	}

	return (
		<main className={styles.login}>
			<PageNav className={styles.productNav} />
			<form className={styles.form} onSubmit={handleSubmit}>
				<h2>Create your account</h2>

				{error && <p className={styles.error}>{error}</p>}

				<div className={styles.row}>
					<label htmlFor='fullName'>Full Name</label>
					<input
						type='text'
						id='fullName'
						onChange={(e) => setFullName(e.target.value)}
						value={fullName}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor='email'>Email address</label>
					<input
						type='email'
						id='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor='confirmPassword'>Confirm Password</label>
					<input
						type='password'
						id='confirmPassword'
						onChange={(e) => setConfirmPassword(e.target.value)}
						value={confirmPassword}
					/>
				</div>

				<div>
					<button className={styles.btn}>Sign Up</button>
				</div>

				<div className={styles.linkContainer}>
					<p>
						Already have an account? <Link to='/login'>Log in</Link>
					</p>
				</div>
			</form>
		</main>
	)
}
