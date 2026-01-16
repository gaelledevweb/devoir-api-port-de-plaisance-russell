const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Lister tous les utilisateurs 
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.render('users', { users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un utilisateur par email 
exports.getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }, '-password');
        if (!user) return res.status(404).send("Utilisateur non trouvé");
        res.render('user_details', { user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer un utilisateur 
exports.createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();
        res.redirect('/users');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Modifier un utilisateur 
exports.updateUser = async (req, res) => {
    try {
        const updateData = { username: req.body.username };

        if (req.body.password) {
            updateData.password = await bcrypt.hash(req.body.password, 10);
        }
        await User.findOneAndUpdate({ email: req.params.email }, updateData);
        res.redirect('/users');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un utilisateur 
exports.deleteUser = async (req, res) => {
    try {
        await User.findOneAndDelete({ email: req.params.email });
        res.redirect('/users');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Affiche le formulaire avec les données de l'utilisateur
exports.getUserEditForm = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).send("Utilisateur non trouvé");
        res.render('user_edit', { user });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Traite la mise à jour (Route PUT /users/:email)
exports.updateUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        let updateData = { username };
        if (password && password.trim() !== "") {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await User.findOneAndUpdate({ email: req.params.email }, updateData);
        res.redirect('/users');
    } catch (error) {
        res.status(400).send("Erreur lors de la mise à jour");
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const User = require('../models/user');
        const bcrypt = require('bcrypt');
        const jwt = require('jsonwebtoken');

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("Utilisateur non trouvé");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send("Mot de passe incorrect");
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'CLE_DE_SECOURS_TEST',
            { expiresIn: '24h' }
        );

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Détail de l'erreur login :", error);
        res.status(500).send("Erreur interne du serveur");
        console.log("L'ERREUR PRECISE EST : ", error.message);
        res.status(500).send("Erreur interne du serveur");
    }
};

exports.getDashboard = async (req, res) => {
    try {
        const Reservation = require('../models/reservation');
        const reservations = await Reservation.find().limit(10);

        res.render('dashboard', {
            user: req.user,
            reservations: reservations,
            date: new Date().toLocaleDateString('fr-FR')
        });
    } catch (error) {
        console.error(error);
        res.render('dashboard', {
            user: req.user,
            reservations: [],
            date: new Date().toLocaleDateString('fr-FR')
        });
    }
};