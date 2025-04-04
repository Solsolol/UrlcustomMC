const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const submodules = [
    require('./modules/discount-code/app/app'),
    require('./modules/discount-redemption-split/app/app'),
];

const app = express();

// Add CORS headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
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

// Ajoutez une route de test
app.get('/ping', (req, res) => {
    res.send('pong');
});

app.listen(app.get('port'), function() {
    console.log(`Express is running at localhost: ${app.get('port')}`);
});
