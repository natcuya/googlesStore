const express = require('express');
const morgan = require('morgan');
const google = require('./google.js');
const cors = require('cors');
const app = express();

const apps = require('./google.js')
app.use(cors());
app.use(morgan('common')); // let's see what 'common' format looks like

app.get('/apps', (req, res) => {
    const {sort, genre} = req.query;
    let results = google;

    if(sort) {
        if(!['rating', 'app'].includes(sort)) {
            return res.status(400).send('Sort must be one of rating or app')
        }
//sort by results by rating
        if(sort === 'rating') {
            results.sort((a, b) => b.Rating - a.Rating)
        }
        if(sort === 'app') {
            results.sort((a, b) => a.App.localeCompare(b.App))
        }
    }

    if(genre) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
            return res.status(400).send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card')
        }
        results = results.filter(app => {
            return app.Genres.includes(genre);
        });
    }

    res.json(results)
});


module.exports = app