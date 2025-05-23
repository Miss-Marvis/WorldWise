import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173,
		historyApiFallback: true, // <== Add this line
	},
	base: '/',
	resolve: {
		alias: {
			'@': '/src',
			'./Pricing.module.css': '/src/pages/pricing.module.css',
		},
	},
})
