
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

exports.createExchangeRequest = async (req, res) => {
  try {
    const { fromTicket, toTicket } = req.body;
    const fromUser = req.user.id;

    const request = new ExchangeRequest({
      fromUser,
      fromTicket,
      toTicket,
      status: 'pending',
    });

    await request.save();
    res.status(201).json({ message: 'Exchange request created.', request });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create request.', error: err.message });
  }
};

exports.getUserExchangeRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const requests = await ExchangeRequest.find({
      $or: [
        { fromUser: userId },
        { toUser: userId },
      ],
    }).populate('fromUser toUser fromTicket toTicket');

    res.status(200).json({ requests });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests.', error: err.message });
  }
};



exports.addTicket = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, category, subcategory, date } = req.body;

    const newTicket = new Ticket({
      owner: userId,
      title,
      category,
      subcategory,
      date,
    });

    await newTicket.save();
    res.status(201).json({ message: 'Ticket added successfully.', ticket: newTicket });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add ticket.', error: err.message });
  }
};

exports.getUserTickets = async (req, res) => {
  try {
    const userId = req.user.id;
    const tickets = await Ticket.find({ owner: userId });
    res.status(200).json({ tickets });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tickets.', error: err.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const userId = req.user.id;
    const ticketId = req.params.id;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found.' });

    if (ticket.owner.toString() !== userId)
      return res.status(403).json({ message: 'Unauthorized to delete this ticket.' });

    await Ticket.findByIdAndDelete(ticketId);
    res.status(200).json({ message: 'Ticket deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete ticket.', error: err.message });
  }
};