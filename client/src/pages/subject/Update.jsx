import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Container, Form, Header } from "semantic-ui-react";

const Update = ({ match }) => {
  const [subject, setSubject] = useState({
    type: "",
  });

  useEffect(() => {
    axios
      .get(
        `https://library-management-6svy.onrender.com/api/books/${match.params._id}`
      )
      .then((response) => {
        const subjectData = response.data;
        setSubject(subjectData);
      });
  }, [match]);

  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (event, { name, value }) => {
    setSubject((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleFormSubmission = () => {
    axios
      .put(
        `https://library-management-6svy.onrender.com/api/subject/${match.params._id}`,
        subject
      )
      .then(() => setRedirect(true))
      .catch(() => alert("An error occurred"));
  };

  const handleFormCancellation = () => {
    setRedirect(true);
  };

  return (
    <>
      {redirect ? (
        <Redirect to="/subject" push />
      ) : (
        <>
          <Header as="h2">Edit subject</Header>
          <Form widths="equal">
            <Form.Group>
              <Form.Input
                label="Type"
                name="type"
                value={subject.type || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
          <Container textAlign="right">
            <Button
              color="red"
              content="Cancel"
              onClick={handleFormCancellation}
            />
            <Button
              color="green"
              content="Save"
              onClick={handleFormSubmission}
            />
          </Container>
        </>
      )}
    </>
  );
};

export default Update;
