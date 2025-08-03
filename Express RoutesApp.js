const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URI
const uri = "mongodb://lab4:MUtsIjQlJOQvhXfMTBUB0C3W2T4VuDQgd8mwBiBJXmfqUMGXBkl3bDTVwdY4ePk6q59YURsF8eX2ACDbv0bpNQ==@lab4.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@lab4@";

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to parse JSON requests
app.use(express.json());

// Route to handle POST requests to create a document
app.post('/create-document', async (req, res) => {
    try {
        // Connect to MongoDB
        await client.connect();

        // Access the target database and collection
        const database = client.db('lab4db');
        const collection = database.collection('newDB');

        // Insert the document into the collection
        const result = await collection.insertOne(req.body);

        // Return success response
        res.status(201).json({ id: result.insertedId, message: 'Document created successfully' });
    } catch (err) {
        // Log error and return failure response
        console.error(err.stack);
        res.status(500).json({ message: 'Failed to create document' });
    } finally {
        // Close the MongoDB client connection
        await client.close();
    }
});

// Route to handle GET requests to read a document
app.get('/read-document', async (req, res) => {
    try {
        // Connect to MongoDB
        await client.connect();

        // Access the target database and collection
        const database = client.db('lab4db');
        const collection = database.collection('newDB');

        // Find the document by ID (replace with your logic)
        const document = await collection.findOne({ id: req.query.id });

        // Return the document if found
        if (document) {
            res.status(200).json(document);
        } else {
            res.status(404).json({ message: 'Document not found' });
        }
    } catch (err) {
        // Log error and return failure response
        console.error(err.stack);
        res.status(500).json({ message: 'Failed to read document' });
    } finally {
        // Close the MongoDB client connection
        await client.close();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
