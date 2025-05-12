import React from 'react'
import { useState } from 'react'

import PageNav from './PageNav'

import { Link } from 'react-router-dom'

import styles from './login.module.css'
import { useAuth } from '../contexts/FakeAuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const { login, isAuthenticated } = useAuth()
	const navigate = useNavigate()

	function handleSubmit(e) {
		e.preventDefault()
		setError('')

		if (!email || !password) {
			setError('Please enter both email and password')
			return
		}

		const success = login(email, password)
		if (!success) {
			setError('Invalid email or password')
		}
	}

	useEffect(
		function () {
			if (isAuthenticated) navigate('/app', { replace: true })
		},
		[isAuthenticated, navigate]
	)

	return (
		<main className={styles.login}>
			<PageNav className={styles.productNav} />
			<form className={styles.form} onSubmit={handleSubmit}>
				<h2>Log in to your account</h2>

				{error && <p className={styles.error}>{error}</p>}

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

				<div>
					<button className={styles.btn}>Login</button>
				</div>

				<div className={styles.linkContainer}>
					<p>
						Don't have an account? <Link to='/signup'>Sign up</Link>
					</p>
				</div>
			</form>
		</main>
	)
}
