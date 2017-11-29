const router = require('express').Router();
const path = require('path');
const validUrl = require('valid-url');
const URL = require('../models/UrlModel.js')


router.use('/new/*', (req, res, next) => {
  const url = req.params[0];
  const response = {
    error: "Your url is invalid or in the wrong format. Verify that a valid protocol (http or https) is part of the url."
  };
   if (validUrl.isUri(url)) {
     req.uri = url;
      next();
    }else {
      res.json(response);
    }
});

//Creates a 5 digit random number between 10000 and 99999
const random5DigitNum = () => {
  return Math.floor(Math.random() * 90000) + 10000;
} 

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

router.use('/:shortenedURL/', (req, res, next) => {
  next();
    //if we can find the shortenedURl in the database, then we can use the next route to redirect to the original url,
    //else we send back a json file with an error
   /* URL.findById(req.params.markerId, (err, url) => {
      if (err) {
        res.status(500).send(err);
      } else if (url) {
        req.uri = url;
        next();
      } else {
        res.statusCode(404).send('This shortened url is not in the database');
      }
    });
    */
  });

router.route('/:shortenedURL/')
.get((req, res) => {
    const shortenedURL = req.params.shortenedURL;
    res.json(shortenedURL)
});

module.exports = router;