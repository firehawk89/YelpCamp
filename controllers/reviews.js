const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const { campgroundId } = req.params;
  const campground = await Campground.findById(campgroundId);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);

  await review.save();
  await campground.save();

  req.flash("success", "New review is successfully created!");

  res.redirect(`/campgrounds/${campgroundId}`);
};

module.exports.deleteReview = async (req, res) => {
  const { campgroundId, reviewId } = req.params;
  await Campground.findByIdAndUpdate(campgroundId, {
    $pull: { reviews: reviewId },
  });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review is successfully deleted!");

  res.redirect(`/campgrounds/${campgroundId}`);
};
