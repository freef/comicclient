import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig.js'

class Rss extends Component {
  constructor () {
    super()
    this.state = {
      xml: false
    }
  }

  componentDidMount () {
    axios.get(apiUrl + '/rss')
      .then(response => this.setState({ xml: response.data }))
      .catch(console.log)
  }

  render () {
    console.log(this.state.xml)
    return (<span dangerouslySetInnerHTML={{ __html: `<xml ..>${this.state.xml}</xml>` }}/>)
  }
}

export default Rss
