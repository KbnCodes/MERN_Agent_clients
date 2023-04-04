const mongoose = require("mongoose");

const agencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: String,
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  clients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
  ],
});

const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;
