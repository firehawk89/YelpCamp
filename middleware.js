const { campgroundSchema, reviewSchema } = require("./schemas");
const Campground = require("./models/campground");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in!");
    return res.redirect("/login");
  }
  next();
};

//save the returnTo value from session to res.locals
module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

module.exports.isCampgroundAuthor = async (req, res, next) => {
  const { campgroundId } = req.params;
  const campground = await Campground.findById(campgroundId);

  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/campgrounds/${campgroundId}`);
  }

  next();
};

module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);

  if (error) {
    const errorMessage = error.details.map((el) => el.message).join(",");
    throw new ExpressError(errorMessage, 400);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { campgroundId, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/campgrounds/${campgroundId}`);
  }

  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const errorMessage = error.details.map((el) => el.message).join(",");
    throw new ExpressError(errorMessage, 400);
  } else {
    next();
  }
};
