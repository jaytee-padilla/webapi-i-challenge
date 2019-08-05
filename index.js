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

// GET specific user
server.get('/api/users/:id', (request, response) => {
	const userId = request.params.id

	Users.findById(userId)
		.then(users => {
			response.status(200).json(users);
		})
		.catch(error => {
			response.status(500).json({message: 'error getting the specific user'});
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
server.put('/api/users/:id', (request, response) => {
	const userId = request.params.id;
	const changes = request.body;

	Users.update(userId, changes)
		.then(updated => {
			if(updated) {
				response.status(200).json({message: 'user updated'});
			} else {
				response.status(400).json({message: 'user not found'});
			}
		})
		.catch(error => {
			response.status(500).json({message: 'error updating user'});
		});
});

// DELETE users
server.delete('/api/users/:id', (request, response) => {
	const userId = request.params.id;
	
	Users.remove(userId)
		.then(user => {
			response.status(200).json({message: 'user successfully deleted'});
		})
		.catch(error => {
			response.status(500).json({message: 'error deleting user'});
		});
});;