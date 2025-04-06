import { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import MenuContext from '../../context/menu/MenuContext'

import MenuBtn from '../MenuBtn'

function HeaderContainer () {
  const { setMenuInactive } = useContext(MenuContext)
  const navigate = useNavigate()
  const location = useLocation()
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }
  const logoutHandler = async () => {}
  return (
    <header id="header-container">
      <nav id="main-nav">
        <Link to='/' onClick={setMenuInactive}>
          <span className="logo"><em>MERN</em>advauth</span>
        </Link>
        <ul className="main-nav-list">
          {
            !pathMatchRoute('/verify-email') &&
              <li className="main-nav-item" onClick={() => {
                navigate('/verify-email')
                setMenuInactive()
              }}>Verify Account</li>
          }{
            !pathMatchRoute('/profile') &&
              <li className="main-nav-item" onClick={() => {
                navigate('/profile')
                setMenuInactive()
              }}>Profile</li>
          }
          {
            !pathMatchRoute('/login') &&
              <li className="main-nav-item" onClick={() => {
                navigate('/login')
                setMenuInactive()
              }}>Sign in</li>
          }
          {
            !pathMatchRoute('/register') &&
              <li className="main-nav-item" onClick={() => {
                navigate('/register')
                setMenuInactive()
              }}>Sign up</li>
          }
          {
            !pathMatchRoute('/about') &&
              <li className="main-nav-item" onClick={() => {
                navigate('/about')
                setMenuInactive()
              }}>About</li>
          }
          <li className="main-nav-item" onClick={() => {
            logoutHandler()
            setMenuInactive()
          }}>Logout</li>
        </ul>
        <MenuBtn />
      </nav>
    </header>
  )
}

export default HeaderContainer