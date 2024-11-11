import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Grid, Table, Segment } from "semantic-ui-react";

const List = ({ match }) => {
  const [authors, setAuthors] = useState([]);

  const loadAuthors = () => {
    axios
      .get("https://library-management-6svy.onrender.com/api/authors/")
      .then((response) => {
        setAuthors(response.data);
      });
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  const deleteAuthor = (_id) => {
    axios
      .delete(`https://library-management-6svy.onrender.com/api/authors/${_id}`)
      .then(() => {
        loadAuthors();
      });
  };

  return (
    <Segment raised>
      <Grid>
        <Grid.Column textAlign="center">
          <Header as="h2" color="blue">
            Authors List
          </Header>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column textAlign="right">
          <Button primary as={Link} to={`${match.url}/create`}>
            Add New Author
          </Button>
        </Grid.Column>
      </Grid>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Country</Table.HeaderCell>
            <Table.HeaderCell>Date of Birth</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {authors.map((author) => (
            <Table.Row key={author._id}>
              <Table.Cell>{`${author.givenName} ${author.lastName}`}</Table.Cell>
              <Table.Cell>{author.country}</Table.Cell>
              <Table.Cell>
                {author.birthdate ? author.birthdate.slice(0, 10) : ""}
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Button
                  as={Link}
                  to={`${match.url}/${author._id}`}
                  color="blue"
                  basic
                >
                  Edit
                </Button>
                <Button
                  color="red"
                  basic
                  onClick={() => deleteAuthor(author._id)}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default List;
