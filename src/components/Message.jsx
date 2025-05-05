import styles from './Message.module.css'

// import React from 'react'

export default function Message({ message }) {
	return (
		<p className={styles.message}>
			<span role='img'>🤚</span> {message}
		</p>
	)
}
