const router = require('express').Router()
const issueBookController = require('../controllers/issuebooks')

router.get('/', issueBookController.list)
router.get('/:id', issueBookController.details)
router.post('/', issueBookController.create)
router.put('/:id', issueBookController.update)
router.delete('/:id', issueBookController.delete)

module.exports = router