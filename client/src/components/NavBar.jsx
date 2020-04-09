import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import Links from './Links'

const Container = styled.div.attrs({ className: "container" })``
const Nav = styled.nav.attrs({ className: "navbar navbar-expand-lg navbar-dark bg-secondary " })`
  margin-bottom: 20px;
`
const Name = styled.div`
  color: #fff;
  background: #666;
  padding: 5px;
`
const Pic = styled.img`
  width: 30px;
`

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: this.props.authenticated || '',
      twitterId: this.props.twitterId || '',
      user: this.props.user || '',
    }
  }
  _handleNotAuthenticated = () => {
    this.setState({ authenticated: false, twitterId: '', user: '', })
  }
  render() {
    console.log('navbar', this.state)
    const { authenticated, twitterId, user,  } = this.state
    const name = user.name || ''
    const profileImageUrl = user.profileImageUrl || ''
    return (
      <Container>
        <Nav>
          <Logo />
          <Links
            authenticated={authenticated}
            twitterId={twitterId}
            user={user}
            handleNotAuthenticated={this._handleNotAuthenticated}
          />
          { name ?
            (
              <Name>{name}</Name>
            ) : (
              <div></div>
            )
          }
          { profileImageUrl ?
            (
              <Pic src={profileImageUrl}></Pic>
            ) : (
              <div></div>
            )
          }
        </Nav>
      </Container>
    )
  }
}

export default NavBar
