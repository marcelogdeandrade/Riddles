// Import express 
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3002,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Importar rotas da API
import Routes from './api/routes/routes'
Routes(app);

// Iniciar Server
app.listen(port);

console.log('REST API iniciada na porta: ' + port);