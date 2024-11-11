const express = require("express");
const mongoose = require("mongoose");

const authors = require("./routes/authors");
const books = require("./routes/books");
const subject = require("./routes/subject");
const issue = require("./routes/issuebooks");

const port = 5000;
const mongo_uri =
  "mongodb+srv://a_nushka04:test123456@cluster0.lnidx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Connected to MongoDB Atlas`);
  })
  .catch((err) => {
    console.error("Error connecting to database", err);
    process.exit(1);
  });

const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use("/api/authors", authors);
app.use("/api/books", books);
app.use("/api/subject", subject);
app.use("/api/issuebooks", issue);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
