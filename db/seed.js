const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const adminExists = await User.findOne({ email: 'admin@port-russell.fr' });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('password123', 10);
            const admin = new User({
                username: 'Administrateur',
                email: 'admin@port-russell.fr',
                password: 'password123'
            });

            await admin.save();
            console.log("Compte admin créé avec succès !");
            console.log("Email : admin@port-russell.fr | MDP : password123");
        } else {
            console.log("Le compte admin existe déjà.");
        }

        mongoose.connection.close();
    } catch (error) {
        console.error("Erreur lors du seeding :", error);
    }
};

seedAdmin();