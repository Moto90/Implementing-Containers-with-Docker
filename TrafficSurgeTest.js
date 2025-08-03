const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Function to mimic a traffic surge and measure performance
app.get('/traffic-surge-test/:parallelRequests', async (req, res) => {
    const parallelRequests = parseInt(req.params.parallelRequests);

    // Record start time of the entire series of requests
    const seriesStartTime = new Date();

    // Arrays to store start and end times of each request
    const startTimes = [];
    const endTimes = [];

    // Send parallel requests to serverless function
    const serverlessPromises = Array(parallelRequests).fill().map(async () => {
        const startTime = new Date();
        startTimes.push(startTime);

        // Make HTTP request to serverless function endpoint
        await axios.get('https://lab2function.azurewebsites.net/api/HTTPCreatDocument?code=vMbc3x-9pOGny-jIXmKqmELr1Tp58G984hu2G-FZ2Y_eAzFuOKI-cA==');

        const endTime = new Date();
        endTimes.push(endTime);
    });

    // Send parallel requests to container function
    const containerPromises = Array(parallelRequests).fill().map(async () => {
        const startTime = new Date();
        startTimes.push(startTime);

        // Make HTTP request to container function endpoint
        await axios.get('https://lab4function.azurewebsites.net/api/ExpressRouteApp?code=vMbc3x-9pOGny-jIXmKqmELr1Tp58G984hu2G-FZ2Y_eAzFuOKI-cA==');

        const endTime = new Date();
        endTimes.push(endTime);
    });

    // Wait for all requests to finish
    await Promise.all([...serverlessPromises, ...containerPromises]);

    // Record end time of the entire series of requests
    const seriesEndTime = new Date();

    // Calculate average duration for each request
    const totalDuration = endTimes.reduce((acc, endTime, index) => {
        const startTime = startTimes[index];
        const duration = endTime - startTime;
        return acc + duration;
    }, 0);
    const averageDuration = totalDuration / (parallelRequests * 2); // Since we're sending requests to both serverless and container functions

    // Return results
    res.json({
        seriesStartTime,
        seriesEndTime,
        startTimes,
        endTimes,
        averageDuration
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
