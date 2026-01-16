const Reservation = require('../models/reservation');

exports.createReservation = async (req, res) => {
    try {
        const newReservation = new Reservation({
            catwayNumber: req.params.id,
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });

        await newReservation.save();
        res.status(201).redirect('/dashboard');
    } catch (error) {
        res.status(400).render('error', { message: "Erreur lors de la réservation" });
    }
};

exports.getReservationsByCatway = async (req, res) => {
    try {
        const catwayId = req.params.id;
        const reservations = await Reservation.find({ catwayNumber: catwayId });

        res.render('reservations_catway', {
            reservations,
            catwayNumber: catwayId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};