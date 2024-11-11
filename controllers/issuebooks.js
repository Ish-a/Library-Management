const IssueBook = require('../models/IssueBooks') // Adjust the path according to your project structure

module.exports = {
  // List all issued books
  list: async (req, res) => {
    try {
      const issuedBooks = await IssueBook.find()
        .populate('bookId', 'title') // Assuming you want to get book details
      res.json(issuedBooks)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Get details of a specific issued book
  details: async (req, res) => {
    try {
      const issuedBook = await IssueBook.findById(req.params.id)
        .populate('bookId', 'title')
      if (!issuedBook) {
        return res.status(404).json({ message: 'Issue record not found' })
      }
      res.json(issuedBook)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Create new issue book record
  create: async (req, res) => {
    try {
      const { bookId, userName, issueDate, returnDate, status } = req.body
      
      const newIssueBook = new IssueBook({
        bookId,
        userName, // Now using userName instead of userId
        issueDate,
        returnDate,
        status: status || 'issued' // Default status if not provided
      })

      const savedIssueBook = await newIssueBook.save()
      res.status(201).json(savedIssueBook)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },

  // Update issue book record
  update: async (req, res) => {
    try {
      const { bookId, userName, issueDate, returnDate, status } = req.body
      
      const updatedIssueBook = await IssueBook.findByIdAndUpdate(
        req.params.id,
        {
          bookId,
          userName,
          issueDate,
          returnDate,
          status
        },
        { new: true }
      )

      if (!updatedIssueBook) {
        return res.status(404).json({ message: 'Issue record not found' })
      }

      res.json(updatedIssueBook)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },

  // Delete issue book record
  delete: async (req, res) => {
    try {
      const deletedIssueBook = await IssueBook.findByIdAndDelete(req.params.id)
      
      if (!deletedIssueBook) {
        return res.status(404).json({ message: 'Issue record not found' })
      }

      res.json({ message: 'Issue record deleted successfully' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}