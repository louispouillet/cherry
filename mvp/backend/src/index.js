// --------------------------------------------------------- Main files ---------------------------------------------------------

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const port = 3000;

// Connexion à MongoDB
connectDB();

// Middlewares
app.use(cors());

// Routes
const auth = require('./routes/Auth/auth.js');
const user = require('./routes/Users/users.js');
const groupe = require('./routes/Group/group.js');
const middnot = require('./middelware/NotFound.js');

//app.use('/', auth);
app.use('/', groupe);
//app.use('/', user);
//app.use(middnot);

// Lancer le serveur
app.listen(port, () =>
  console.log(`Server lancé à l'url : http://localhost:${port}`)
);
