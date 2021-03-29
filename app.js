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
    }).then((data) => resp.send(data));
  }
  Ticket.find({}).then((data) => resp.send(data));
});

app.patch("/api/tickets/:ticketId/done", (req, resp) => {
  console.log(req.params);
  Ticket.findByIdAndUpdate(req.params.ticketId, {
    done: true,
  }).then(() => {
    resp.send({ updated: true });
  });
});

app.patch("/api/tickets/:ticketId/undone", (req, resp) => {
  console.log(req.params);
  Ticket.findByIdAndUpdate(req.params.ticketId, {
    done: false,
  }).then(() => {
    resp.send({ updated: true });
  });
});

module.exports = app;
// Finish error handling and status codes
