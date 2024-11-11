import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';

const Create = () => {
  const [author, setAuthor] = useState({
    givenName: '',
    lastName: '',
    country: '',
    birthdate: ''
  });

  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (event, { name, value }) => {
    setAuthor(prevValue => ({ ...prevValue, [name]: value }));
  };

  const handleFormSubmission = () => {
    axios.post('/api/authors', author)
      .then(() => setRedirect(true))
      .catch(() => alert('Error creating author'));
  };

  const handleFormReset = () => {
    setAuthor({
      givenName: '',
      lastName: '',
      country: '',
      birthdate: ''
    });
  };

  return (
    <>
      {redirect ? (
        <Redirect to='/authors' push />
      ) : (
        <Segment padded="very" raised>
          <Header as='h2' color='teal' textAlign='center'>Create Author</Header>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input
                label='First Name'
                name='givenName'
                value={author.givenName}
                onChange={handleInputChange}
                required
              />
              <Form.Input
                label='Last Name'
                name='lastName'
                value={author.lastName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                label='Country'
                name='country'
                value={author.country}
                onChange={handleInputChange}
                required
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
            <Grid>
              <Grid.Column textAlign='center'>
                <Button color='green' onClick={handleFormSubmission}>Submit</Button>
                <Button color='grey' onClick={handleFormReset}>Reset</Button>
              </Grid.Column>
            </Grid>
          </Form>
        </Segment>
      )}
    </>
  );
};

export default Create;
