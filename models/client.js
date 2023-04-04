const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agency",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  totalBill: {
    type: Number,
    required: true,
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
