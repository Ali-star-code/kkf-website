const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const helmet = require('helmet');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3000;

// Load environment variables
dotenv.config();

// Middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Sample user data
const users = [
    { id: 1, username: 'admin', password: 'password' }
];

// Passport configuration
passport.use(new LocalStrategy((username, password, done) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'Incorrect username or password.' });
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

// Routes
app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: false
}));

app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Welcome to the dashboard!');
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Sample product data
const products = [
    { id: 1, title: 'Product 1', description: 'Description of Product 1.', image: 'images/product1.jpg' },
    { id: 2, title: 'Product 2', description: 'Description of Product 2.', image: 'images/product2.jpg' },
    { id: 3, title: 'Product 3', description: 'Description of Product 3.', image: 'images/product3.jpg' }
];

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/submitContactForm', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Contact Form Submission: Name: ${name}, Email: ${email}, Message: ${message}`);
    res.json({ message: 'Message sent successfully!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
