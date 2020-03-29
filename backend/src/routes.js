const express = require('express')
const schoolController = require('./controllers/schoolController')
const profileController = require('./controllers/profileController')
const classController = require('./controllers/classController')
const sessionController = require('./controllers/sessionController')

const routes = express.Router()

// Session routes
routes.post('/sessions', sessionController.create)
// Schools routes
routes.get('/schools', schoolController.retrieveSchool)// This content doesn´t appear in the front end
routes.post('/schools', schoolController.createSchool)

// Profile routes
routes.get('/profile', profileController.retrieveSpecifcClass)

// Classes routes
routes.get('/classes', classController.retrieveClass)
routes.post('/classes', classController.createClass)
routes.delete('/classes/:id', classController.deleteClass)

module.exports = routes