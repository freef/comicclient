import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig.js'
import LoadingContext from './LoadingContext.js'
const ComicContext = React.createContext({})

const ComicProvider = props => {
  const [allComics, setAllComics] = useState(false)
  const [comic, setComic] = useState(false)
  const lc = useContext(LoadingContext)
  useEffect(() => {
    axios
      .get(apiUrl + '/comics')
      .then(response => {
        setAllComics(response.data.comics.reverse())
      })
      .then(() => setComic(0))
      .then(() => console.log(props))
      .then(() => lc.setLoading(false))
      // .then(() => {
      //   const i = cc.allComics.findIndex(obj => obj._id === props.match.params.id)
      //   if (i !== -1) {
      //     cc.setComic(i)
      //   }
      // })
      .catch(res => {
        console.log(res)
      })
  }, [])

  return (
    <ComicContext.Provider value={{ comic, setComic, allComics, setAllComics }}>
      {props.children}
    </ComicContext.Provider>
  )
}

export { ComicContext as default, ComicProvider }
