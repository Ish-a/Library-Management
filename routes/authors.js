const router = require('express').Router()
const authorController = require('../controllers/author')

router.get('/', authorController.list)
router.get('/:id', authorController.details)
router.post('/', authorController.create)
router.put('/:id', authorController.update)
router.delete('/:id', authorController.delete)

module.exports = router