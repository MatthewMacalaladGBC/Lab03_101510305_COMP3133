const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    address: {
        building: {
            type: String,
            required: false, // Not every provided address has the building field
            trim: true
        },
        street: {
            type: String,
            required: true,
            trim: true
        },
        zipcode: {
            type: String,
            required: false, // Even though every restaurant has the field, some are set to null
            trim: true
        }
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    cuisine: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    restaurant_id: {
        type: String,
        required: true,
        trim: true
    }
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema, "Restaurants");
module.exports = Restaurant;