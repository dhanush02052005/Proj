const express = require('express');
const axios = require('axios');
const SlidingWindow = require('./window');
const dotenv = require('dotenv').config();

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const window = new SlidingWindow(WINDOW_SIZE);
const TOKEN = process.env.TOKEN;

const validIds = {
    p: 'primes',
    f: 'fibo',
    e: 'even',
    r: 'rand'
};

const API_BASE = 'http://20.244.56.144/evaluation-service/';

app.get('/numbers/:numberid', async (req, res) => {
    const id = req.params.numberid;
    if (!validIds[id]) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    const url = `${API_BASE}${validIds[id]}`;
    const prevState = window.getWindow();

    let response;
    try {
        response = await axios.get(url, { 
            headers: {
                Authorization: `Bearer ${TOKEN}`
            },
            timeout: 500 });
    } catch (err) {
        return res.status(200).json({
            windowPrevState: prevState,
            windowCurrState: prevState,
            numbers: [],
            avg: window.getAverage()
        });
    }

    const receivedNumbers = response.data.numbers || [];
    window.addNumbers(receivedNumbers);
    const currState = window.getWindow();

    res.json({
        windowPrevState: prevState,
        windowCurrState: currState,
        numbers: receivedNumbers,
        avg: window.getAverage()
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
