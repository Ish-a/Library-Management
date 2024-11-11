// components/IssueBooks/List.jsx
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Grid, Table } from 'semantic-ui-react'

const List = ({ match }) => {
  const [issuedBooks, setIssuedBooks] = useState([])
  
  const loadIssuedBooks = () => {
    axios.get('/api/issuebooks/').then(response => {
      setIssuedBooks(response.data)
    })
  }
  
  useEffect(() => {
    loadIssuedBooks()
  }, [])

  const deleteIssue = _id => {
    axios.delete(`/api/issuebooks/${_id}`).then(() => {
      loadIssuedBooks()
    })
  }

  return (
    <>
      <Grid>
        <Grid.Column width={8} textAlign='left'>
          <Header as='h2'>Issued Books</Header>
        </Grid.Column>
        <Grid.Column width={8} textAlign='right'>
          <Button color='green' as={Link} to={`${match.url}/create`}>
            Issue New Book
          </Button>
        </Grid.Column>
      </Grid>
      <Table singleLine columns={6} striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Book Title</Table.HeaderCell>
            <Table.HeaderCell>Issued To</Table.HeaderCell>
            <Table.HeaderCell>Issue Date</Table.HeaderCell>
            <Table.HeaderCell>Return Date</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issuedBooks.map(issue => {
            const { _id, bookId, userId, issueDate, returnDate, status } = issue
            return (
              <Table.Row key={_id}>
                <Table.Cell>{bookId.title}</Table.Cell>
                <Table.Cell>{`${userId.firstName} ${userId.lastName}`}</Table.Cell>
                <Table.Cell>{new Date(issueDate).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{new Date(returnDate).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{status}</Table.Cell>
                <Table.Cell>
                  <Button
                    basic
                    color='blue'
                    as={Link}
                    to={`${match.url}/${_id}`}
                  >
                    Edit
                  </Button>
                  <Button basic color='red' onClick={() => deleteIssue(_id)}>
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