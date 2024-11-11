import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Button, Container, Header } from "semantic-ui-react";

const Create = () => {
  const [subject, setSubject] = useState({
    type: "",
  });
  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (event, { name, value }) => {
    setSubject((preValue) => ({ ...preValue, [name]: value }));
  };

  const handleFormSubmission = () => {
    axios
      .post("https://library-management-6svy.onrender.com/api/subject", subject)
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
          <Header>Create subject</Header>
          <Form widths="equal">
            <Form.Group>
              <Form.Input
                label="Type"
                name="type"
                value={subject.type}
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

export default Create;
