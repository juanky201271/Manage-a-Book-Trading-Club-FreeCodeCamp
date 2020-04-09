import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import { Link } from 'react-router-dom'
import api from '../api'
import styled from 'styled-components'
import 'react-table-6/react-table.css'

const Wrapper = styled.div` padding: 0 40px 40px 40px; `
const Title = styled.h1.attrs({ className: 'h1', })``
const Delete = styled.div` color: #ff0000; cursor: pointer; `

class DeleteBook extends Component {
  deleteUser = async event => {
    event.preventDefault()
    const { _id, } = this.props
    if (window.confirm(`Do tou want to delete the book ${_id} and its requests permanently?`,)) {

      await api.deleteBookById(_id)
      .catch(error => {
        console.log(error)
      })

      await api.deleteRequestByGiveBookId(_id)
      .catch(error => {
        console.log(error)
      })

      await api.deleteRequestByTakeBookId(_id)
      .catch(error => {
        console.log(error)
      })

      window.location.href = '/'
    }
  }
  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>
  }
}

class MyBooksList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            columns: [],
            isLoading: false,
        }
    }
    componentDidMount = async () => {
      this.setState({ isLoading: true })

      const { twitterId } = this.props.location.state
      await api.getAllBooks().then(books => {
        let p = books.data.data
        if (twitterId) {
          p = p.filter(function(item) {
            return item.twitterId === twitterId.toString()
          })
        } else {
          p = []
        }
        this.setState({
            books: p,
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
      console.log('my books', this.state)
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
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteBook
                              _id={props.original._id}
                              authenticated={this.props.location.state.authenticated}
                              twitterId={this.props.location.state.twitterId}
                              user={this.props.location.state.user} />
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
                            <Link to={{ pathname: `/book/${props.original._id}/update`,
                                    state: {
                                      authenticated: this.props.location.state.authenticated,
                                      twitterId: this.props.location.state.twitterId,
                                      user: this.props.location.state.user,
                                    }
                                  }}
                                  className="nav-link" >Update</Link>
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
                            <Link to={{ pathname: `/book/${props.original._id}/requests`,
                                    state: {
                                      authenticated: this.props.location.state.authenticated,
                                      twitterId: this.props.location.state.twitterId,
                                      user: this.props.location.state.user,
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
                <Title>My Books</Title>
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

export default MyBooksList
