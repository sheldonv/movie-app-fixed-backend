const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const movieRouter = require('./routes/movies');
const searchRouter = require('./routes/search');
const discoverRouter = require('./routes/discover');
const signUpRouter = require('./routes/signup');
const loginRouter = require('./routes/login') 
/* a change */
const movieSavedRouter = require('./routes/movieSaved');
const actorRouter = require('./routes/actorId');
const profileRouter = require('./routes/profile')
const updateRouter = require('./routes/update');
const path = require('path');
const { dirname } = require('path');

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join('uploads/images')))
app.use(express.static(path.join('public')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Origin, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'UPDATE, PUT, PATCH, GET, POST, DELETE, OPTIONS');
    next();
})
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pjqpy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`).then(
    () => {    
        console.log('Successful')   
    }
).catch(
    (error) => {
        console.log('Error', error);
    }
)

app.use('/discover', discoverRouter);
app.use('/search', searchRouter);
app.use('/movie/home', movieRouter);
app.use('/signup', signUpRouter);
app.use('/login', loginRouter)
app.use('/movieSaved', movieSavedRouter);
app.use('/actorPage', actorRouter);
app.use('/profile', profileRouter); 
app.use('/update', updateRouter);

app.use((req, res, next) => {
    res.sendFile(path.resolve(dirname, 'public', 'index.html'));
})

module.exports = app;    