import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Comic = ({ all, comic, previous, next, first }) => {
  const deadLink = {
    color: 'gray',
    textDecoration: 'none'
  }

  const controlStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }

  const nextComic = next ? <Link to={'/comics/' + next} >Next</Link> : <p style={deadLink}>Next</p>
  const prevComic = previous ? <Link to={'/comics/' + previous} > Previous </Link> : <p style={deadLink}>Previous</p>
  const allComic = !all ? <Link to={'/comics'} > All Comics </Link> : <p style={deadLink} > All Comics </p>
  const title = !all ? <h2>{comic.title}</h2> : <Link to={'/comics/' + comic._id}><h2>{comic.title}</h2></Link>
  const firstComic = comic._id !== first ? <Link to={'comics/' + first}> First </Link> : <p style={deadLink}>First</p>

  return (
    <Fragment>
      {title}
      <img src={comic.img} />
      <section style={controlStyle}>
        <div>
          {prevComic} {firstComic}
        </div>
        <div>
          {allComic}
        </div>
        <div>
          {nextComic}
        </div>
      </section>
    </Fragment>
  )
}

export default Comic
