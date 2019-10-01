import React from 'react'
import { Link } from 'react-router-dom'
// import apiUrl from './apiConfig.js'

const Nav = () => {
  return (
    <nav className='main-nav' >
      <Link to={'/'} ><img className='main-logo' src='/temp_logo.png' alt='Flopsy & Bupp' /> </Link>
      <div className='main-nav-links' >
        <h4><Link className='main-nav-item' to={'/about'}>About</Link></h4>
        <h4><Link className='main-nav-item' to={'/comics'}>Archive</Link></h4>
        <h4><Link className='main-nav-item' to={'/blog'}>Blog</Link></h4>
        <h4><a className='main-nav-item' href='mailto:matt@flopsyandbupp.com' target='_blank' rel='noopener noreferrer'>Contact</a></h4>
        <h4><Link className='main-nav-item' to={'/feed'}>RSS</Link></h4>
      </div>
    </nav>
  )
}

export default Nav
