// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require ('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require ('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require ('cors');
const { response } = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('Website'));


// Setup Server
const port = 8000;

const server = app.listen(port, () => {
    console.log(`running on localhost:${port}`);
});

//GET Route
app.get('/all', (req, res) => {
    res.send(projectData);
});

//POST Route
app.post('/add', addData); 
function addData (req, res) {
    const newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse,
    };
    projectData = newEntry;
}
