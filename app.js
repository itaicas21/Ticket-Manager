const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ticketSchema = new Schema({
  title: String,
  content: String,
  userEmail: String,
  done: Boolean,
  creationTime: Number,
  labels: [String],
});
const Ticket = mongoose.model("Ticket", ticketSchema);

app.use(express.static("client/build"));

app.get("/api/tickets", (req, resp) => {
  if (req.query.searchText) {
    const searchText = `${req.query.searchText}`;
    return Ticket.find({
      title: { $regex: searchText, $options: "i" },
    })
      .then((data) => resp.send(data))
      .catch((error) =>
        resp
          .status(500)
          .send("Internal Server Error, Check DB Connection" + error)
      );
  }
  Ticket.find({})
    .then((data) => resp.send(data))
    .catch((error) =>
      resp
        .status(500)
        .send("Internal Server Error, Check DB Connection" + error)
    );
});

app.patch("/api/tickets/:ticketId/done", (req, resp) => {
  if (!mongoose.isValidObjectId(req.params.ticketId))
    return resp.status(400).send("Not Valid ObjectID");
  Ticket.findByIdAndUpdate(req.params.ticketId, {
    done: true,
  })
    .then((data) => {
      if (!data) return resp.status(404).send("No Ticket Found");
      resp.send({ updated: true });
    })
    .catch((error) => {
      resp.status(500).send(error);
    });
});

app.patch("/api/tickets/:ticketId/undone", (req, resp) => {
  if (!mongoose.isValidObjectId(req.params.ticketId))
    return resp.status(400).send("Not Valid ObjectID");
  Ticket.findByIdAndUpdate(req.params.ticketId, {
    done: false,
  })
    .then((data) => {
      if (!data) return resp.status(404).send("No Ticket Found");
      resp.send({ updated: true });
    })
    .catch((error) => {
      resp.status(500).send(error);
    });
});

//FOR FUTURE IMPLEMENTATION

// app.get("/api/tickets/:label", (request, response) => {
//   Ticket.find({}).then((allTickets) => {
//     const labelTickets = allTickets.filter((ticket) => {
//       console.log(ticket.labels);
//       if (ticket.labels.length > 0) {
//         return true;
//       } else return false;
//     });

//     response.send(labelTickets);
//   });
// });

module.exports = app;
