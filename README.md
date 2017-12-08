# URL Shortener Microservice

This service accepts a URL as a parameter and will check whether it follows the valid "http://<i></i>www.google.com" format. If the URL is valid, it will return both the original URL and shortened URL in the JSON response. If it is not valid, the JSON response will contain an error instead. When you visit that shortened URL, it will redirect you to the original link.

You can test it at [http://localhost:3000](http://localhost:3000)

A Full Stack Javascript application built using MongoDB, NodeJS and Express. An API Project for FreeCodeCamp.

## Example Creation Usage

Pass the URL to path http://localhost:3000/new/ as below:

### Valid URL example
```
http://localhost:3000/new/https://www.github.com
```
### Invalid URL example
```
http://localhost:3000/new/www.github.com
```

## Example Creation Output

### Valid URL example JSON response output
```javascript
{
  original_url: "https://www.github.com",
  shortened_url: "localhost:3000/98095"
}
```

### Invalid URL example JSON response output
```javascript
{
  error: "Your url is invalid or in the wrong format. Verify that a valid protocol (http or https) is part of the url."
}
```

## Usage:
Visiting the shortened URL: http://localhost:3000/98095
Will redirect to: https://www.github.com


## To Run Project Locally
1. Fork this repo
2. Clone the fork
3. Install Dependencies: `$ npm install`
4. Start the Server: `$ node app.js`
5. Visit http://localhost:3000/
