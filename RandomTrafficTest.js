const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Function to generate a random interval between 0 and max milliseconds
const getRandomInterval = (max) => Math.floor(Math.random() * max);

// Function to mimic random incoming traffic and measure performance
app.get('/random-traffic-test/:numRequests', async (req, res) => {
    const numRequests = parseInt(req.params.numRequests);

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

    // Function to send requests repeatedly with random interval
    const sendRequestsRandomInterval = async () => {
        for (let i = 0; i < numRequests; i++) {
            // Send request to serverless function
            await sendRequest();

            // Generate random interval between requests
            const interval = getRandomInterval(5000); // Random interval between 0 and 5000 milliseconds
            await new Promise(resolve => setTimeout(resolve, interval)); // Wait for the interval before sending the next request
        }

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
    };

    // Start sending requests
    sendRequestsRandomInterval();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
