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

// Accept or Reject Exchange Request
router.put('/respond/:id', protect, async (req, res) => {
  try {
    const { status } = req.body; // 'accepted' or 'rejected'
    const requestId = req.params.id;

    const exchangeRequest = await ExchangeRequest.findById(requestId)
      .populate('senderTicket')
      .populate('receiverTicket');

    if (!exchangeRequest) {
      return res.status(404).json({ message: 'Exchange request not found' });
    }

    // Only receiver can respond
    if (exchangeRequest.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (exchangeRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Exchange already responded to' });
    }

    // Update status
    exchangeRequest.status = status;

    if (status === 'accepted') {
      // Swap the ownership of the tickets
      const senderTicket = exchangeRequest.senderTicket;
      const receiverTicket = exchangeRequest.receiverTicket;

      const senderId = senderTicket.user;
      const receiverId = receiverTicket.user;

      senderTicket.user = receiverId;
      receiverTicket.user = senderId;

      await senderTicket.save();
      await receiverTicket.save();
    }

    await exchangeRequest.save();

    res.status(200).json({ message: `Exchange request ${status} successfully`, exchangeRequest });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while updating exchange request' });
  }
});
