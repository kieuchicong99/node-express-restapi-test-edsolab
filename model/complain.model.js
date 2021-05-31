const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let complainSchema = new Schema(
  {
    name: {
      type: String,
    },
    id_department: {
      type: String,
    },
    customer_phone: {
      type: String,
    },
    description: {
      type: String,
    },
    reply: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    time_created: {
      type: Date,
    },
    time_process: {
      type: Date,
    },
  },
  {
    collection: "complains",
  }
);

module.exports = mongoose.model("ComplainSchema", complainSchema);
