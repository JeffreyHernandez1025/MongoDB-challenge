// Will help us access .env files
require('dotenv').config();
// All other Deps
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;

// set up your middleware
app.use(express.json());
app.use(cors());

// Extablish connection to mongodb
MongoClient.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;

    console.log('connected')

    db = client.db('journals')
});


// Add journal to server
app.post('/add-journal', (req, res) => {
    // Gets the data from method post, data sent from Postman
    const incomingData = req.body;
    // Adds journal to the mongodb
    db.collection('journal-entry').insertOne(incomingData, (err, result) => {
        if (err) throw err;

        res.status(200).send(result);
    });
    
});


// Index get request
app.get('/', (req, res) => {
    res.status(200).send({
        message: "server ok"
    })
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
