import React, { useContext } from 'react'
import ComicContext from './ComicContext.js'
import LoadingContext from './LoadingContext.js'

const Comic = () => {
  const cc = useContext(ComicContext)
  const lc = useContext(LoadingContext)
  return <p onClick={() => console.log(cc)}>{lc.loading ? 'Loading!' : cc.allComics[cc.comic].title}</p>
}

export default Comic
