const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connectée !");
    } catch (err) {
        console.error("Erreur de connexion", err);
        process.exit(1);
    }
};

module.exports = connectDB;