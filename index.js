// implement your API here
// import express
const express = require('express');

// import database
const Users = require('./data/db');

// server setup
const server = express();
server.use(express.json());
server.listen(8000, () => console.log("\napi running \n"));

// GET users
server.get('/api/users', (request, response) => {
	Users.find()
		.then(users => {
			response.status(200).json(users);
		})
		.catch(error => {
			response.status(500).json({message: 'error getting the list of users'});
		});
});

// POST users
server.post('/api/users', (request, response) => {
	const userInformation = request.body;

	Users.insert(userInformation)
		.then(user => {
			response.status(201).json(user)
		})
		.catch(error => {
			response.status(500).json({message: 'error adding user to database'})
		});
});

// PUT users

// DELETE users