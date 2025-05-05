import React from 'react'
import styles from './Sidebar.module.css'
import Logo from './Logo'
import AppNav from './AppNav'
import { Outlet } from 'react-router-dom'

export default function Sidebar() {
	return (
		<div className={styles.Sidebar}>
			<Logo />
			<AppNav />
			<Outlet />

			<footer className={styles.footer}></footer>
			<p className={styles.copyright}>
				&copy; Copyright{new Date().getFullYear()} by WorldWise Inc
			</p>
		</div>
	)
}
