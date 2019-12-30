import React, { useContext, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './apiConfig.js'
import './index.scss'
import ComicContext from './ComicContext.js'
// import {
//   FacebookShareButton,
//   FacebookIcon,
//   TwitterIcon,
//   TwitterShareButton,
//   RedditIcon,
//   RedditShareButton
// } from 'react-share'
// import LazyLoad from 'react-lazyload'

const Comic = props => {
  const cc = useContext(ComicContext)

  useEffect(() => {
    // props.match.path === '/comics' ? setAll(true) : setAll(false)
    // get request
    axios
      .get(apiUrl + '/comics')
      .then(response => {
        cc.setAllComics(response.data.comics.reverse())
      })
      .then(() => cc.setComic(0))
      .then(() => {
        const i = comics.findIndex(obj => obj._id === props.match.params.id)
        if (i !== -1) {
          setCurrentComic(i)
        }
      })
      .catch(res => {
        console.log(res)
      })
  })
  return <h1>comic</h1>
}
export default Comic
