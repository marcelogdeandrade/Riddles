// Import express 
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3002,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importar rotas da API
import Routes from './api/routes/routes'
Routes(app);

// Iniciar Server
app.listen(port);

console.log('REST API iniciada na porta: ' + port);