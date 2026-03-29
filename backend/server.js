require('dotenv').config();

// Connecting "libraries"
const express = require('express'); 
// Routes
const healthRoute = require('./src/routes/health');
const dbRoute = require('./src/routes/dbroutes');
// Middleware
const errorHandler = require('./middleware/errorHandler');

// app = HTTP server + routes + middleware.
const app = express(); // Create an object of Express app.
app.set('trust proxy', true); // Trust nginx proxy

app.use(express.json());

app.get('/', (req, res) => {
  res.send('OK');
});

app.get('/api', (req, res) => {
  res.json({ message: 'API works' });
});

// Connecting routes
app.use('/health', healthRoute);
app.use('/api', dbRoute);
app.use(errorHandler); // Last one in the list for catching all errors.

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
