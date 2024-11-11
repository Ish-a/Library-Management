import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { DateInput } from 'semantic-ui-calendar-react';
import { Button, Container, Form, Header, Segment } from 'semantic-ui-react';

const Update = ({ match }) => {
  const [author, setAuthor] = useState({
    givenName: '',
    lastName: '',
    country: '',
    birthdate: ''
  });

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios.get(`/api/authors/${match.params._id}`)
      .then(response => {
        const data = response.data;
        setAuthor({
          givenName: data.givenName || '',
          lastName: data.lastName || '',
          country: data.country || '',
          birthdate: data.birthdate ? data.birthdate.slice(0, 10) : ''
        });
      })
      .catch(error => console.error('Error loading author data:', error));
  }, [match]);

  const handleInputChange = (event, { name, value }) => {
    setAuthor(prev => ({ ...prev, [name]: value || '' }));
  };

  const handleFormSubmission = () => {
    axios.put(`/api/authors/${match.params._id}`, author)
      .then(() => setRedirect(true))
      .catch(() => alert('Error updating author'));
  };

  const handleFormCancellation = () => {
    setRedirect(true);
  };

  return (
    <>
      {redirect ? (
        <Redirect to='/authors' push />
      ) : (
        <Segment padded="very" raised>
          <Header as='h2' color='teal' textAlign='center'>Update Author</Header>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input
                label='First Name'
                name='givenName'
                value={author.givenName}
                onChange={handleInputChange}
              />
              <Form.Input
                label='Last Name'
                name='lastName'
                value={author.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                label='Country'
                name='country'
                value={author.country}
                onChange={handleInputChange}
              />
              <DateInput
                label='Date of Birth'
                name='birthdate'
                dateFormat='YYYY-MM-DD'
                value={author.birthdate}
                onChange={handleInputChange}
                iconPosition="left"
              />
            </Form.Group>
            <Container textAlign='center'>
              <Button color='red' onClick={handleFormCancellation}>Cancel</Button>
              <Button color='green' onClick={handleFormSubmission}>Save Changes</Button>
            </Container>
          </Form>
        </Segment>
      )}
    </>
  );
};

export default Update;
