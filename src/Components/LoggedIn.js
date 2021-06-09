import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Nav from './nav.js'
import Uploader from './Uploader'

const LoggedIn = ({ user, alerts, clearUser }) => {
  return (
    <Fragment>
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
      </main>
    </Fragment>
  )
}

export default LoggedIn
