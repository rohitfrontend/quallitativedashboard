require('rootpath')();
const express = require('express');
var XLSX = require('xlsx')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const errorHandler = require('_middleware/error-handler');

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use(cors());
// app.use(require('express-formidable')());
// api routes
app.use('/users', require('./users/user.router'));
app.use('/artical', require('./artical/artical.router'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));