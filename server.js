// DEPENDENCIES
const express = require('express');
const db = require('./models/index.js');

const app = express();

// CONFIGURATION / MIDDLEWARE
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROOT
app.get('/', async (req, res) => { 
    res.status(200).json({
        message: 'Welcome to the Tour API'
    });
});

// BANDS ROUTES
app.use('/bands', require('./controllers/bands_controllers.js'));
app.use('/events', require('./controllers/events_controllers.js'));
app.use('/stages', require('./controllers/stages_controllers.js'));

// LISTEN
db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
    });
});