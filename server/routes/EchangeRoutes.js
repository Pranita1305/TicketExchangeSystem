const express=require('express');
const router=express.Router();
const authMiddleware = require('../middleware/authMiddleware');
//const { createExchangeRequest } = require('../controllers/exchangeController');

const {
  requestExchange,
  getMyExchangeRequests,
  getRequestsForMyTickets,
  acceptExchange,
  rejectExchange
} = require('../controllers/exchangeController');

const {
  createExchangeRequest,
  getUserExchangeRequests,
} =require('../controllers/exchangeController');

router.post('/', auth, requestExchange);
router.get('/sent', auth, getMyExchangeRequests);
router.get('/received', auth, getRequestsForMyTickets);
router.put('/:id/accept', auth, acceptExchange);
router.put('/:id/reject', auth, rejectExchange);
router.post('/request', authMiddleware, createExchangeRequest);
router.get('/my-requests', authMiddleware, getUserExchangeRequests);

module.exports=router;