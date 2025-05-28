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