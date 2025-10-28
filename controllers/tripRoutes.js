const express = require('express')
const{
    createTrip,
    retrieveAllTrips
}   = require("../controllers/tripController.js")
const tripRouter = express.Router();

tripRouter
.route('/')
.get(retrieveTrips)
.post(createTrip)

module.exports = tripRouter;
