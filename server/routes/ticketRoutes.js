const express=require('express');
const router=express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  addTicket,
  getUserTickets,
  deleteTicket,
} = require('../controllers/ticketController');

router.post('/', authMiddleware, addTicket);
router.get('/', authMiddleware, getUserTickets);
router.delete('/:id', authMiddleware, deleteTicket);

module.exports = router;