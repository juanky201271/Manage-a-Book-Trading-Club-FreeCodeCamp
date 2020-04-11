import React, { Component } from 'react'
import api from '../api'
import styled from 'styled-components'

const Title = styled.h1.attrs({ className: 'h1', })``
const Wrapper = styled.div.attrs({ className: 'form-group', })`
    margin: 0 30px;
`
const Label = styled.label` margin: 5px; `
const InputText = styled.input.attrs({ className: 'form-control', })`
    margin: 5px;
`
const Button = styled.button.attrs({ className: `btn btn-primary`, })`
    margin: 15px 15px 15px 5px;
`
const CancelButton = styled.a.attrs({ className: `btn btn-danger`, })`
    margin: 15px 15px 15px 5px;
`

class BooksInsert extends Component {
    constructor(props) {
        super(props)
        this.state = {
          authenticated: this.props.location.state.authenticated,
          user_id: this.props.location.state.user_id,
          user: this.props.location.state.user,
          title: '',
          author: '',
        }
    }
    handleChangeInputTitle = event => {
        const title = event.target.value
        this.setState({ title })
    }
    handleChangeInputAuthor = event => {
        const author = event.target.value
        this.setState({ author })
    }
    handleIncludeBook = async (event) => {
        event.preventDefault();
        const { title, author, user_id, } = this.state

        const payload = { title: title, author: author, user_id: user_id }

        await api.insertBook(payload).then(res => {
            window.alert(`Book inserted successfully`)
            this.setState({
              title: '',
              author: '',
            })
        })
        .catch(error => {
          console.log(error)
        })

        window.location.href = '/'
    }
    render() {
      console.log('insert', this.state)
        const { title, author } = this.state
        return (
            <Wrapper>
                <Title>Create Book</Title>

                <Label>Title: </Label>
                <InputText
                    type="text"
                    value={title}
                    onChange={this.handleChangeInputTitle}
                />

                <Label>Author: </Label>
                <InputText
                    type="text"
                    value={author}
                    onChange={this.handleChangeInputAuthor}
                />

                <Button onClick={this.handleIncludeBook}>Add Book</Button>
                <CancelButton href={'/'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default BooksInsert
