const mongoose=require('mongoose');

const exchangeRequestSchema=new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    offeredTicket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
    requestedTicket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
    status: { type: String, default: 'pending' },
},{timestamps:true});

module.exports=mongoose.model('ExchangeRequest',exchangeRequestSchema);