const {trips}=require("../models/user.js")
const retrieveAllTrips = (req, res) => {
    const allTrips = trips;
    res.status(200).json({
        status: 'success',
        message: 'trips retrievedsuccessfully',
        results: allTrips.length,
        data: allTrips,
    });
};

const createTrip =(req,res)=>
{

 const {destinationName,
    location,
    continent,
    language,
    description,
    flightCost,
    accomadationCoast,
    mealCost,
    visaCost,
    transportationCost,
    currenceCost}=req.body;

const newTrip={
    id:trips.length+1,
    destenationName,
    location,
    continent,
    language,
    description,
    flightCost,
    accomadationCoast,
    mealCost,
    visaCost,
    transportationCost,
    currenceCost
}
trips.push(newTrip);

}

const deleteTripById=(req,res)=>
{
    const id=Number(req.parms.id);
    const index=trips.findIndex(t=>t.id==id);
    trips.slice(index,1);
}

module.exports
{retrieveAllTrips,createTrip}
