const retrieveAllTrips = (req, res) => {
    const allTrips = trips;
    res.status(200).json({
        status: 'success',
        message: 'trips retrievedsuccessfully',
        results: allTrips.length,
        data: allTrips,
    });
};
