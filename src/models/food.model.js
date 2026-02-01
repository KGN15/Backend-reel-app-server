const mongoose = require('mongoose');


// food Schema
const foodSchima = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    vidio: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodpartner"
    },
    likeCount: {
        type: Number,
        default: 0
    },
    savedCount: {
        type: Number,
        default: 0
    },

},
    {
        timestamps: true,
    }
)
const foodModel = mongoose.model('food', foodSchima)
module.exports = foodModel;