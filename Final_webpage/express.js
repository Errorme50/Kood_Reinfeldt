// server.js

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const axios = require('axios'); // Example API integration

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

const users = [];

// Dummy data for the logged-in user (replace with actual user data from the backend)
const loggedInUser = {
  username: "JohnDoe",
  firstName: "John",
  lastName: "Doe",
  age: 25,
  gender: "Male"
};

// Middleware to check if the user is logged in
function isLoggedIn(req) {
  return req.session && req.session.user;
}

// Middleware to check if the user is logged in
function requireLogin(req, res, next) {
  if (isLoggedIn(req)) {
    return next();
  } else {
    return res.redirect('/login');
  }
}

// Check if the session has timed out
function checkSessionTimeout(req, res, next) {
  const sessionTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds
  const currentTime = new Date().getTime();

  if (isLoggedIn(req) && req.session.lastActivity && currentTime - req.session.lastActivity < sessionTimeout) {
    // Update last activity timestamp
    req.session.lastActivity = currentTime;
    return next();
  } else {
    // Destroy session and redirect to login if the session has timed out
    req.session.destroy();
    return res.redirect('/login');
  }
}

// Update the user's last activity timestamp on each request
app.use((req, res, next) => {
  if (isLoggedIn(req)) {
    req.session.lastActivity = new Date().getTime();
  }
  next();
});

// Routes
app.get('/', checkSessionTimeout, (req, res) => {
  // Redirect to login if not logged in
  if (!isLoggedIn(req)) {
    return res.redirect('/login');
  }

  res.sendFile(__dirname + '/profile.html');
});

app.get('/about', requireLogin, checkSessionTimeout, (req, res) => {
  res.sendFile(__dirname + '/about.html');
});

app.get('/profile', requireLogin, checkSessionTimeout, (req, res) => {
  res.sendFile(__dirname + '/profile.html');
});

app.get('/contact', requireLogin, checkSessionTimeout, (req, res) => {
  res.sendFile(__dirname + '/contact.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple login validation (replace with a proper authentication mechanism)
  if (username && password) {
    // Store user session
    req.session.user = { username };
    return res.redirect('/');
  } else {
    return res.redirect('/login');
  }
});

// Logout endpoint
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Signup endpoint
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Simple signup validation (add more validation as needed)
  if (username && password) {
    // Store user in the dummy users array (replace with a database in production)
    users.push({ username, password });
    return res.redirect('/login');
  } else {
    return res.redirect('/login?signupFailed=true');
  }
});

// Example API integration
app.get('/api/data', requireLogin, checkSessionTimeout, async (req, res) => {
  try {
    // Example API endpoint - replace with your actual API endpoint
    const apiResponse = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    res.json(apiResponse.data);
  } catch (error) {
    console.error('API Request Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
