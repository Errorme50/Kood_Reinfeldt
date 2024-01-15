const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const users = [
	users.username = admin
	,users.password = admin
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) return done(null, user);
  return done(null, false, { message: 'Incorrect username or password.' });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  } else {
    res.redirect('/login');
  }
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/contact.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })
);

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/register.html'));
});

app.post('/register', (req, res) => {
  const { username, password, firstName, lastName, age, gender } = req.body;
  const user = { id: users.length + 1, username, password, firstName, lastName, age, gender };
  users.push(user);
  res.redirect('/login');
});

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, '/public/profile.html'));
  } else {
    res.redirect('/login');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
