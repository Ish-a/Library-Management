import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Grid, Table } from 'semantic-ui-react'

const List = ({ match }) => {
  const [books, setBooks] = useState([])
  const loadBooks = () => {
    axios.get('/api/books/').then(response => {
      setBooks(response.data)
    })
  }
  useEffect(() => {
    loadBooks()
  }, [])

  const deleteBook = _id => {
    axios.delete(`/api/books/${_id}`).then(() => {
      loadBooks()
    })
  }

  return (
    <>
      <Grid>
        <Grid.Column width={8} textAlign='left'>
          <Header as='h2'>List</Header>
        </Grid.Column>
        <Grid.Column width={8} textAlign='right'>
          <Button color='green' as={Link} to={`${match.url}/create`}>
            New
          </Button>
        </Grid.Column>
      </Grid>
      <Table singleLine columns={4} striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>subject</Table.HeaderCell>
            <Table.HeaderCell>Publication Date</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {books.map(book => {
            const { _id, title, author, subject, publicationDate } = book
            return (
              <Table.Row key={_id}>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>
                  {author ? `${author.givenName} ${author.lastName}` : ''}
                </Table.Cell>
                <Table.Cell>{subject}</Table.Cell>
                <Table.Cell>
                  {publicationDate
                    ? publicationDate.slice(0, 10)
                    : publicationDate}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  <Button
                    basic
                    color='blue'
                    as={Link}
                    to={`${match.url}/${_id}`}
                  >
                    Edit
                  </Button>
                  <Button basic color='red' onClick={() => deleteBook(_id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </>
  )
}

export default List