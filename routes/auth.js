const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Importation du contrôleur
const authController = require('../controllers/authController');

// La route POST appelle la fonction du contrôleur
router.post('/auth/login', authController.login);

// POST /login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;
        req.session.username = user.username;
        return res.redirect('/dashboard');
    }
    res.render('login', { error: 'Identifiants invalides' });
});

// Route pour afficher la page (GET)
router.get('/login', (req, res) => {
    res.render('login');
});

// Route pour traiter le formulaire (POST)
router.post('/login', authController.login);

// GET /logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;