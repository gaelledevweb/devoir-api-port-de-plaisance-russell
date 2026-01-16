const Catway = require('../models/catway');

// Lister tous les catways
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render('catways', { 
           catways: catways, reservations: [] });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Récupérer un catway par son ID (catwayNumber)
exports.getCatwayById = async (req, res) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.id });
        if (!catway) return res.status(404).send("Catway non trouvé");
        res.render('catway_details', { catway });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer un catway
exports.createCatway = async (req, res) => {
    try {
        const catway = new Catway(req.body);
        await catway.save();
        res.redirect('/catways');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Modifier un catway
exports.updateCatway = async (req, res) => {
    try {
        await Catway.findOneAndUpdate({ catwayNumber: req.params.id }, req.body);
        res.redirect('/catways');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un catway
exports.deleteCatway = async (req, res) => {
    try {
        await Catway.findOneAndDelete({ catwayNumber: req.params.id });
        res.redirect('/catways');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};