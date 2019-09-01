const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./router/routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.DATABASE_URL);

routes(app);

app.listen(PORT, () => {});
