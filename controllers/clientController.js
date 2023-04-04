const Client = require("../models/client");

exports.updateClient = async (req, res) => {
  try {
    const { name, email, phoneNumber, totalBill } = req.body;
    if (!name || !email || !phoneNumber || !totalBill) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const client = await Client.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!client) {
      return res.status(404).send();
    }

    res.send(client);
  } catch (error) {
    res.status(500).send(error);
  }
};
