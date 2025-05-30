const express=require('express');
const router=express.Router();

const {
  requestExchange,
  getMyExchangeRequests,
  getRequestsForMyTickets,
  acceptExchange,
  rejectExchange
} = require('../controllers/exchangeController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, requestExchange);
router.get('/sent', auth, getMyExchangeRequests);
router.get('/received', auth, getRequestsForMyTickets);
router.put('/:id/accept', auth, acceptExchange);
router.put('/:id/reject', auth, rejectExchange);

module.exports=router;