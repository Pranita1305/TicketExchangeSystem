const express=require('express');
const router=express.Router();
const { createTicket, getAllTickets } = require('../controllers/ticketController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createTicket);
router.get('/', getAllTickets);

module.exports=router;