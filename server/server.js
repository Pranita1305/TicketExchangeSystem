const exchangeRoutes=require('./routes/exchangeRoutes');
application.use('/api/exchanges',exchangeRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);
