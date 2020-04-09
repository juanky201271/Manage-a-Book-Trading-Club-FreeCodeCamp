import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({ className: "collapse navbar-collapse" })``
const List = styled.div.attrs({ className: "navbar-nav mr-auto" })``
const Item = styled.div.attrs({ className: "collapse navbar-collapse" })``
const Log = styled.div.attrs({ className: "navbar-brand" })`
  cursor: pointer;
`

class Links extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: this.props.authenticated || '',
      twitterId: this.props.twitterId || '',
      user: this.props.user || '',
    }
  }
  _handleLogoutClick = async () => {
    window.open("/api/auth/logout", "_self") // express
    this.props.handleNotAuthenticated()
    this.setState({ authenticated: false, twitterId: '', user: '', })
  }
  _handleLoginClick = async () => {
    window.open("/api/auth/twitter", "_self")
  }
  render() {
    console.log('links', this.state)
    const { authenticated, twitterId, user, } = this.state
    return (
      <React.Fragment>
        <Link to={{ pathname: "/",
                    state: {
                      authenticated: authenticated,
                      twitterId: twitterId,
                      user: user,
                    }
                  }}
          className="navbar-brand"
        >
          Build a voting App
        </Link>
        <Collapse>
          <List>

            <Item>
              <Link to={{ pathname: "/",
                          state: {
                            authenticated: authenticated,
                            twitterId: twitterId,
                            user: user,
                          }
                        }}
                className="nav-link"
              >
                Books
              </Link>
            </Item>

            <Item>
              {
                authenticated ? (
                  <Link to={{ pathname: "/mybooks",
                              state: {
                                authenticated: authenticated,
                                twitterId: twitterId,
                                user: user,
                              }
                            }}
                    className="nav-link"
                  >
                    My Books
                  </Link>
                ) : (
                  <div></div>
                )
              }
            </Item>

            <Item>
            {
              authenticated ? (
                <Link to={{ pathname: "/book/insert",
                            state: {
                              authenticated: authenticated,
                              twitterId: twitterId,
                              user: user,
                            }
                          }}
                  className="nav-link"
                >
                  Create Book
                </Link>
              ) : (
                <div></div>
              )
            }
            </Item>

          </List>
          {
            authenticated ? (
              <Log onClick={this._handleLogoutClick}>
                Logout Twitter
              </Log>
            ) : (
              <Log onClick={this._handleLoginClick}>
                Login Twitter
              </Log>
            )
          }
        </Collapse>
      </React.Fragment>
    )
  }
}

export default Links
