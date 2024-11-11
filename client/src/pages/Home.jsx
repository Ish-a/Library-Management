import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Header, Table } from "semantic-ui-react";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("https://library-management-6svy.onrender.com/api/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch(() => {
        console.error("Error fetching books data");
      });
  }, []);

  return (
    <>
      <Header as="h1" textAlign="center">
        List of Books
      </Header>
      <Container text textAlign="justified">
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Subject</Table.HeaderCell>
              <Table.HeaderCell>Issued Books</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {books.map((book) => (
              <Table.Row key={book._id}>
                <Table.Cell>{book.title}</Table.Cell>
                <Table.Cell>
                  {book.author
                    ? `${book.author.givenName} ${book.author.lastName}`
                    : "Unknown"}
                </Table.Cell>
                <Table.Cell>{book.subject}</Table.Cell>
                <Table.Cell>{book.issuebooks}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    </>
  );
};

export default Home;
