import React from 'react'
// import { Link } from 'react-router-dom'
// import apiUrl from './apiConfig.js'

const SideBar = () => {
  return (
    <aside className='side-bar'>
      <div>
        <h3 className='side-bar-title'>Stuff to Read:</h3>
        <ul>
          <li><a className='side-bar-link' href='#' target='_blank'>Achewood</a></li>
          <li><a className='side-bar-link' href='#' target='_blank'>Three Panel Soul</a></li>
          <li><a className='side-bar-link' href='#' target='_blank'>Gunnerkrigg Court</a></li>
          <li><a className='side-bar-link' href='#' target='_blank'>XKCD</a></li>
          <li><a className='side-bar-link' href='#' target='_blank'>Paranatural</a></li>
          <li><a className='side-bar-link' href='#' target='_blank'>Power Nap</a></li>
          <li><a className='side-bar-link' href='#' target='_blank'>Space Mullet</a></li>
          <li><a className='side-bar-link' href='#' target='_blank'>Semi-Rad</a></li>
        </ul>
      </div>
    </aside>
  )
}

export default SideBar
