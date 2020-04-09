import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import { Link } from 'react-router-dom'
import api from '../api'
import styled from 'styled-components'
import 'react-table-6/react-table.css'

const Wrapper = styled.div` padding: 0 40px 40px 40px; `
const Title = styled.h1.attrs({ className: 'h1', })``

class BooksRequests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: this.props.match.params._id,
            requestsGive: [],
            requestsTake: [],
            columns: [],
            isLoading: false,
            authenticated: '',
            twitterId: '',
            user: '',
        }
    }
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        const { _id } = this.state

        await api.getRequestsByGiveBookId(_id).then(requests => {
            this.setState({
                requestsGive: requests.data.data,
            })
        })
        .catch(error => {
          console.log(error)
        })

        await api.getRequestsByTakeBookId(_id).then(requests => {
            this.setState({
                requestsTake: requests.data.data,
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
        .then(user => user.data.data.name)
        .catch(error => console.log(error))
    }
    handleBookTitle(book_id) {
      return api.getBookById(book_id)
        .then(user => user.data.data.title)
        .catch(error => console.log(error))
    }
    handleBookAuthor(book_id) {
      return api.getBookById(book_id)
        .then(user => user.data.data.author)
        .catch(error => console.log(error))
    }
    render() {
      console.log('requests', this.state)
        const { requestsGive, requestsTake, isLoading } = this.state
        const requests = [...requestsGive, ...requestsTake]
        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Give',
                accessor: '',
                Cell: function(props) {
                    return (
                      <span>
                        <React.Fragment>
                          <div>
                            {() => this.handleBookTitle(props.original.give_book_id)}<br />
                            {() => this.handleBookAuthor(props.original.give_book_id)}
                          </div>
                        </React.Fragment>
                      </span>
                    )
                }.bind(this),
            },
            {
              Header: 'Take',
              accessor: '',
              Cell: function(props) {
                  return (
                    <span>
                      <React.Fragment>
                        <div>
                          {() => this.handleBookTitle(props.original.take_book_id)}<br />
                          {() => this.handleBookAuthor(props.original.take_book_id)}
                        </div>
                      </React.Fragment>
                    </span>
                  )
              }.bind(this),
            },
            {
                Header: 'from User',
                accessor: '',
                Cell: function(props) {
                    return (
                      <span>
                        <React.Fragment>
                          <Link to={{ pathname: `/user/${props.original.twitterId}/requests`,
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
        ]

        let showTable = true
        if (!requests.length) {
            showTable = false
        }

        return (
            <Wrapper>
                <Title>Requests</Title>
                {showTable && !isLoading && (
                    <ReactTable
                        data={requests}
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

export default BooksRequests
