const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const Post = require('./models/restaurant.model.');
const Admin = require('./models/admin.model');
const User = require('./models/user.model');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

const adminRoutes = require('./routes/admin.route');
const userRoutes = require('./routes/user.route');
const restaurantRoutes = require('./routes/restaurant.route');

app.use('/api/posts', restaurantRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

mongoose.connect('mongodb://localhost:27017/hotelDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(3000, async () => {
  console.log('Server is running on http://localhost:3000');
  // await initializeData();
});

app.get("/", (req, res) => {
  res.json({
    Message: "Server Started Successfully",
  });
});
