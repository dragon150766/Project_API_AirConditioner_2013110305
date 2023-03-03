const { check } = require("express-validator");

module.exports.checkId = [
  check("id")
    .exists()
    .withMessage("required you id")
    .bail()
    .isLength({ min: 24, max: 24 })
    .withMessage("you id must have 24 characters")
    .bail()
    .isMongoId()
    .withMessage("you id must be a valid ObjectId"),
];