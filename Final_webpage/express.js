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

const feedbacks = [];

// Middleware to check if the user is authenticated


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
