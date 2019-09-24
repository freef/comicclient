import React, { Component, Fragment } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './apiConfig.js'

class Comic extends Component {
  constructor () {
    super()
    this.state = {
      comics: false,
      loading: true,
      currentComic: 0,
      all: false
    }
  }

  componentDidMount () {
    console.log(this.props)
    axios.get(apiUrl + '/comics')
      .then((response) => {
        this.setState({ comics: response.data.comics.reverse() })
        this.setState({ loading: false })
      })
      .then(() => this.setState({ currentComic: 0 }))
      .then(() => {
        const i = this.state.comics.findIndex((obj) => obj._id === this.props.match.params.id)
        if (i !== -1) { this.setState({ currentComic: i }) }
      })
      .catch((res) => {
        console.log(res)
      })
  }

  render () {
    const deadLink = {
      color: 'gray',
      textDecoration: 'none'
    }
    const liveLink = {
      color: 'deeppink',
      textDecoration: 'none',
      cursor: 'pointer'
    }

    const controlStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
    const onComic = (num) => {
      this.setState({ currentComic: num, all: false }, () => {
        this.props.history.push('/comics/' + this.state.comics[this.state.currentComic]._id)
      })
    }
    const onAll = () => this.setState({ all: !this.state.all })
    const nextComic = this.state.currentComic <= 0 ? <p style={deadLink}>Next</p> : <a style={liveLink} onClick={() => onComic(this.state.currentComic - 1)}>Next</a>
    const prevComic = this.state.currentComic >= this.state.comics.length - 1 ? <p style={deadLink}>Previous</p> : <a style={liveLink} onClick={() => onComic(this.state.currentComic + 1)}> Previous </a>
    const allComic = <p style={deadLink} onClick={onAll} > All Comics </p>
    const firstComic = <a style={liveLink} onClick={() => onComic(this.state.comics.length - 1)} >First </a>
    const lastComic = <a style={liveLink} onClick={() => onComic(0)} > Last </a>
    const comicNav = (
      <section style={controlStyle}>
        {firstComic}
        {prevComic}
        {allComic}
        {nextComic}
        {lastComic}
      </section>
    )
    const allComics = this.state.comics ? this.state.comics.map((item) => {
      return (
        <Fragment key={item._id}>
          <h2>{item.title}</h2>
          <img src={item.img} />
        </Fragment>)
    }).reverse() : <p></p>

    const c = this.state.comics[this.state.currentComic]
    const comic = (
      <Fragment>
        <h2>{this.state.comics ? c.title : 'Pending'}</h2>
        {this.state.comics ? <img src={c.img} /> : <p>Loading..</p>}
      </Fragment>
    )

    return (
      <Fragment>
        {this.state.all ? allComics : comic}
        {comicNav}
      </Fragment>
    )
  }
}

export default Comic
