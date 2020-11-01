import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
// Variable to be sent to Frontend with Database status
let databaseConnection = 'Waiting for Database response...';
// Access to the database connection information
router.get('/', (req, res) => {
  res.send(databaseConnection);
});
// If there is a connection error send an error message
mongoose.connection.on('error', (error) => {
  /* eslint-disable no-console */
  console.log('Database connection error:', error);
  databaseConnection = 'Error connecting to Database';
});
// If connected to MongoDB send a success message
mongoose.connection.once('open', () => {
  /* eslint-disable no-console */
  console.log('Connected to Database!');
  databaseConnection = 'Connected to Database';
});

export default router;
