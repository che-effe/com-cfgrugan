const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Portfolio - Home',
        page: 'home'
    });
});

app.get('/career', (req, res) => {
    res.render('career', {
        title: 'Career Achievements',
        page: 'career'
    });
});

app.get('/community', (req, res) => {
    res.render('community', {
        title: 'Dev Community',
        page: 'community'
    });
});

app.get('/digital', (req, res) => {
    res.render('digital', {
        title: 'Digital Work',
        page: 'digital'
    });
});

app.get('/analog', (req, res) => {
    res.render('analog', {
        title: 'Analog Art',
        page: 'analog'
    });
});

app.get('/bio', (req, res) => {
    res.render('bio', {
        title: 'About Me',
        page: 'bio'
    });
});

app.get('/articles', (req, res) => {
    res.render('articles', {
        title: 'Articles & Writing',
        page: 'articles'
    });
});

app.get('/events', (req, res) => {
    res.render('events', {
        title: 'Events & Speaking',
        page: 'events'
    });
});

// Error handling
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404 - Page Not Found',
        page: '404'
    });
});

app.listen(PORT, () => {
    console.log(`Portfolio server running on http://localhost:${PORT}`);
});