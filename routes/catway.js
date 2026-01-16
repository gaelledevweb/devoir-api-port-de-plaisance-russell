const express = require('express');
const router = express.Router();
const catwayCtrl = require('../controllers/catwayController');
const auth = require('../middleware/auth');
const reservationCtrl = require('../controllers/reservationController');
const Catway = require('../models/catway');

router.get('/', auth, catwayCtrl.getAllCatways);
router.get('/:id', auth, catwayCtrl.getCatwayById);
router.post('/', auth, catwayCtrl.createCatway);
router.put('/:id', auth, catwayCtrl.updateCatway);
router.delete('/:id', auth, catwayCtrl.deleteCatway);

router.get('/:id/reservations', auth, reservationCtrl.getReservationsByCatway);

router.get('/', auth, async (req, res) => {
    try {
        const allCatways = await Catway.find().sort({ catwayNumber: 1 });

        res.render('catways', { catways: allCatways });
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des catways");
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const data = await Catway.find();
        console.log("Données trouvées :", data);
        res.render('catways', { catways: data });
    } catch (error) {
        res.status(500).send("Erreur");
    }
});

module.exports = router;