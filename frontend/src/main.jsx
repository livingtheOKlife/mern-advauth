import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'

import './index.css'
import App from './App.jsx'

import { AlertProvider } from './context/alert/AlertContext'
import { MenuProvider } from './context/menu/MenuContext'

import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import NewPasswordPage from './pages/NewPasswordPage'
import PageNotFoundPage from './pages/PageNotFoundPage'
import AboutPage from './pages/AboutPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index path='/' element={<HomePage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/verify-email' element={<VerifyEmailPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      <Route path='/new-password' element={<NewPasswordPage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/page-not-found' element={<PageNotFoundPage />} />
      <Route path='/*' element={<Navigate to="/page-not-found" replace />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AlertProvider>
      <MenuProvider>
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>
      </MenuProvider>
    </AlertProvider>
  </Provider>,
)
