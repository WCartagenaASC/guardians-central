const express = require('express');
const cors = require('cors');
const getWeeklyRotatorsJS = require('./getWeeklyRotatorsJS');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

// Trust proxy headers set by Nginx
app.set('trust proxy', true);

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('/', (req, res) => {
    res.json({ message: "Server is running on port 8000." });
});

app.get('/weeklyrotators', async (req, res) => {
    let getWeeklyRotators = await getWeeklyRotatorsJS();
    res.json({getWeeklyRotators});
    console.log(getWeeklyRotators);
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});
