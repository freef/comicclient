import React, { useState } from 'react'

const BlogContext = React.createContext({})

const BlogProvider = props => {
  const [allBlogs, setAllBlogs] = useState(false)
  const [blog, setBlog] = useState(false)
  return (
    <BlogContext.Provider value={{ blog, setBlog, allBlogs, setAllBlogs }}>
      {props.children}
    </BlogContext.Provider>
  )
}

export { BlogContext as default, BlogProvider }
