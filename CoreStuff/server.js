if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const port = 6900;
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();


// set and use things
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', './server');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));

// Routes
const indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.listen(process.env.PORT || port, () => {
    console.log('Web App ready at http://localhost:' + port + '/server.html');
})