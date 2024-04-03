const mongoose = require("mongoose");

const connetToDB = () => {
    mongoose.set("strictPopulate", false);
    mongoose.connect(process.env.MONGO_DB_URL);
    const db = mongoose.connection;
    db.on('connected', () => console.log("MongoDB is connected"));
    db.on('error', (err) => { throw new Error(err) });
};

module.exports = connetToDB;