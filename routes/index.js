const router = require('express').Router();
const path = require('path');
const validUrl = require('valid-url');
const URL = require('../models/UrlModel.js')

//Creates a 5 digit random number between 10000 and 99999
const random5DigitNum = () => {
  return Math.floor(Math.random() * 90000) + 10000;
} 

//Checks if the url is valid before trying to access routes that access the database
router.use('/new/*', (req, res, next) => {
  const url = req.params[0];
  const response = { error: "Your url is invalid or in the wrong format. Verify that a valid protocol (http or https) is part of the url." };
   if (validUrl.isUri(url)) {
     req.uri = url;
      next();
    }else {
      res.json(response);
    }
});

router.route('/new/*')
//currently not working with PUT or POST
.get((req, res) => {
  const shortenedUrl = random5DigitNum();
  URL.findOneAndUpdate(
    {original: req.uri}, // filter
    {$push: { shortened: shortenedUrl} }, // update
    {upsert: true, new: true, runValidators: true}, // options
    function (err, doc) { // callback
        if (err) {
            res.status(500).send(err);
        }else {
            let response = {
              original_url: doc.original,
              shortened_url: `${req.headers.host}/${shortenedUrl}`
            };
            res.json(response);
        }
    }
);
});

//Checks that the passed shortened url is a digit value before querying the database.
router.use('/:shortenedURL/', (req, res, next) => {
  const isNumber =  /^\d+$/.test(req.params.shortenedURL);
  const response = { error: "The shortened url is in the wrong format. Verify that passed shortened URL is a digit value." };
  if (isNumber){
      next();
    }else {
      res.json(response);
    }
});

router.route('/:shortenedURL/')
.get((req, res) => {
    const shortenedURL = req.params.shortenedURL;
    var queryDoc = { shortened: shortenedURL};
    var select = 'original';
    URL.findOne(queryDoc, select, (err, url) => {
      if (err) {
        res.status(500).send(err);
      } else if (url) {
        res.redirect(301, url.original);
      } else {
        const response = { error: "This shortened url is not in the database" };
        res.json(response);
      }
    });
});

module.exports = router;