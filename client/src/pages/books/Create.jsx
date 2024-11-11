import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button, Container, Header } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'

const Create = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    subject: '',
    publicationDate: ''
  })
  const [redirect, setRedirect] = useState(false);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    let isMounted = true // Track if component is mounted

    axios.get('/api/authors/')
      .then(response => {
        if (isMounted) {
          setAuthors(
            response.data.map(author => ({
              text: `${author.givenName} ${author.lastName}`,
              value: author._id
            }))
          )
        }
      })
      .catch(() => {
        if (isMounted) {
          console.error('Error fetching authors')
        }
      })

    return () => {
      isMounted = false // Cleanup function to set mounted status to false
    }
  }, [])

  const handleInputChange = (event, { name, value }) => {
    setBook(prevValue => ({ ...prevValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    axios.post('/api/books', book)
      .then(() => setRedirect(true))
      .catch(() => alert('An error occurred'))
  }

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  return (
    <>
      {redirect ? (
        <Redirect to='/books' push />
      ) : (
        <>
          <Header as='h2'>Create Book</Header>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                label='Title'
                name='title'
                value={book.title}
                onChange={handleInputChange}
              />
              <Form.Select
                label='Author'
                name='author'
                options={authors}
                value={book.author}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label='subject'
                name='subject'
                value={book.subject}
                onChange={handleInputChange}
              />
              <DateInput
                label='Publication Date'
                startMode='year'
                popupPosition='bottom center'
                name='publicationDate'
                preserveViewMode={false}
                animation='none'
                closable
                icon={false}
                dateFormat='YYYY-MM-DD'
                value={book.publicationDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
          <Container textAlign='right'>
            <Button color='red' content='Cancel' onClick={handleFormCancellation} />
            <Button color='green' content='Save' onClick={handleFormSubmission} />
          </Container>
        </>
      )}
    </>
  )
}

export default Create