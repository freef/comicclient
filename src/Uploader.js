import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig.js'

class Uploader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        title: null,
        pubdate: null
      },
      blog: {
        title: null,
        pubdate: null,
        body: null
      },
      file: null,
      created: false
    }
  }

  handleFile = (event) => {
    event.preventDefault()
    this.setState({ file: event.target.files[0] })
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({ data: { ...this.state.data, [event.target.name]: event.target.value } })
  }

  handleBlogChange = (event) => {
    event.preventDefault()
    this.setState({ blog: { ...this.state.blog, [event.target.name]: event.target.value } })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.props.user.token)
    const formData = new FormData(event.target)
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      },
      contentType: false,
      processData: false
    }
    axios.post(`${apiUrl}/comics`, formData, config)
      .then(() => this.setState({ created: true }))
      .catch(console.log)
  }

  handleBlogSubmit = (event) => {
    event.preventDefault()
    console.log(this.props.user.token)
    const formData = new FormData(event.target)
    console.log(formData)
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    }
    axios.post(`${apiUrl}/blog`, formData, config)
      .then(() => this.setState({ created: true }))
      .catch(console.log)
  }

  render () {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit} type="file" accept="image/*" encType="multipart/form-data" id="uploadForm">
          <input name='title' type="text" onChange={this.handleChange} placeholder="title" />
          <input name='pubdate' type='date' onChange={this.handleChange} />
          <input name="image" type="file" onChange={this.handleFile} />
          <button type="submit">submit</button>
        </form>
        <p style={{ color: 'white' }}>{this.state.created}</p>
        <form onSubmit={this.handleBlogSubmit} id="blogForm">
          <input name='title' type="text" onChange={this.handleBlogChange} placeholder="title" />
          <input name='pubdate' type='date' onChange={this.handleBlogChange} />
          <input name="body" type="text" onChange={this.handleBlogChange} />
          <button type="submit">submit</button>
        </form>
        <p style={{ color: 'white' }}>{this.state.created}</p>
      </Fragment>
    )
  }
}

export default Uploader
