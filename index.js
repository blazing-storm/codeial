const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

// add this before router
app.use(expressLayouts);

app.use(express.static('./assets'));

// extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/', require('./routes'));

// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');
// app.set('views', path.join(__dirname, 'views'));

app.listen(port, function(err) {
    if(err) {
       console.log(`Error in running the server: ${err}`); 
    }
    console.log(`Server is running on port: ${port}`);
})