const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var tame = new Date().toString();
    var log = `Time now: ${tame}: ${ req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log);
    next();
});

// app.use((req, res, next) => {
//     res.render('mainteinance.hbs');
// });

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt' , (text) => {
    return text.toUpperCase();
});



app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeNote: 'Welcome to Building Server using Node.js and Express'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About us'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to find the requested page, ensure correct path please.'
    })
});

app.listen(port, () => {
    console.log(`Server started and listening to the port ${port}`);
});