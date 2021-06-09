import React, { useState } from 'react'
const LoadingContext = React.createContext({})
const LoadingProvider = props => {
  const [loading, setLoading] = useState(true)
  return <LoadingContext.Provider value={{ loading, setLoading }}>{props.children}</LoadingContext.Provider>
}
export { LoadingContext as default, LoadingProvider }
