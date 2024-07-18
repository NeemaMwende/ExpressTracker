const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expenseRoutes = require('./routes/expenses');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact'); // Import the contact routes
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/expenses', expenseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes); // Use the contact routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
