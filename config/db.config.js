const mongoose = require('mongoose');

const DB_NAME = 'foodlet';
const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/foodlet';
// const DB_URI = `${URI}/${DB_NAME}`;

mongoose.connect(URI)
  .then(() => console.info(`Successfully connected to the database ${URI}`))
  .catch((error) => {
    console.error(`An error ocurred trying to connect to de database ${URI}`, error);
    process.exit(0);
  })

process.on('SIGINT', () => {
  mongoose.connection.close()
    .then(function () {
      console.log('Mongoose disconnected on app termination');
      process.exit(0);
    })
});