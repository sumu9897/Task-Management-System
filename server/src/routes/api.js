const express = require('express')
const UsersController = require('../controllers/UsersController');

const router = express.Router();


router.post("/registration",UsersController.registration);
module.exports= router;