const app = require('../src/app');
const connectDB = require('../src/db/DB');
const serverless = require('serverless-http');

const handler = async (req, res) => {
  await connectDB();
  return serverless(app)(req, res);
};

module.exports = handler;
