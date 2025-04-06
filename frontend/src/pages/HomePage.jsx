import { Link } from 'react-router-dom'

import MainContainer from '../components/layout/MainContainer'

function HomePage () {
  return (
    <MainContainer page='home-page'>
      <h2>MERN Authentication</h2>
      <p>This is a boilerplate for MERN authentication that stores a JWT in an HTTP-ONly cookie. It also uses Redux Toolkit and my own SASS library.</p>
      <div className="buttons">
        <Link to='/login' className={`btn md`} >Sign in</Link>
        <Link to='/register' className={`btn md`} >Sign up</Link>
      </div>
    </MainContainer>
  )
}

export default HomePage