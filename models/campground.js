const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const Review = require("./review.js");

const imageSchema = new Schema({ url: String, filename: String });

imageSchema.virtual("thumb").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const campgroundSchemaOptions = { toJSON: { virtuals: true } }; // include virtual properties into the schema

const campgroundSchema = new Schema(
  {
    title: String,
    images: [imageSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    lastUpdateAt: String,
  },
  campgroundSchemaOptions
);

campgroundSchema.virtual("properties.popUpMarkup").get(function () {
  return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>`;
});

campgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = model("Campground", campgroundSchema);
