require('dotenv').config();
const express = require('express');
var helmet = require('helmet');
var cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

var bodyParser = require('body-parser');
var UAParser = require('ua-parser-js');

const app = express();
app.use(cors());
app.use(helmet());

app.set('trust proxy', true)

var parser = new UAParser();

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const path = require('path');
const router = express.Router();

if (process.env.ENV == 'dev') {
    app.use(express.static('dev'));
}else {
    app.use(express.static('public'));
}

app.use(express.json({ limit: '10kb' })); // Body limit is 10
// Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());
// Data Sanitization against XSS attacks
app.use(xss());

app.listen(process.env.PORT || 3000);

console.log('Running at Port 3000');