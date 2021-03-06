import React, { useState, Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './apiConfig.js'
import './index.scss'
import ComicContext from './ComicContext.js'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  RedditIcon,
  RedditShareButton
} from 'react-share'
import LazyLoad from 'react-lazyload'

const Comic = props => {
  

  const [comics, setComics] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentComic, setCurrentComic] = useState(false)
  const [all, setAll] = useState(false)
  // component mounts
  // if route is home > redirect to most recent comic

  useEffect(()=>{
    props.match.path === '/comics' ? setAll(true ) : setAll( false )
    // get request
    axios.get(apiUrl + '/comics')
      .then(response => {
        setComics( response.data.comics.reverse())
        setLoading( false )
      })
      .then(() => setCurrentComic(0))
      .then(() => {
        const i = comics.findIndex(obj => obj._id === props.match.params.id)
        if (i !== -1) {
          setCurrentComic( i )
        }
      })
      .catch(res => {
        console.log(res)
      })
  })

  // componentDidMount () {
  //   console.log(this.props)
  //   this.props.match.path === '/comics' ? this.setState({ all: true }) : this.setState({ all: false })
  //   axios.get(apiUrl + '/comics')
  //     .then((response) => {
  //       this.setState({ comics: response.data.comics.reverse() })
  //       this.setState({ loading: false })
  //     })
  //     .then(() => this.setState({ currentComic: 0 }))
  //     .then(() => {
  //       const i = this.state.comics.findIndex((obj) => obj._id === this.props.match.params.id)
  //       if (i !== -1) { this.setState({ currentComic: i }) }
  //     })
  //     .catch((res) => {
  //       console.log(res)
  //     })
  // }

    const onComic = num => {
      setCurrentComic( num)
      setAll(false), () => {
        this.props.history.push('/comics/' + this.state.comics[this.state.currentComic]._id)
      })
    }
    const onAll = () => this.setState({ all: !this.state.all })
    const nextComic =
      this.state.currentComic <= 0 ? (
        <p className="dead-link pink">Next</p>
      ) : (
        <p className="comic-control-item" onClick={() => onComic(this.state.currentComic - 1)}>
          Next
        </p>
      )
    const prevComic =
      this.state.currentComic >= this.state.comics.length - 1 ? (
        <p className="dead-link">Previous</p>
      ) : (
        <p className="comic-control-item" onClick={() => onComic(this.state.currentComic + 1)}>
          {' '}
          Previous{' '}
        </p>
      )
    const allComic = (
      <p className="comic-control-item" onClick={onAll}>
        {' '}
        {this.state.all ? 'Single Comic' : 'All Comics'}{' '}
      </p>
    )
    const firstComic =
      this.state.currentComic >= this.state.comics.length - 1 ? (
        <p className="dead-link">First</p>
      ) : (
        <p className="comic-control-item" onClick={() => onComic(this.state.comics.length - 1)}>
          First{' '}
        </p>
      )
    const lastComic =
      this.state.currentComic <= 0 ? (
        <p className="dead-link">Last</p>
      ) : (
        <p className="comic-control-item" onClick={() => onComic(0)}>
          {' '}
          Last{' '}
        </p>
      )
    const comicNav = this.state.all ? (
      <section className="comic-control">{allComic}</section>
    ) : (
      <section className="comic-control">
        {firstComic}
        {prevComic}
        {allComic}
        {nextComic}
        {lastComic}
      </section>
    )
    const allComics = this.state.comics ? (
      this.state.comics
        .map(item => {
          return (
            <Fragment key={item._id}>
              <div className="comic-title-bar">
                <h2>
                  <Link
                    className="comic-title comic-title-link"
                    onClick={() => this.setState({ all: false })}
                    to={'/comics/' + item._id}>
                    {item.title}
                  </Link>
                </h2>
                <div className="comic-date">
                  <p>{new Date(item.pubdate).toDateString()}</p>
                </div>
                <div className="social-share">
                  <FacebookShareButton
                    className="social-button"
                    url={'http://localhost:7165/#/comics/' + item._id}>
                    {' '}
                    <FacebookIcon size={32} round />{' '}
                  </FacebookShareButton>
                  <TwitterShareButton
                    className="social-button"
                    url={'http://localhost:7165/#/comics/' + item._id}>
                    {' '}
                    <TwitterIcon size={32} round />{' '}
                  </TwitterShareButton>
                  <RedditShareButton
                    className="social-button"
                    url={'http://localhost:7165/#/comics/' + item._id}>
                    {' '}
                    <RedditIcon size={32} round />{' '}
                  </RedditShareButton>
                </div>
              </div>
              <LazyLoad>
                <img className="comic-img" src={item.img} />
              </LazyLoad>
            </Fragment>
          )
        })
        .reverse()
    ) : (
      <p></p>
    )

    const c = comics[currentComic]
    const comic = (
      <Fragment>
        <div className="comic-title-bar">
          <h2 className="comic-title">{this.state.comics ? c.title : 'Pending'}</h2>
          <div className="comic-date">
            {this.state.comics ? <p>{new Date(c.pubdate).toDateString()}</p> : <p></p>}
          </div>
          <div className="social-share">
            <FacebookShareButton
              className="social-button comic-control-item"
              url={this.state.comics ? 'http://localhost:7165/#/comics/' + c._id : '#'}>
              {' '}
              <FacebookIcon size={32} round />{' '}
            </FacebookShareButton>
            <TwitterShareButton
              className="social-button comic-control-item"
              url={this.state.comics ? 'http://localhost:7165/#/comics/' + c._id : '#'}>
              {' '}
              <TwitterIcon size={32} round />{' '}
            </TwitterShareButton>
            <RedditShareButton
              className="social-button comic-control-item"
              url={this.state.comics ? 'http://localhost:7165/#/comics/' + c._id : '#'}>
              {' '}
              <RedditIcon size={32} round />{' '}
            </RedditShareButton>
          </div>
        </div>
        {this.state.comics ? <img className="comic-img" src={c.img} /> : <p>Loading..</p>}
      </Fragment>
    )

    return (
      <div className="comic">
        {this.state.all ? allComics : comic}
        {comicNav}
      </div>
    )
  }
}

export default Comic
