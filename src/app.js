const express = require('express');
const path = require('path');

const app = express();
const cookieParser = require('cookie-parser')
const authRoutes = require('./router/auth.routes')
const foodRoutes = require('./router/food.routes')
const cors = require('cors')
const foodPartnerRoutes = require('./router/foodPartner.routes')


app.use(cors({
  origin: true,
  credentials: true,
}));



app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));



// Home route
app.get('/', (req, res) => {
  res.send('SERVER runing');
});

// auth routes
app.use('/api/auth', authRoutes)
app.use('/api/food', foodRoutes)
app.use('/api/food-partner', foodPartnerRoutes)

module.exports = app;

