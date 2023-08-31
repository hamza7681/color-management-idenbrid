const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    totalColors: {
      type: Number,
      required: true,
    },
    palletes: [
      {
        _id: false,
        color: {
          type: String,
          required: true,
        },
        shades: [
          {
            _id: false,
            toner: { type: Number, required: true },
            shadePic: { type: String },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
