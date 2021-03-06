const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    imageURL: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }/*,
    peopleWhoIncremented: [
      {
        type: ObjectId,
        ref: "User"
      }
    ] */,
    userId: {
      type: ObjectId,
      ref: "User"
    }
  }
);

module.exports = mongoose.model("Item", itemSchema);
