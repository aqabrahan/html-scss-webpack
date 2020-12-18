const express = require('express');
const log = require('morgan')('dev');
const bodyParser = require('body-parser');

const app = express();

//configure bodyparser
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

//initialize express router
const router = express.Router();
app.use(express.static('dist'));

app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");

  next();
});

app.listen(4000, (req, res) => {
  console.log(`Server is running on port : 4000`);
});