
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose');

app.use(express.static('public'));

const recipeModels = require('./rest-api/src/recipe.model');
const routes = require('./rest-api/src/recipe.routes');
const appRoutes = routes(app);

//const mongoUri = 'mongodb://petershift:a1spencal@ds237989.mlab.com:37989/bcl'
/*
MongoClient.connect('mongodb://petershift:a1spencal@ds237989.mlab.com:37989/bcl', (err, database) => {
	if (err) return console.log(err);
	db = database;
	app.listen(port, () => {
		console.log(`Listening on port ${port}!`);
	});
});*/

const mongoUri = 'mongodb://petershift:a1spencal@ds237989.mlab.com:37989/bcl'
mongoose.connect(mongoUri);
app.listen(9000);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('*', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
  });

