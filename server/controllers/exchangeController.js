
const ExchangeRequest = require('../models/ExchangeRequest');
const Ticket = require('../models/Ticket');

// Request exchange
exports.requestExchange = async (req, res) => {
  const { offeredTicket, requestedTicket } = req.body;

  try {
    const request = new ExchangeRequest({
      requester: req.user.id,
      offeredTicket,
      requestedTicket
    });
    await request.save();
    res.status(201).json({ message: 'Exchange request sent', request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all exchange requests for logged-in user
exports.getMyExchangeRequests = async (req, res) => {
  try {
    const requests = await ExchangeRequest.find({
      requester: req.user.id
    }).populate('offeredTicket requestedTicket');

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all requests *for* a user's ticket
exports.getRequestsForMyTickets = async (req, res) => {
  try {
    const myTickets = await Ticket.find({ owner: req.user.id });
    const ticketIds = myTickets.map(t => t._id);

    const requests = await ExchangeRequest.find({
      requestedTicket: { $in: ticketIds }
    }).populate('requester offeredTicket requestedTicket');

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Accept an exchange request
exports.acceptExchange = async (req, res) => {
  try {
    const exchange = await ExchangeRequest.findById(req.params.id).populate('offeredTicket requestedTicket');
    if (!exchange) return res.status(404).json({ message: 'Exchange request not found' });

    if (exchange.status !== 'pending') {
      return res.status(400).json({ message: 'Request already processed' });
    }

    // Swap ownership of tickets
    const requesterId = exchange.requester.toString();
    const ownerId = req.user.id;

    const offered = await Ticket.findById(exchange.offeredTicket._id);
    const requested = await Ticket.findById(exchange.requestedTicket._id);

    if (!offered || !requested) {
      return res.status(404).json({ message: 'One or both tickets not found' });
    }

    if (requested.owner.toString() !== ownerId) {
      return res.status(403).json({ message: 'You do not own the requested ticket' });
    }

    // Swap owners
    const tempOwner = offered.owner;
    offered.owner = requested.owner;
    requested.owner = tempOwner;

    await offered.save();
    await requested.save();

    exchange.status = 'accepted';
    await exchange.save();

    res.json({ message: 'Exchange accepted and tickets swapped!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject an exchange request
exports.rejectExchange = async (req, res) => {
  try {
    const exchange = await ExchangeRequest.findById(req.params.id);
    if (!exchange) return res.status(404).json({ message: 'Exchange request not found' });

    if (exchange.status !== 'pending') {
      return res.status(400).json({ message: 'Request already processed' });
    }

    exchange.status = 'rejected';
    await exchange.save();

    res.json({ message: 'Exchange request rejected' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
