import React, { useState } from 'react'

const ComicContext = React.createContext({})

const ComicProvider = props => {
  const [allComics, setAllComics] = useState(false)
  const [comic, setComic] = useState(false)
  return (
    <ComicContext.Provider value={{ comic, setComic, allComics, setAllComics }}>
      {props.children}
    </ComicContext.Provider>
  )
}

export { ComicContext as default, ComicProvider }
