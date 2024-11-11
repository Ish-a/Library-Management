import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, Segment, Container } from 'semantic-ui-react';

import Create from './Create';
import List from './List';
import Update from './Update';

const IssueBooks = ({ match }) => {
  return (
    <Container textAlign="center" style={{ padding: '2em 0' }}>
      <Header as='h1' color='blue' textAlign='center'>
        Anushka's Library Managament
      </Header>
      <Segment padded="very" raised>
        <Switch>
          <Route exact path={match.path} component={List} />
          <Route path={`${match.path}/create`} component={Create} />
          <Route path={`${match.path}/:_id`} component={Update} />
        </Switch>
      </Segment>
    </Container>
  );
};

export default IssueBooks;
