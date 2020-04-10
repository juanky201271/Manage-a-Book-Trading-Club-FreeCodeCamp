import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import { Link } from 'react-router-dom'
import api from '../api'
import styled from 'styled-components'
import 'react-table-6/react-table.css'

const Wrapper = styled.div` padding: 0 40px 40px 40px; `
const Title = styled.h1.attrs({ className: 'h1', })``

class UsersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            columns: [],
            isLoading: false,
            authenticated: this.props.location.state.authenticated,
            user_id: this.props.location.state.user_id,
            user: this.props.location.state.user,
        }
    }
    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllUsers().then(users => {
          this.setState({
              users: users.data.data,
              isLoading: false,
          })
        })
        .catch(error => {
          console.log(error)
          this.setState({
              isLoading: false,
          })
        })

    }
    render() {
      console.log('users', this.state)
        const { users, isLoading } = this.state
        const columns = [
          {
              Header: 'ID',
              accessor: '_id',
              filterable: true,
          },
          {
              Header: 'Name TW',
              accessor: 'name',
              filterable: true,
          },
          {
              Header: 'Screen Name TW',
              accessor: 'screenName',
              filterable: true,
          },
          {
              Header: 'Full Name',
              accessor: 'fullName',
              filterable: true,
          },
          {
              Header: 'City',
              accessor: 'city',
              filterable: true,
          },
          {
              Header: 'State',
              accessor: 'state',
              filterable: true,
          },
          {
              Header: 'Address',
              accessor: 'address',
              filterable: true,
          },
        ]

        let showTable = true
        if (!users.length) {
            showTable = false
        }

        return (
            <Wrapper>
                <Title>Users</Title>
                {showTable && !isLoading && (
                    <ReactTable
                        data={users}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}

                {!showTable && (
                    <hr />
                )}

                {isLoading && (
                    <h3>Loading Users</h3>
                )}
            </Wrapper>
        )
    }
}

export default UsersList
