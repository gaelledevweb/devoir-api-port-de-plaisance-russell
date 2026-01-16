const express = require('express');
const connectDB = require('./db/database');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();

// Configuration
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

// Connexion DB
connectDB();

// Routes
app.use('/', require('./routes/index'));
app.use('/catways', require('./routes/catway'));
app.use('/users', require('./routes/user'));
app.use('/reservations', require('./routes/reservations'));
app.use('/', require('./routes/reservations'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));

app.get("/", (req, res) => res.send("API Express sur Vercel !"));

app.get('/favicon.ico', (req, res) => res.status(204).end()); 

module.exports = app;