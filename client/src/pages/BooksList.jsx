import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import { Link } from 'react-router-dom'
import api from '../api'
import styled from 'styled-components'
import 'react-table-6/react-table.css'

const Wrapper = styled.div` padding: 0 40px 40px 40px; `
const Title = styled.h1.attrs({ className: 'h1', })``

class BooksList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            columns: [],
            isLoading: false,
            authenticated: '',
            twitterId: '',
            user: '',
        }
    }
    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await fetch("/api/auth/login/success", {
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
              })
            } else {
              this.setState({
                authenticated: false,
                twitterId: '',
                user: '',
              })
            }
          })
          .catch(error => {
            console.log(error)
          })

        await api.getAllBooks().then(books => {
            this.setState({
                books: books.data.data,
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
    handleUserName(twitterId) {
      return api.getUserByTwitterId(twitterId)
        .then(user => return user.data.data.name)
        .catch(error => console.log(error))
    }
    render() {
      console.log('books', this.state)
        const { books, isLoading } = this.state
        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Title',
                accessor: 'title',
                filterable: true,
            },
            {
                Header: 'Author',
                accessor: 'author',
                filterable: true,
            },
            {
                Header: 'from User',
                accessor: '',
                Cell: function(props) {
                    return (
                      <span>
                        <React.Fragment>
                          <Link to={{ pathname: `/user/books/${props.original.twitterId}`,
                                  state: {
                                    authenticated: this.state.authenticated,
                                    twitterId: this.state.twitterId,
                                    user: this.state.user,
                                  }
                                }}
                                className="nav-link" >{() => this.handleUserName(props.original.twitterId)}</Link>
                        </React.Fragment>
                      </span>
                    )
                }.bind(this),
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                      <span>
                        <React.Fragment>
                          <Link to={{ pathname: `/book/requests/${props.original._id}`,
                                  state: {
                                    authenticated: this.state.authenticated,
                                    twitterId: this.state.twitterId,
                                    user: this.state.user,
                                  }
                                }}
                                className="nav-link" >Requests</Link>
                        </React.Fragment>
                      </span>
                    )
                }.bind(this),
            },
        ]

        let showTable = true
        if (!books.length) {
            showTable = false
        }

        return (
            <Wrapper>
                <Title>Books</Title>
                {showTable && !isLoading && (
                    <ReactTable
                        data={books}
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
                    <h3>Loading Books</h3>
                )}
            </Wrapper>
        )
    }
}

export default BooksList
