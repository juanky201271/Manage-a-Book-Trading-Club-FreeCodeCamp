import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import styled from 'styled-components'

const FullName = styled.h1.attrs({ className: 'h1', })``
const Wrapper = styled.div.attrs({ className: 'form-group', })`
    margin: 0 30px;
`
const Label = styled.label`
    margin: 5px;
`
const InputText = styled.input.attrs({ className: 'form-control', })`
    margin: 5px;
`
const Button = styled.button.attrs({ className: `btn btn-primary`, })`
    margin: 15px 15px 15px 5px;
    display: initial;
`

class UsersUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: this.props.match.params._id,
            twitterId: '',
            name: '',
            screenName: '',
            fullName: '',
            city: '',
            state: '',
            address: '',
            readOnly: true,
            authenticated: this.props.location.state.authenticated,
            user_id: this.props.location.state.user_id,
            user: this.props.location.state.user,
            backURL: this.props.location.state.backURL,
        }
        this.updateButtonRef = React.createRef()
        this.cancelButtonRef = React.createRef()
    }
    handleChangeInputFullName = event => {
        const fullName = event.target.value
        this.setState({ fullName })
    }
    handleChangeInputCity = event => {
        const city = event.target.value
        this.setState({ city })
    }
    handleChangeInputState = event => {
        const state = event.target.value
        this.setState({ state })
    }
    handleChangeInputAddress = event => {
        const address = event.target.value
        this.setState({ address })
    }
    handleUpdateUser = async (event) => {
      event.preventDefault();
      const { _id, fullName, city, state, address, } = this.state

      const payload = { fullName: fullName, city: city, state: state, address: address }
      await api.updateUserById(_id, payload).then(res => {
        window.alert(`User updated successfully`)
        this.setState({
          fullName: '',
          city: '',
          state: '',
          address: '',
        })
      })
      .catch(error => {
        console.log(error)
      })

      this.cancelButtonRef.current.click()
    }
    componentDidMount = async () => {
      var { _id } = this.state
      const { user_id } = this.props.location.state
      await api.getUserById(_id).then(user => {
        const readOnly = user.data.data._id === user_id ? false : true
        if (readOnly && this.updateButtonRef.current) {
          this.updateButtonRef.current.style.display = "none"
        }
        this.setState({
          twitterId: user.data.data.twitterId,
          name: user.data.data.name,
          screenName: user.data.data.screenName,
          fullName: user.data.data.fullName,
          city: user.data.data.city,
          state: user.data.data.state,
          address: user.data.data.address,
          readOnly: readOnly,
        })
      })
      .catch(error => {
        console.log(error)
      })

      //const votesExists = votes.filter((ele, ind) => {
      //  return ele > 0
      //})
      //if (votesExists.length > 0 && this.updateButtonRef.current) {
      //  this.updateButtonRef.current.style.display = "none"
      //}

    }
    render() {
        console.log('users update', this.state)
        const { twitterId, name, screenName, fullName, city, state, address, readOnly, } = this.state
        const { authenticated, user_id, user, backURL, _id, } = this.state

        return (
            <Wrapper>
                { readOnly ?
                  (
                    <FullName>User</FullName>
                  )
                  :
                  (
                    <FullName>Update User</FullName>
                  )
                }


                <Label>Twitter ID: {twitterId} - {name} - {screenName}</Label>
                <hr />
                <Label>FullName: </Label>
                { readOnly ?
                  (
                    <InputText
                        type="text"
                        value={fullName}
                        readOnly
                    />
                  )
                  :
                  (
                    <InputText
                        type="text"
                        value={fullName}
                        onChange={this.handleChangeInputFullName }
                    />
                  )
                }

                <Label>City: </Label>
                { readOnly ?
                  (
                    <InputText
                        type="text"
                        value={city}
                        readOnly
                    />
                  )
                  :
                  (
                    <InputText
                        type="text"
                        value={city}
                        onChange={this.handleChangeInputCity}
                    />
                  )
                }

                <Label>State: </Label>
                { readOnly ?
                  (
                    <InputText
                        type="text"
                        value={state}
                        readOnly
                    />
                  )
                  :
                  (
                    <InputText
                        type="text"
                        value={state}
                        onChange={this.handleChangeInputState}
                    />
                  )
                }

                <Label>Address: </Label>
                { readOnly ?
                  (
                    <InputText
                        type="text"
                        value={address}
                        readOnly
                    />
                  )
                  :
                  (
                    <InputText
                        type="text"
                        value={address}
                        onChange={this.handleChangeInputAddress}
                    />
                  )
                }

                <Button id="updateButton" onClick={this.handleUpdateUser} ref={this.updateButtonRef}>Update User</Button>
                <Link to={{ pathname: backURL || '/',
                            state: {
                              authenticated: authenticated,
                              user_id: user_id,
                              user: user,
                              backURL: `/user/${_id}/update`
                            }
                          }} className="btn btn-danger" ref={this.cancelButtonRef}>Cancel</Link>
            </Wrapper>
        )
    }
}

export default UsersUpdate
