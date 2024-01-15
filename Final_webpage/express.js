const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Sample users array
const users = [];
const feedbacks = [];

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Routes
app.get('/', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/about', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '/public/about.html'));
});

app.get('/contact', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '/public/contact.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.user = username;
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

app.post('/login', (req, res) => {
  const { username, password, firstName, lastName, age, gender } = req.body;
  const existingUser = users.find(u => u.username === username);

  if (existingUser) {
    res.redirect('/login');
  } else {
    const newUser = { username, password, firstName, lastName, age, gender };
    users.push(newUser);
    req.session.user = username;
    res.redirect('/');
  }
});

app.get('/profile', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '/public/profile.html'));
});

app.post('/profile', isAuthenticated, (req, res) => {
  const { feedback } = req.body;
  const username = req.session.user;

  // Store feedback in an array 
  feedbacks.push({ username, feedback });
  res.redirect('/profile');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
