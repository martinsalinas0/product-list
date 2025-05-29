const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    text: {
      type: String,
      required: [true, "Review text is required"],
      trim: true,
      maxlength: [500, "Review cannot exceed 500 characters"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", ReviewSchema);
