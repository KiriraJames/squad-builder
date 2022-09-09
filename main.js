const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
const apicache = require('apicache');

// environment variables
require('dotenv').config()

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

const port = process.env.PORT || 4000;
 
const app = express()

// set static folders
app.use(express.static('public'));

// cors
app.use(cors());


// rate limiting
const limiter = rateLimit({
    // api limit is 10 per min(60000ms)
    windowMs: 1 * 60 * 1000,
    max: 9,
    standardHeaders: true,
    requestPropertyName: 'RateLimit',
	handler: (request, response, next, options) => {
        
        // if limit reached wait until reset time then go to next()
        if (request.RateLimit.remaining) {
            next()
        } else {
            let delayInMilliseconds = Math.abs(Date.parse(request.RateLimit.resetTime) - Date.now()) + 500
            setTimeout( () => next(), delayInMilliseconds );
        }

    },
})
app.use(limiter);
app.set('trust proxy', 1);


// caching requests
let cache = apicache.middleware
const cacheIfSuccessResponse = cache('1 hour', (req, res) => res.statusCode === 200 )


// routes
app.get('/api/leagues', cacheIfSuccessResponse, async(req, res) => {

    await fetch(API_BASE_URL + '/competitions', {
            mode: 'cors',
            headers: {
                [API_KEY_NAME]: API_KEY_VALUE,
            }
        })
        .then(response => response.json())
        .then(data => {

            if (data.errorCode) {
                res.status(data.errorCode).json(data);
            }

            let leagues = []
            let competitions = data.competitions
            leagues = competitions.filter( competition => competition.type === 'LEAGUE' )

            res.status(200).json(leagues);
        })
        .catch(error => {
            console.log('error', error);
            res.status(500).json(error)
        })

})


app.get('/api/league/:leagueId/teams', cacheIfSuccessResponse, async(req, res) => {

    let url = API_BASE_URL + '/competitions/' + req.params['leagueId'] + '/teams'

    await fetch(url, {
        mode: 'cors',
        headers: {
            [API_KEY_NAME]: API_KEY_VALUE,
        }
    })
    .then(response => response.json())
    .then(data => {

        if (data.errorCode) {
            res.status(data.errorCode).json(data);
        }

        let teams = data.teams

        res.status(200).json(teams);
    })
    .catch(error => {
        console.log('error', error);
        res.status(500).json(error)
    })

})


app.get('/api/teams/:teamId', cacheIfSuccessResponse, async(req, res) => {

    let url = API_BASE_URL + '/teams/' + req.params['teamId']

    await fetch(url, {
        mode: 'cors',
        headers: {
            [API_KEY_NAME]: API_KEY_VALUE,
        }
    })
    .then(response => response.json())
    .then(data => {

        if (data.errorCode) {
            res.status(data.errorCode).json(data);
        }
        
        res.status(200).json(data);
    })
    .catch(error => {
        console.log('error', error);
        res.status(500).json(error)
    })

})

app.listen(port);

