import axios from "axios";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, Grid, Header } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";

const Create = () => {
  const [issueBook, setIssueBook] = useState({
    bookId: "",
    userName: "",
    issueDate: "",
    returnDate: "",
    status: "issued",
  });

  const [books, setBooks] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Added error handling for books fetch
    axios
      .get("https://library-management-6svy.onrender.com/api/books")
      .then((response) => setBooks(response.data))
      .catch((err) => {
        console.error("Error fetching books:", err);
        setError("Failed to load books");
      });
  }, []);

  const handleInputChange = (event, { name, value }) => {
    setIssueBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextInputChange = (event) => {
    const { name, value } = event.target;
    setIssueBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (event, { name, value }) => {
    setIssueBook((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!issueBook.bookId) return "Please select a book";
    if (!issueBook.userName) return "Please enter user name";
    if (!issueBook.issueDate) return "Please select issue date";
    if (!issueBook.returnDate) return "Please select return date";
    return null;
  };

  const handleFormSubmission = async () => {
    try {
      const validationError = validateForm();
      if (validationError) {
        alert(validationError);
        return;
      }

      const response = await axios.post(
        "https://library-management-6svy.onrender.com/api/issuebooks",
        issueBook
      );
      if (response.data) {
        setRedirect(true);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert(err.response?.data?.message || "Error issuing book");
    }
  };

  const handleFormCancellation = () => {
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/issuebooks" />;
  }

  return (
    <div className="p-4">
      <Header as="h2">Issue New Book</Header>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Form widths="equal">
        <Form.Group>
          <Form.Select
            label="Book"
            name="bookId"
            placeholder="Select Book"
            options={books.map((book) => ({
              key: book._id,
              text: book.title,
              value: book._id,
            }))}
            value={issueBook.bookId}
            onChange={handleInputChange}
            required
          />
          <Form.Input
            label="User Name"
            name="userName"
            placeholder="Enter user name"
            value={issueBook.userName}
            onChange={handleTextInputChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <DateInput
            label="Issue Date"
            name="issueDate"
            placeholder="YYYY-MM-DD"
            value={issueBook.issueDate}
            onChange={handleDateChange}
            dateFormat="YYYY-MM-DD"
            required
          />
          <DateInput
            label="Return Date"
            name="returnDate"
            placeholder="YYYY-MM-DD"
            value={issueBook.returnDate}
            onChange={handleDateChange}
            dateFormat="YYYY-MM-DD"
            required
          />
        </Form.Group>
        <Grid>
          <Grid.Column width={16} textAlign="right">
            <Button
              color="red"
              content="Cancel"
              onClick={handleFormCancellation}
              type="button"
            />
            <Button
              color="green"
              content="Submit"
              onClick={handleFormSubmission}
              type="button"
            />
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  );
};

export default Create;
