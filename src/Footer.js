import React from 'react'
import { Link } from 'react-router-dom'
// import apiUrl from './apiConfig.js'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className='footer'>
      <hr />
      <div className='footer-content'>
        <p>Copyright 2019 - {year} by Matt Freeland</p>
        <p><Link className='blue-link' to='/privacypolicy'>Privacy Policy</Link></p>
        <p><a className='blue-link' href='mailto:matt@flopsyandbupp.com' rel='noopener noreferrer' target='_blank'>Contact</a></p>
      </div>
    </footer>
  )
}

export default Footer
