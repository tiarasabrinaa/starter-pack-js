const loadEnv = require('./config/env');
loadEnv();
const express = require("express");
const connectDB = require('./db/mongodb');
const { initializePassport } = require('./middlewares/passport-jwt');
const router = require('./routers/router');

const PORT = 7000;
const app = express();

app.use(express.json());
connectDB();
app.use(initializePassport());
app.use('/digistar', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});