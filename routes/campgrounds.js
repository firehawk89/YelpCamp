const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const {
  isLoggedIn,
  isCampgroundAuthor,
  validateCampground,
} = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const catchAsyncError = require("../utils/catchAsyncError");

router
  .route("/")
  .get(catchAsyncError(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsyncError(campgrounds.createCampground)
  );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:campgroundId")
  .get(catchAsyncError(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isCampgroundAuthor,
    upload.array("image"),
    validateCampground,
    catchAsyncError(campgrounds.updateCampground)
  )
  .delete(
    isLoggedIn,
    isCampgroundAuthor,
    catchAsyncError(campgrounds.deleteCampground)
  );

router.get(
  "/:campgroundId/edit",
  isLoggedIn,
  isCampgroundAuthor,
  catchAsyncError(campgrounds.renderEditForm)
);

module.exports = router;
