const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Function to mimic consistent incoming traffic and measure performance
app.get('/consistent-traffic-test/:numRequests/:interval', async (req, res) => {
    const numRequests = parseInt(req.params.numRequests);
    const interval = parseInt(req.params.interval) * 1000; // Convert interval to milliseconds

    // Record start time of the entire run
    const overallStartTime = new Date();

    // Arrays to store start and end times of each request
    const startTimes = [];
    const endTimes = [];

    // Function to make a request to the serverless function
    const sendRequest = async () => {
        const startTime = new Date();
        startTimes.push(startTime);

        // Make HTTP request to serverless function endpoint
        await axios.get('https://lab2function.azurewebsites.net/api/HTTPCreatDocument?code=vMbc3x-9pOGny-jIXmKqmELr1Tp58G984hu2G-FZ2Y_eAzFuOKI-cA==');

        const endTime = new Date();
        endTimes.push(endTime);
    };

    // Function to handle interval and send requests repeatedly
    const sendRequestsInterval = setInterval(async () => {
        // Send request to serverless function
        await sendRequest();

        // Check if all requests have been sent
        if (startTimes.length === numRequests) {
            clearInterval(sendRequestsInterval); // Stop sending requests
            const overallEndTime = new Date();

            // Calculate average duration for each request
            const totalDuration = endTimes.reduce((acc, endTime, index) => {
                const startTime = startTimes[index];
                const duration = endTime - startTime;
                return acc + duration;
            }, 0);
            const averageDuration = totalDuration / numRequests;

            // Return results
            res.json({
                overallStartTime,
                overallEndTime,
                startTimes,
                endTimes,
                averageDuration
            });
        }
    }, interval);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
