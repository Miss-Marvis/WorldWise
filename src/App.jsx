import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/FakeAuthContext'
import ProtectedRoute from './pages/ProtectedRoute'
import CityList from './components/CityList'
import City from './components/City'
import CountryList from './components/CountryList'
import Form from './components/Form'
import SpinnerFullPage from './components/SpinnerFullPage'

// Update these imports based on your actual file structure
const Homepage = lazy(() => import('./pages/Homepage'))
const Product = lazy(() => import('./pages/Product'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Login = lazy(() => import('./components/Login'))
const SignUp = lazy(() => import('./components/SignUp'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Suspense fallback={<SpinnerFullPage />}>
						<Routes>
							<Route index element={<Homepage />} />
							<Route path='/product' element={<Product />} />
							<Route path='/pricing' element={<Pricing />} />
							<Route path='/login' element={<Login />} />
							<Route path='/signup' element={<SignUp />} />
							<Route
								path='app'
								element={
									<ProtectedRoute>
										<AppLayout />
									</ProtectedRoute>
								}
							>
								<Route index element={<Navigate to='cities' replace />} />
								<Route path='cities/:id' element={<City />} />
								<Route path='cities' element={<CityList />} />
								<Route path='countries' element={<CountryList />} />
								<Route path='form' element={<Form />} />
							</Route>
							<Route path='*' element={<PageNotFound />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	)
}

export default App
