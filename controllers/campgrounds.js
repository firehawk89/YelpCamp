const { cloudinary } = require("../cloudinary");
const Campground = require("../models/campground");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mbxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mbxToken });

const { getCurrentDate, getFormattedDate } = require("../utils/getDate");

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});

  res.render("campgrounds/index", { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

module.exports.createCampground = async (req, res) => {
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.campground.location,
      limit: 1,
    })
    .send();

  const campground = new Campground(req.body.campground);

  campground.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  })); // array of images
  campground.geometry = geoData.body.features[0].geometry; // geocoding geometry
  campground.author = req.user._id; // from isLoggedIn
  campground.lastUpdateAt = getCurrentDate();

  await campground.save();

  req.flash("success", "New campground is successfully created!");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.showCampground = async (req, res) => {
  const { campgroundId } = req.params;
  const campground = await Campground.findById(campgroundId)
    .populate({ path: "reviews", populate: { path: "author" } }) // also populate author of each review
    .populate("author");

  if (!campground) {
    req.flash("error", "Cannot find that campground!");
    return res.redirect("/campgrounds");
  }

  const lastUpdateDate = getFormattedDate(campground.lastUpdateAt);

  res.render("campgrounds/show", { campground, lastUpdateDate });
};

module.exports.renderEditForm = async (req, res) => {
  const { campgroundId } = req.params;
  const campground = await Campground.findById(campgroundId);

  if (!campground) {
    req.flash("error", "Cannot find that campground!");
    return res.redirect("/campgrounds");
  }

  res.render("campgrounds/edit", { campground });
};

module.exports.updateCampground = async (req, res) => {
  const { campgroundId } = req.params;

  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.campground.location,
      limit: 1,
    })
    .send();

  const campground = await Campground.findByIdAndUpdate(campgroundId, {
    ...req.body.campground,
  });
  const images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  })); // array of images
  campground.images.push(...images);

  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename); //delete selected images from cloudinary
    }

    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } }, // delete selected images
    });
  }

  campground.geometry = geoData.body.features[0].geometry; // geocoding geometry
  campground.lastUpdateAt = getCurrentDate();

  await campground.save();

  req.flash("success", "Campground is successfully updated!");

  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
  const { campgroundId } = req.params;
  await Campground.findByIdAndDelete(campgroundId);

  req.flash("success", "Campground is successfully deleted!");

  res.redirect(`/campgrounds`);
};
