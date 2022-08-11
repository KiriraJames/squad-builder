const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
const apicache = require('apicache');

require('dotenv').config()

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

const port = process.env.PORT || 5000;
 
const app = express()

app.use(express.static('public'));

let cache = apicache.middleware

app.get('/api/leagues', cache('5 minutes'), async(req, res) => {

    await fetch(API_BASE_URL + '/competitions', {
            mode: 'cors',
            headers: {
                [API_KEY_NAME]: API_KEY_VALUE,
            }
        })
        .then(response => response.json())
        .then(data => {
            
            console.log(data)

            let leagues = []
            let competitions = data.competitions
            leagues = competitions.filter( competition => competition.type === 'LEAGUE' )

            res.status(200).json(leagues);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error})
        })

})

app.get('/api/league/:leagueId/teams', cache('5 minutes'), async(req, res) => {

    let url = API_BASE_URL + '/competitions/' + req.params['leagueId'] + '/teams'

    await fetch(url, {
        mode: 'cors',
        headers: {
            [API_KEY_NAME]: API_KEY_VALUE,
        }
    })
    .then(response => response.json())
    .then(data => {

        console.log(data)

        let teams = data.teams

        res.status(200).json(teams);
    })
    .catch(error => {
        res.status(500).json({error})
    })

})

app.get('/api/teams/:teamId', cache('5 minutes'), async(req, res) => {

    let url = API_BASE_URL + '/teams/' + req.params['teamId']

    await fetch(url, {
        mode: 'cors',
        headers: {
            [API_KEY_NAME]: API_KEY_VALUE,
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(500).json({error})
    })

})

// app.get('/api/team/:teamId/players', async(req, res) => {
    
// })

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 9
    // api limit is 10 per min
})

app.use(limiter);
app.set('trust proxy', 1);

app.use(cors());

app.listen(port);

