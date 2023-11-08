import mongoose from "mongoose";
import Community from "./community.model";

const requestModel = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Community,
    require: true,
  },
});

const Request =
  mongoose.models.Request || mongoose.model("Request", requestModel);

export default Request;
