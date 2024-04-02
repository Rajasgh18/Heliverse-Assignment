const mongoose = require('mongoose');
const { Schema } = mongoose;
const TeamSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
}, { timestamps: true });

module.exports = mongoose.model('teams', TeamSchema);