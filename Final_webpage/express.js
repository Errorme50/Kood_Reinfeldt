const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
app.set('view engine', 'ejs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(express.static('public'));


const users = {};

const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/', (req, res) => {
    if (req.session.user) {
        res.sendFile(__dirname + '/public/home.html');
    } else {
        res.redirect('/login');
    }
});

app.get('/about', requireAuth, (req, res) => {
    res.sendFile(__dirname + '/public/about.html');
});

app.get('/profile', requireAuth, (req, res) => {
    res.sendFile(__dirname + '/views/profile.ejs');
});

app.get('/contact', requireAuth, (req, res) => {
    res.sendFile(__dirname + '/public/contact.html');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.post('/register', (req, res) => {
    const { username, password, firstName, lastName, age, gender } = req.body;

    // Check if the username is already taken
    if (users[username]) {
        return res.send('Username already taken.');
    }

    // Save user data (without hashing the password)
    users[username] = {
        username,
        password,
        firstName,
        lastName,
        age,
        gender
    };

    console.log('User registered:', users[username]);

    res.redirect('/login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists
    if (!users[username]) {
        console.log('User not found. Users:', users);
        return res.status(401).send('User not found.');
    }

    // Check if the password matches (plaintext comparison)
    if (users[username].password !== password) {
        console.log('Incorrect password.');
        return res.status(401).send('Incorrect password.');
    }

    console.log('Login successful:', username);

    // Set the session variable
    req.session.user = username;

    // Redirect to the profile page
    res.redirect('/');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});