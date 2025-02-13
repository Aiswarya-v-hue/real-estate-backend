const {Router} = require('express')
const route = Router()



const {create,remove,getall}= require('../Controllers/buyController')
route.post('/create',create)
route.delete('/remove/:id',remove)
route.get('/getall',getall)
module.exports = route;