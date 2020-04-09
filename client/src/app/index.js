import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { BooksList, BooksInsert, BooksUpdate, MyBooksList, BooksDetails } from '../pages'
import api from '../api'

import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      twitterId: '',
      user: '',
      isLoading: false,
    }
  }
  componentDidMount = async () => {
    this.setState({
      isLoading: true,
    })

    await fetch("/api/auth/login/success", { // express
      method: "GET",
      credentials: "include",
      headers: {
        Accept:
        "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json()
        throw new Error("failed to authenticate user")
      })
      .then(responseJson => {
        if (responseJson.success === true) {
          this.setState({
            authenticated: true,
            twitterId: responseJson.user.twitterId,
            user: responseJson.user,
            isLoading: false,
          })
        } else {
          this.setState({
            authenticated: false,
            twitterId: '',
            user: '',
            isLoading: false,
          })
        }
      })
      .catch(error => {
        console.log(error)
      })

  }
  render() {
    console.log('app', this.state)
    const { authenticated, twitterId, user, isLoading, } = this.state
    return (
      <Router>

      {!isLoading ?
         authenticated ?
         (
           <>
            <NavBar
              authenticated={authenticated}
              twitterId={twitterId}
              user={user}
            />
            <Switch>
              <Route path="/" exact component={BooksList} />
              <Route path="/book/insert" exact component={BooksInsert} />
              <Route path="/book/update/:_id" exact component={BooksUpdate} />
              <Route path="/book/details/:_id" exact component={BooksDetails} />
              <Route path="/mybooks" exact component={MyBooksList} />
            </Switch>
          </>
         )
         :
         (
           <>
            <NavBar
              authenticated={authenticated}
              twitterId={twitterId}
              user={user}
            />
            <Switch>
              <Route path="/" exact component={BooksList} />
              <Route path="/books" exact component={BooksList} />
              <Route path="/book/details/:_id" exact component={BooksDetails} />
            </Switch>
          </>
         )
         :
         (
           <div></div>
         )
      }

      </Router>
    )
  }
}

export default App
