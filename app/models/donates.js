const Mongoose = require('mongoose');
const donateSchema = new Mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
    },
);

Mongoose.model('Donate', donateSchema);
module.exports = Mongoose.model('Donate');