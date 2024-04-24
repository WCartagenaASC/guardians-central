
const express = require('express');
const cors = require('cors');
const getWeeklyRotatorsJS = require('./getWeeklyRotatorsJS');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });

app.get('/', (req, res) => {
    res.json({ message: "Server is running on port 8000." });
});

app.get('/weeklyrotators', async (req, res) => {
    let getWeeklyRotators = await getWeeklyRotatorsJS();
    res.json({getWeeklyRotators});
    console.log(getWeeklyRotators);
});