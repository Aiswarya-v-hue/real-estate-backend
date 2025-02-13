const {Router} = require('express')
const route =Router()


const {Signup,getall,getbyId} = require('../Controllers/signupController');
const {login} = require('../Controllers/loginController');

route.post('/signup',Signup)
route.post('/login',login)
route.get('/signup/getall',getall);
route.get('/signup/getbyId/:id',getbyId);




module.exports = route;