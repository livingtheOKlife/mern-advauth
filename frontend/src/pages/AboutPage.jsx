import MainContainer from '../components/layout/MainContainer'

function AboutPage () {
  return (
    <MainContainer page='about-page'>
      <h3>MERN Advanced Authentication Course</h3>
      <h4>JWT Authentication, Email Verification, Forgotten Passwords & More</h4>
      <span>From <a href="https://x.com/codesistency" target="_blank" rel="noopener noreferrer">Burak Orkmez</a></span>
      <p><em>Advanced MERN authentication using JWT and HTTP-Only cookies</em></p>
      <p>This is a starter app for a MERN stack application with authentication. This is for a SPA (Single Page Application) workflow that uses the Vite Build tool.</p>
      <p>Includes email verification and forgotten passwords for a more detailed dive into authentication with the MERN stack.</p>
    </MainContainer>
  )
}

export default AboutPage