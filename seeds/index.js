const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");
const Campground = require("../models/campground");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/yelp-camp");
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 200; i++) {
    const randomNum = Math.floor(Math.random() * 1000);
    const randomPrice = Math.floor(Math.random() * 20) + 10;

    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[randomNum].city}, ${cities[randomNum].state}`,
      geometry: {
        type: "Point",
        coordinates: [cities[randomNum].longitude, cities[randomNum].latitude],
      },
      price: randomPrice,
      images: [
        {
          url: "https://res.cloudinary.com/dvwakmag1/image/upload/v1687373560/YelpCamp/hijufksfh5a6n5udaibx.jpg",
          filename: "YelpCamp/hijufksfh5a6n5udaibx",
        },
        {
          url: "https://res.cloudinary.com/dvwakmag1/image/upload/v1687373560/YelpCamp/avxaiicpbvsg8tvvq89h.webp",
          filename: "YelpCamp/avxaiicpbvsg8tvvq89h",
        },
      ],
      // your user ID
      author: "6492df50719e6da0f4cafedd",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, eius excepturi rerum autem molestias temporibus ratione omnis corporis ullam in hic laborum! Atque eaque repellendus dolore fugit, porro soluta maiores!",
    });

    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
