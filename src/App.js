import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'
import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Comic from './Comic.js'
import Uploader from './Uploader.js'
import Nav from './nav.js'
import Rss from './rss.js'
import HireMe from './HireMe.js'
import Blog from './Blog.js'
import SideBar from './SideBar.js'
import Footer from './Footer.js'
import PrivacyPolicy from './PrivacyPolicy.js'
import { ComicProvider } from './ComicContext.js'

import Alert from 'react-bootstrap/Alert'
import './index.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })
  clearUser = () => this.setState({ user: null })
  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render() {
    const { alerts, user } = this.state
    return (
      <React.Fragment>
        <ComicProvider>
          {alerts.map((alert, index) => (
            <Alert key={index} dismissible variant={alert.type}>
              <Alert.Heading>{alert.message}</Alert.Heading>
            </Alert>
          ))}
          <main className="container">
            <Route path="/admin" render={() => <SignIn alert={this.alert} setUser={this.setUser} />} />
            <AuthenticatedRoute
              user={user}
              path="/sign-out"
              render={() => <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />}
            />
            <AuthenticatedRoute
              user={user}
              path="/change-password"
              render={() => <ChangePassword alert={this.alert} user={user} />}
            />
            <AuthenticatedRoute user={user} path="/upload" render={() => <Uploader user={user} />} />
            <Route path="/" render={() => <Nav />} />
            <Route exact path="/" component={Comic} />
            <Route exact path="/comics/:id" component={Comic} />
            <Route exact path="/feed" component={Rss} />
            <Route exact path="/comics" component={Comic} />
            <Route exact path="/privacypolicy" component={PrivacyPolicy} />
            <Route path="/" component={HireMe} />
            <section className="text-content">
              <Route exact path="/" component={Blog} />
              <Route exact path="/" component={SideBar} />
              <Route exact path="/blog/:id" component={Blog} />
              <Route exact path="/blog/" component={Blog} />
              <Route path="/blog" component={SideBar} />
            </section>
            <section>
              <Route path="/" component={Footer} />
            </section>
          </main>
        </ComicProvider>
      </React.Fragment>
    )
  }
}

export default App
