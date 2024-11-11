import React from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch
} from 'react-router-dom';
import { Container, Menu, Segment } from 'semantic-ui-react';

import Home from './pages/Home';
import Authors from './pages/authors';
import Books from './pages/books';
import Subject from './pages/subject';
import IssueBooks from './pages/issuebooks';

const App = () => {
  return (
    <Container>
      <Router>
        <Segment inverted style={{ backgroundColor: '#cc7722' }}> {/* Ochre yellow color */}
          <Menu as='nav' inverted pointing secondary style={{ backgroundColor: '#cc7722' }}> {/* Ochre yellow color */}
            <Menu.Item as={NavLink} to='/' exact name='home' />
            <Menu.Item as={NavLink} to='/authors' name='authors' />
            <Menu.Item as={NavLink} to='/books' name='books' />
            <Menu.Item as={NavLink} to='/subject' name='subject' />
            <Menu.Item as={NavLink} to='/issuebooks' name='issuebooks' />
          </Menu>
        </Segment>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/authors' component={Authors} />
          <Route path='/books' component={Books} />
          <Route path='/subject' component={Subject} />
          <Route path='/issuebooks' component={IssueBooks} />
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
