const Subject =  require('../models/Subject');

exports.list = (req, res) => {
    Subject.find()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Error occured'});
        });
};

exports.details = (req, res) => {
    Subject.findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Error occured'});
        });
};

exports.create = (req, res) => {
    const newSubject = new Subject(req.body);
    newSubject.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Error occured' });
        });
};

exports.update = (req, res) => {
    Subject.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Error occured' });
        });
};

exports.delete = (req, res) => {
    Subject.findByIdAndRemove(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Error occured' });
        });
};