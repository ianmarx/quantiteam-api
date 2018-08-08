import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import apiRouter from './router';

// DB Setup
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/quantiteam';
mongoose.connect(mongoURI, { useMongoClient: true });

// set mongoose promises to es6 default
mongoose.Promise = global.Promise;

// initialize
const app = express();

app.use(cors());

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// prefix all routes with '/api'
app.use('/api', apiRouter);

// default index route
app.get('/', (req, res) => {
  res.send('This is the Quantiteam API');
});

module.exports = app;

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);
