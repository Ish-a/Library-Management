import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { DateInput } from 'semantic-ui-calendar-react';
import { Button, Container, Form, Header, Select } from 'semantic-ui-react';

const Update = ({ match }) => {
  const [issueBook, setIssueBook] = useState({
    bookId: '',
    userId: '',
    issueDate: '',
    returnDate: '',
    status: '',
    fineAmount: 0,
    actualReturnDate: ''
  });

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // Fetch books, users, and issue details
    Promise.all([
      axios.get('/api/books'),
      axios.get('/api/users'),
      axios.get(`/api/issuebooks/${match.params._id}`)
    ])
      .then(([booksRes, usersRes, issueRes]) => {
        // Format books for dropdown
        setBooks(booksRes.data.map(book => ({
          key: book._id,
          text: book.title,
          value: book._id
        })));

        // Format users for dropdown
        setUsers(usersRes.data.map(user => ({
          key: user._id,
          text: `${user.firstName} ${user.lastName}`,
          value: user._id
        })));

        // Set issue book data
        const issueData = issueRes.data;
        setIssueBook({
          bookId: issueData.bookId._id,
          userId: issueData.userId._id,
          issueDate: issueData.issueDate ? issueData.issueDate.slice(0, 10) : '',
          returnDate: issueData.returnDate ? issueData.returnDate.slice(0, 10) : '',
          status: issueData.status,
          fineAmount: issueData.fineAmount,
          actualReturnDate: issueData.actualReturnDate ? issueData.actualReturnDate.slice(0, 10) : ''
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [match.params._id]);

  const handleInputChange = (event, { name, value }) => {
    setIssueBook(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmission = () => {
    axios
      .put(`/api/issuebooks/${match.params._id}`, issueBook)
      .then(() => {
        setRedirect(true);
      })
      .catch(() => {
        alert('An error occurred while updating');
      });
  };

  const handleReturnBook = () => {
    axios
      .put(`/api/issuebooks/${match.params._id}/return`)
      .then(() => {
        setRedirect(true);
      })
      .catch(() => {
        alert('An error occurred while returning the book');
      });
  };

  const handleFormCancellation = () => {
    setRedirect(true);
  };

  const statusOptions = [
    { key: 'issued', text: 'Issued', value: 'issued' },
    { key: 'returned', text: 'Returned', value: 'returned' },
    { key: 'overdue', text: 'Overdue', value: 'overdue' }
  ];

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {redirect ? (
        <Redirect to='/issuebooks' push />
      ) : (
        <>
          <Header as='h2'>Edit Issue Details</Header>
          <Form widths='equal'>
            <Form.Group>
              <Form.Field
                control={Select}
                label='Book'
                name='bookId'
                options={books}
                value={issueBook.bookId}
                onChange={handleInputChange}
                disabled={issueBook.status === 'returned'}
              />
              <Form.Field
                control={Select}
                label='User'
                name='userId'
                options={users}
                value={issueBook.userId}
                onChange={handleInputChange}
                disabled={issueBook.status === 'returned'}
              />
            </Form.Group>
            <Form.Group>
              <DateInput
                label='Issue Date'
                name='issueDate'
                value={issueBook.issueDate}
                onChange={handleInputChange}
                dateFormat='YYYY-MM-DD'
                disabled={issueBook.status === 'returned'}
              />
              <DateInput
                label='Return Due Date'
                name='returnDate'
                value={issueBook.returnDate}
                onChange={handleInputChange}
                dateFormat='YYYY-MM-DD'
                disabled={issueBook.status === 'returned'}
              />
            </Form.Group>
            <Form.Group>
              <Form.Field
                control={Select}
                label='Status'
                name='status'
                options={statusOptions}
                value={issueBook.status}
                onChange={handleInputChange}
                disabled={issueBook.status === 'returned'}
              />
              {issueBook.status === 'returned' && (
                <>
                  <DateInput
                    label='Actual Return Date'
                    name='actualReturnDate'
                    value={issueBook.actualReturnDate}
                    dateFormat='YYYY-MM-DD'
                    disabled
                  />
                  <Form.Input
                    label='Fine Amount'
                    name='fineAmount'
                    value={issueBook.fineAmount}
                    disabled
                  />
                </>
              )}
            </Form.Group>
          </Form>
          <Container textAlign='right'>
            <Button color='red' content='Cancel' onClick={handleFormCancellation} />
            {issueBook.status !== 'returned' && (
              <>
                <Button color='blue' content='Return Book' onClick={handleReturnBook} />
                <Button color='green' content='Save Changes' onClick={handleFormSubmission} />
              </>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default Update;