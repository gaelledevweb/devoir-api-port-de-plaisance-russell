const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const auth = require('../middleware/auth');
const Reservation = require('../models/reservation');

// Page d'accueil
router.get('/', (req, res) => {
    res.render('index');
});

// Route pour la documentation
router.get('/api-docs', (req, res) => {
    res.render('documentation');
});

router.post('/login', userCtrl.login);
router.get('/dashboard', auth, userCtrl.getDashboard);
router.get('/dashboard', auth, async (req, res) => {
    try {
        const reservations = await Reservation.find();

        res.render('dashboard', {
            user: req.user,
            reservations: reservations,
            date: new Date().toLocaleDateString('fr-FR')
        });
    } catch (error) {
        res.status(500).send("Erreur lors du chargement du tableau de bord");
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;