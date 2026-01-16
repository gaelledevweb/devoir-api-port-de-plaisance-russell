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

// Connexion DB avec gestion d'erreur pour éviter le crash Vercel
connectDB().catch(err => console.error("Erreur de connexion initiale MongoDB:", err));

// Routes
app.use('/', require('./routes/index'));
app.use('/catways', require('./routes/catway'));
app.use('/users', require('./routes/user'));
app.use('/reservations', require('./routes/reservations'));

// Route de test
app.get("/status", (req, res) => res.status(200).json({ status: "ok", message: "Connecté !" }));

// Pour vercel
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Local: http://localhost:${PORT}`));
}

module.exports = app;