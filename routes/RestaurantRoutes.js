const express = require('express');
const restaurantModel = require("../models/Restaurant")
const router = express.Router();

// GET all 
//http://localhost:3000/restaurants
// GET by restaurant id (with sort by ASC or DESC)
// http://localhost:3000/restaurants?sortBy=[ASC | DESC]
router.get('/', async (req, res) => {
    try {
        const { sortBy } = req.query;
        // If sortBy query exists and is populated, return sorted results
        if (sortBy) {
            const order = String(sortBy).toUpperCase() === "DESC" ? -1 : 1; // Defaults to 1 (ASC) if not "DESC"
            const sortedResults = await restaurantModel
            // Selected columns
            .find({}, { _id: 1, cuisine: 1, name: 1, city: 1, restaurant_id: 1 })
            .sort({restaurant_id: order});
            // Use return to ensure following res.status().send() is not ran (outside of if)
            return res.status(200).send(sortedResults);
        }
        // If no sortBy query, find and send all
        const restaurants = await restaurantModel.find({});
        res.status(200).send(restaurants);

    } catch (err) {
        res.status(500).send(err);
    }
});

// GET by cuisine type
//http://localhost:3000/restaurants/cuisine/{cuisine_type}
router.get('/cuisine/:cuisine', async (req, res) => {
    try {
        const cuisine = req.params.cuisine;
        // RegEx for case-insensitivity (both "bakery" and "Bakery" can be used as a param)
        const restaurants = await restaurantModel.find({cuisine : { $regex: new RegExp(`^${cuisine}$`, "i" )}});

        res.status(200).send(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
});

// GET filtered Delicatessens
// http://localhost:3000/restaurants/Delicatessen
router.get('/Delicatessen', async (req, res) => {
    try {
        const results = await restaurantModel
            .find(
                // Filter to ensure that only restaurants with cuisine type of "Delicatessen" outside of Brooklyn are chosen
                { cuisine: "Delicatessen", city: { $ne: "Brooklyn"} },
                { _id: 0, cuisine: 1, name: 1, city: 1 }
            )
            // Sort by name, ascending order
            .sort({ name: 1 });

        res.status(200).send(results);

    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;