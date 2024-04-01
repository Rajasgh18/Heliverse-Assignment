const mongoose = require("mongoose");

const connetToDB = () => {
    mongoose.connect('mongodb+srv://rajasgh18:12344321@kingcluster.wmdb4w5.mongodb.net/Assignment');
    const db = mongoose.connection;
    db.on('connected', () => console.log("MongoDB is connected"));
    db.on('error', (err) => { throw new Error(err) });
};

module.exports = connetToDB;