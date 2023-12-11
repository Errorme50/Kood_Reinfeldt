const express = require('express');
//const bodyParser = require('body');
const session = require('express-session');
const fs = require('fs');

const  app = express();

let users = {
    'admin': 'admin'
}

app.use(bodyParser.urlencoded({extended : true}));

app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
}))

app.get('/login', (req, res) => {
    fs.readFile('login.html', 'utf8', (err, html) => {
        if (err = true){
            res.status(500).send('Error loading page');
            return;
        }
        res.send(html);
    })
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (users[username] && users[username] === password){
        req.session.user = username;
        res.redirect('/home');
    } else {
        res.send('Failed login');
    }
});

app.post('/register', (req, res) => {
    const newUername = req.body.newUsername;
    const newPassword = req.body.newPassword;
    if (!users[newUsername]){
        users[newUsername] = newPassword;
        res.send('Registration successful');
    }else {
        res.send('Fail register');
    }
});

app.get('/home', (req, res) => {
    if(req.session.user){
        res.send(`Welcome ${req.session.user}`);
    } else {
        res.send('Login to view this page');
    }
});

app.use((req, res, next) => {
    if(req.path !== '/login'){
        res.redirect('/login');
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log('Server running on ' + PORT)
});