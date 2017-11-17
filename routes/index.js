const router = require('express').Router();
const path = require('path');
//update with our urls model
//const Marker = require('../../models/markerModel.js')

var isURLValid = (url) => {
    return true;
}

router.route('/new/*')
.get((req, res) => {
 const url = req.params;
 console.log(url);
res.json(url);
});

router.route('/:shortenedURL/')
.get((req, res) => {
    const shortenedURL = req.params.shortenedURL;
    res.json(shortenedURL)
});

module.exports = router;