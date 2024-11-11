const Author = require('../models/Author');

exports.list = (req, res) => {
  Author.find()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ message: 'Error' });
    });
};

exports.details = (req, res) => {
  Author.findById(req.params.id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ message: 'Error' });
    });
};

exports.create = (req, res) => {
  const newAuthor = new Author(req.body);
  newAuthor.save()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ message: 'Error' });
    });
};

exports.update = (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, { new: true }) // Changed _id to id
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ message: 'Error' });
    });
};

exports.delete = (req, res) => {
  Author.findByIdAndRemove(req.params.id) // Changed _id to id
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ message: 'Error' });
    });
};