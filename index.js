const Joi = require('joi');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));



// const mongoose = require('mongoose')

// mongoose.connect('mongodb//localhost/vidly2')
// .then(() => console.log('Connected to mongodb...'))
// .catch(err => console.error('Could not connect to the datatbase...', err))

// const startupDebugger = require('debug') ('app:startup');
// const dbDebugger = require('debug') ('app:db');
// const config = require('config');
// const morgan = require('morgan');
// const helmet = require('helmet');
// const Joi = require('joi');
// const logger = require('./middleware/logger');
// const authenticater = require('./middleware/authenticater');
// const genres = require('./routes/genres');
// const home = require('./routes/home');
// const express = require('express');
// const app = express();

// app.set('view engine', 'pug');
// app.set('views', './views');   //default

// console.log(`NODE_ENV: ${process.env.Node_ENV}`);
// console.log(`app: ${app.get('env')}`);

// app.use(express.json());
// app.use(express.urlencoded({ extended:true }));
// app.use(express.static('public'));
// app.use(helmet());
// app.use('/api/genres', genres);
// ap.use('/', home);

// // configuration
// console.log('Application Name: ' + config.get('name'));
// console.log('Mail Server: ' + config.get('mail.host'));
// //console.log('Mail Password: ' + config.get('mail.password'));

// if (!app.get('env')=== 'development') {
//   app.use(morgan('tiny'));
//   startupDebugger('Morgan enabled')
// }

// // Db work...

// dbDebugger('Connected to the database...');


//  app.use(logger);

//  //app.use(authenticater);



// const port =process.env.PORT || 3000;
// app.listen(port, () => 
//     console.log(`Listening on port ${port}...`));
