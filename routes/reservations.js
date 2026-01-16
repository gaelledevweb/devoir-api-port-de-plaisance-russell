const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');
const User = require('../models/user');

// Afficher la page des réservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        const users = await User.find();
        res.render('reservations_catway', {
            reservations: reservations,
            users: users,
            catwayNumber: "Général"
        });
    } catch (err) {
        res.status(500).send("Erreur de récupération");
    }
});

// Ajouter une réservation
router.post('/add', async (req, res) => {
    try {
        const newReservation = new Reservation({
            catwayNumber: req.body.catwayNumber,
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });
        await newReservation.save();
        res.redirect('/reservations');
    } catch (error) {
        console.error("Erreur ajout :", error);
        res.status(500).send("Erreur lors de l'enregistrement");
    }
});

// Afficher le formulaire d'ajout
router.get('/new/:catwayNumber', (req, res) => {
    const catwayNumber = req.params.catwayNumber;
    res.render('reservation_form', { catwayNumber });
});

router.get('/catways/:id/reservations/new', (req, res) => {
    const catwayNumber = req.params.id;
    res.render('reservation_form', { catwayNumber });
});

// Supprimer une réservation
router.post('/:id/delete', async (req, res) => {
    await Reservation.findByIdAndDelete(req.params.id);
    res.redirect('/reservations');
});

router.delete('/catways/:id/reservations/:resId', async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.resId);
        res.redirect('/reservations');
    } catch (err) {
        res.status(500).send("Erreur lors de la suppression");
    }
});

module.exports = router;