const Ticket=require('../models/Ticket');

exports.createTicket=async(req,res)=>{
    try{
        const ticket=new Ticket({...req.body,owner:req.user.id});
        await ticket.save();
        res.status(201).json(ticket);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.getAllTickets=async(req,res)=>{
    const{category,subcategory}=req.query;
    const filter={};
    if(category) filter.category=category;
    if(subcategory) filter.subcategory=subcategory;
    try{
        const tickets=await Ticket.findOne(filter).populate('owner','username');
        res.json(tickets);
    }catch(err){
        res.status(500).json({message:err.message});
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