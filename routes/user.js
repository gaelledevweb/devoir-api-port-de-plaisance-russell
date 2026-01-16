const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const auth = require('../middleware/auth');

// Liste des utilisateurs
router.get('/', auth, userCtrl.getAllUsers);

// Formulaire de création
router.get('/new', auth, userCtrl.createUser);
router.get('/add', auth, (req, res) => {
    res.render('user_form');
});

// Détails d'un utilisateur par email
router.get('/:email', auth, userCtrl.getUserByEmail);

// Action de création
router.post('/', auth, userCtrl.createUser);

// Modification et Suppression
router.put('/:email', auth, userCtrl.updateUser);
router.delete('/:email', auth, userCtrl.deleteUser);

// Route pour afficher le formulaire de modification
router.get('/:email/edit', auth, userCtrl.getUserEditForm);

// Route pour traiter la modification (PUT)
router.put('/:email', auth, userCtrl.updateUser);

router.post('/add', auth, userCtrl.createUser);

// Route de déconnexion
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;