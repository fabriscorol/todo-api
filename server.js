require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connexion a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connexion OK'))
  .catch(err => console.log(err));

// Routes
app.use('/tasks', require('./routes/tasks'));

app.listen(port, () => {
  console.log(`Server tourne sur le port ${port}`);
});
