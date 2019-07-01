const express = require("express");
const app = express();
const PORT = process.env.PORT || 3005;
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./router/routes');
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});