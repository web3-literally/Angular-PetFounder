const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    id: String,
    userId: {
        type: String,
        required: true
    },
    petName: {
        type: String,
        required: true
    },
    collarTagDescription: String,
    petType: {
        type: String,
        required: true
    },
    desexed: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    colour: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    ageUnit: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    microchipped: {
        type: String,
        required: true
    },
    microchipNumber: {
        type: Number,
        required: true
    },
    reward: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    foundLost: {
        type: String,
        required: true
    },
    desc: String,
    gallery: {
        type: Array,
        required: true
    },

    lat: Number,
    lng: Number,
    location: String,
}, {
    versionKey: false
});

PetSchema.pre('save', function (next) {
    this.id = this._id.toString();
    next();
});
module.exports = mongoose.model('Pets', PetSchema);
