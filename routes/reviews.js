const express = require("express");
const router = express.Router({ mergeParams: true });

const { isLoggedIn, isReviewAuthor, validateReview } = require("../middleware");
const reviews = require("../controllers/reviews");
const catchAsyncError = require("../utils/catchAsyncError");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchAsyncError(reviews.createReview)
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsyncError(reviews.deleteReview)
);

module.exports = router;
