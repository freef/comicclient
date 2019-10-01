import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig.js'
// import { Link } from 'react-router-dom'
// import apiUrl from './apiConfig.js'

class Blog extends Component {
  constructor () {
    super()
    this.state = {
      blogs: false,
      loading: true,
      currentBlog: 0
    }
  }
  componentDidMount () {
    axios.get(apiUrl + '/blog')
      .then((response) => {
        console.log(response.data)
        this.setState({ blogs: response.data.blogs.reverse() })
        this.setState({ loading: false })
      })
      .then(() => this.setState({ currentBlog: 0 }))
      .then(() => {
        const i = this.state.blogs.findIndex((obj) => obj._id === this.props.match.params.id)
        if (i !== -1) { this.setState({ currentBlog: i }) }
      })
      .catch((res) => {
        console.log(res)
      })
  }

  render () {
    const b = this.state.blogs[this.state.currentBlog]
    const onBlog = (num) => {
      this.setState({ currentBlog: num, all: false }, () => {
        this.props.history.push('/blog/' + this.state.blogs[this.state.currentBlog]._id)
      })
    }
    const nextBlog = this.state.currentBlog <= 0 ? <p className='dead-link pink'>Next</p> : <p className='comic-control-item' onClick={() => onBlog(this.state.currentBlog - 1)}>Next</p>
    const prevBlog = this.state.currentBlog >= this.state.blogs.length - 1 ? <p className='dead-link'>Previous</p> : <p className='comic-control-item' onClick={() => onBlog(this.state.currentBlog + 1)}> Previous </p>
    const firstBlog = this.state.currentBlog >= this.state.blogs.length - 1 ? <p className='dead-link'>First</p> : <p className='comic-control-item' onClick={() => onBlog(this.state.blogs.length - 1)} >First </p>
    const lastBlog = this.state.currentBlog <= 0 ? <p className='dead-link'>Last</p> : <p className='comic-control-item' onClick={() => onBlog(0)} > Last </p>
    const blogNav = (
      <section className='comic-control'>
        {firstBlog}
        {prevBlog}
        {nextBlog}
        {lastBlog}
      </section>
    )
    return (
      <div className='blog'>
        <h1 className='blog-title'>Blogs</h1>
        {this.state.blogs
          ? <Fragment>
            <div className='blog-post-header'>
              <h2 className='blog-post-title' >{b.title}</h2>
              <p>{new Date(b.pubdate).toDateString()}</p>
            </div>
            <hr className='blog-hr' />
            <p className='blog-body'>{b.body}</p>
            {this.state.blogs ? blogNav : <p></p>}
          </Fragment> : <h2 className='blog-post-title'> Loading Blogs...</h2>}
      </div>
    )
  }
}

export default Blog
