# URL Shortener Microservice

This service accepts a URL as a parameter and will check whether it follows the valid https://<i></i>www<i></i>.<i></i>google.com format. If the URL is valid, it will return both the original URL and shortened URL in the JSON response. If it is not valid, the JSON response will contain an error instead. When you visit that shortened URL, it will redirect you to the original link.

You can test it at https://url-shortener-microsrvc.herokuapp.com

A Full Stack Javascript application built using MongoDB, NodeJS and Express. An API Project for FreeCodeCamp.

## Example Creation Usage

Pass the URL to path https://url-shortener-microsrvc.herokuapp.com/new/[URL] as below:

### Valid URL example
```
https://url-shortener-microsrvc.herokuapp.com/new/https://www.github.com
```
### Invalid URL example
```
https://url-shortener-microsrvc.herokuapp.com/new/www.github.com
```

## Example Creation Output

### Valid URL example JSON response output
```javascript
{
  original_url: "https://www.github.com",
  shortened_url: "url-shortener-microsrvc.herokuapp.com/29183"
}
```

## Usage:
Visiting the shortened URL: https://url-shortener-microsrvc.herokuapp.com/29183
Will redirect to: https://www.github.com


## To Run Project Locally

### Prerequisites
In order to run this project locally, you should have the following installed:

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com//)
- [MongoDB](http://www.mongodb.org/)

### Installation & Startup
1. Fork this repo
2. Clone the fork
3. Install Dependencies: `$ npm install`
4. Start the Server: `$ node app.js`
5. Visit http://localhost:3000/
