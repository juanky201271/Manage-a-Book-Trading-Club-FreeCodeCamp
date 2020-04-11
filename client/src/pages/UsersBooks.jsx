import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import { Link } from 'react-router-dom'
import api from '../api'
import styled from 'styled-components'
import 'react-table-6/react-table.css'

const Wrapper = styled.div` padding: 0 40px 40px 40px; `
const Title = styled.h1.attrs({ className: 'h1', })``

class UsersBooks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: this.props.match.params._id,
            books: [],
            columns: [],
            isLoading: false,
        }
    }
    componentDidMount = async () => {
      this.setState({ isLoading: true })
      const { _id } = this.state
      await api.getBooksByUserId(_id).then(books => {
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
                Header: 'from User',
                accessor: '',
                Cell: function(props) {
                    return (
                      <span>
                        <React.Fragment>
                          <Link to={{ pathname: `/user/${props.original.user_id._id}`,
                                  state: {
                                    authenticated: this.props.location.state.authenticated,
                                    user_id: this.props.location.state.user_id,
                                    user: this.props.location.state.user,
                                  }
                                }}
                                className="nav-link" >{props.original.user_id.screenName}</Link>
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
                                      user_id: this.props.location.state.user_id,
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

export default UsersBooks
