const express = require('express');
const router = express.Router();
const MessagerModel = require('../models/listMess');

// get all data
router.get('/:room', (req, res) => {
    const room = req.params.room
    MessagerModel.find({room: room})
    .then(data => {
        res.status(200).json(data)
        console.log(data);
    })
    .catch(err => res.status(500).json(err));
})

module.exports = router;