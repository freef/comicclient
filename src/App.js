import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './apiConfig.js'
import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Comic from './Comic.js'
import Uploader from './Uploader.js'
import Nav from './nav.js'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: [],
      comics: false,
      loading: true
    }
  }

  componentDidMount () {
    axios.get(apiUrl + '/comics')
      .then((response) => {
        this.setState({ comics: response.data.comics })
        this.setState({ loading: false })
      })
      .catch((res) => {
        console.log(res)
      })
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route path='/admin' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/upload' render={() => (<Uploader user={user} />)} />
          <Route path='/' render={() => (<Nav />)} />
          <Route exact path='/' render={() => (this.state.comics ? <Comic all={false} comic={this.state.comics[0]} current={0} next={this.state.comics[1]._id} /> : <div>wait</div>)} />
          <Route exact path='/comics/:id' render={({ match }) => {
            const current = this.state.comics ? this.state.comics.findIndex((element) => (element._id === match.params.id)) : undefined
            return (this.state.comics ? <Comic all={false} comic={this.state.comics[current]} previous={current - 1 >= 0 ? this.state.comics[current - 1]._id : false } next={current + 1 >= this.state.comics.length ? false : this.state.comics[current + 1]._id} /> : <div>loading</div>)
          }} />
          <Route exact path='/comics' render={() => {
            const allComics = (<React.Fragment>
              {this.state.comics ? this.state.comics.map((comic) => (<Comic first={this.state.comics[this.state.comics.length - 1]} last={this.state.comics[0]} comic={comic} key={comic._id} all={true} previous={false} next={false} />)) : <p>loading</p>}
            </React.Fragment>)
            return (allComics)
          }} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
