const Agency = require("../models/agency");
const Client = require("../models/client");

exports.create = async (req, res) => {
  try {
    const { name, address1, state, city, phone, clients } = req.body;
    if (!name || !address1 || !state || !city || !phone) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const agency = new Agency({
      name,
      address1,
      state,
      city,
      phone,
    });

    const savedAgency = await agency.save();

    const client = clients.map((client) => {
      return new Client({
        name: client.name,
        email: client.email,
        phoneNumber: client.phoneNumber,
        totalBill: client.totalBill,
        agencyId: savedAgency._id,
      });
    });

    const savedClients = await Client.insertMany(client);
    res.status(201).send({
      message: "Agency and clients created successfully",
      savedAgency,
      savedClients,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.topclient = async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "clients",
          localField: "_id",
          foreignField: "agencyId",
          as: "clients",
        },
      },
      { $unwind: "$clients" },
      { $sort: { "clients.totalBill": -1 } },
      {
        $group: {
          _id: "$_id",
          agencyName: { $first: "$name" },
          topClient: { $first: "$clients" },
        },
      },
      {
        $project: {
          _id: 0,
          agencyName: 1,
          clientName: "$topClient.name",
          totalBill: "$topClient.totalBill",
        },
      },
    ];

    const result = await Agency.aggregate(pipeline);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
