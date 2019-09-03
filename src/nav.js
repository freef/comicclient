import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  const navStyle = {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-around',
    maxWidth: '80%',
    padding: '2rem 0'
  }

  return (
    <nav style={navStyle} >
      <h1><Link to={'/'} > TITLE </Link> </h1>
      <h4><Link to={'/about'}>About</Link></h4>
      <h4><Link to={'/comics'}>Comics</Link></h4>
      <h4><Link to={'/blog'}>Blog</Link></h4>
    </nav>
  )
}

export default Nav
