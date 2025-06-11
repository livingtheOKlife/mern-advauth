import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { useLogoutMutation } from '../../slices/authApiSlice'
import { clearCredentials } from '../../slices/authSlice'

import { FaArrowRightFromBracket, FaArrowRightToBracket, FaBookOpenReader, FaEnvelope, FaSignature, FaUser, FaX } from 'react-icons/fa6'

import MenuContext from '../../context/menu/MenuContext'
import AlertContext from '../../context/alert/AlertContext'

const MenuContainer = () => {
  const { menu, setMenuInactive } = useContext(MenuContext)
  const { setAlertActive } = useContext(AlertContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [logout] = useLogoutMutation()
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }
  const logoutHandler = async () => {
    try {
      await logout()
      dispatch(clearCredentials())
      setMenuInactive()
      navigate('/')
    } catch (error) {
      setAlertActive(`Log out failed - ${error.message}`, 'error')
    }
  }
  return menu !== null &&
    <aside id='menu-container'>
      <nav id="menu-nav">
        <ul className="menu-nav-list">
          {
            !pathMatchRoute('/profile') &&
              <li className="menu-nav-item" onClick={() => {
                navigate('/profile')
                setMenuInactive()
              }}>
                'Profile'
                <FaUser />
              </li>
          }
          {
            !pathMatchRoute('/login') &&
              <li className="menu-nav-item" onClick={() => {
                navigate('/login')
                setMenuInactive()
              }}>
                Sign in
                <FaArrowRightToBracket />
              </li>
          }
          {
             !pathMatchRoute('/register') &&
              <li className="menu-nav-item" onClick={() => {
                navigate('/register')
                setMenuInactive()
              }}>
                Sign up
                <FaSignature />
              </li>
          }
          {
             !pathMatchRoute('/verify-email') &&
              <li className="menu-nav-item" onClick={() => {
                navigate('/verify-email')
                setMenuInactive()
              }}>
                Verify email
                <FaEnvelope />
              </li>
          }
          {
             !pathMatchRoute('/forgot-password') &&
              <li className="menu-nav-item" onClick={() => {
                navigate('/forgot-password')
                setMenuInactive()
              }}>
                Forgot password
              </li>
          }
          {
             !pathMatchRoute('/new-password') &&
              <li className="menu-nav-item" onClick={() => {
                navigate('/new-password')
                setMenuInactive()
              }}>
                New password
              </li>
          }
          {
            !pathMatchRoute('/about') &&
              <li className="menu-nav-item" onClick={() => {
                navigate('/about')
                setMenuInactive()
              }}>
                About
                <FaBookOpenReader />
              </li>
          }
          <li className="menu-nav-item" onClick={logoutHandler}>
            Logout
            <FaArrowRightFromBracket />
          </li>
        </ul>
        <button type="button" onClick={setMenuInactive}>
          Close
          <FaX />
        </button>
      </nav>
    </aside>
}

export default MenuContainer