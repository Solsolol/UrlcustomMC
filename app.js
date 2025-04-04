const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();

// Add detailed logging
app.use((req, res, next) => {
    console.log('Incoming request:', {
        method: req.method,
        path: req.path,
        headers: req.headers,
        body: req.body
    });
    next();
});

// Add this before other routes
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

const submodules = [
    require('./modules/discount-code/app/app'),
    require('./modules/discount-redemption-split/app/app'),
];

// Add these headers before other middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://*.exacttarget.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    next();
});

// parse application/json
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 8080));
app.use('/', express.static(path.join(__dirname, 'home')));
app.use('/assets', express.static(path.join(__dirname, '/node_modules/@salesforce-ux/design-system/assets')));

submodules.forEach((sm) => sm(app, {
    rootDirectory: __dirname,
}));

// Après vos middlewares existants
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    next();
});

// Add this at the end of your app.js file
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(app.get('port'), function() {
    console.log(`Express is running at port: ${app.get('port')}`);
    console.log('Environment:', process.env.NODE_ENV);
});
