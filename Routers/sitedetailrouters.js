const express = require('express');
const { imageupload, getall, getbyId, update, remove } = require('../Controllers/sellsitedetailcontrollers'); // Ensure the path is correct

const router = express.Router();

// POST route to handle image upload and creation of record
router.post('/create', imageupload);

// GET routes to fetch records
router.get('/getall', getall);
router.get('/getbyId/:id', getbyId);

// PUT route to update a record
router.post('/update/:id', update);

// DELETE route to remove a record
router.delete('/remove/:id', remove);

module.exports = router;
