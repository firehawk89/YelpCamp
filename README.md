# YelpCamp Project

This is an upgraded version of full-stack web application project from [The Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/) course on Udemy by Colt Steele.

Project Link: https://yelp-camp-1s3s.onrender.com/

![YelpCamp preview.](/gallery/preview1.jpg)

## Features

- User Authentication (Log In and Register) and Authorization (Post, Edit, Delete or Rate Campground)
- Campground Star Rating
- Cluster Map
- Image Upload

## Built With

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [Mongoose](https://mongoosejs.com)
- [Joi](https://joi.dev)
- [Passport.js](https://www.passportjs.org)
- [Helmet.js](https://helmetjs.github.io)
- [Bootstrap](https://getbootstrap.com)
- [Mapbox](https://www.mapbox.com)
- [Cloudinary](https://cloudinary.com)

## Getting Started

To run this project on your local machine, follow the instructions below.

1. Clone the repo

```
git clone https://github.com/firehawk89/YelpCamp.git
```

2. Install dependencies using NPM or YARN

```bash
# Using npm
npm install

# Using yarn
yarn install
```

3. Get a [Mapbox](https://www.mapbox.com/) and a [Cloudinary](https://cloudinary.com) API keys

4. Create a `.env.development` file based on the [`.env.example`](/.env.example) file. Then, insert your keys and other info in it.

5. Run the local server

```bash
npm start
```

## License

Distributed under the MIT License. See [`LICENSE`](/LICENSE) for more information.
