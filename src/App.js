import React, { Component } from 'react'
import { ComicProvider } from './Components/ComicContext.js'
import { BlogProvider } from './Components/BlogContext.js'
import { LoadingProvider } from './Components/LoadingContext.js'
import Header from './Components/Header.js'
import Comic from './Components/Comic.js'
import Blog from './Components/Blog.js'
import Footer from './Components/Footer.js'
import './css/index.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null
    }
  }
  setUser = user => this.setState({ user })
  clearUser = () => this.setState({ user: null })
  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }
  // const loggedIn = <LoggedIn user={this.state.user} alerts={this.state.alerts} clearUser={this.clearUser} />
  render() {
    return (
      <React.Fragment>
        <LoadingProvider>
          <ComicProvider>
            <BlogProvider>
              <Header />
              <Comic />
              <Blog />
              <Footer />
            </BlogProvider>
          </ComicProvider>
        </LoadingProvider>
      </React.Fragment>
    )
  }
}

export default App
