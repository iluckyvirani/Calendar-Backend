const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    description: { type: String },
    ipAddress: { type: String, required: true },
    reminder: { type: Boolean, default: false },
});

module.exports = mongoose.model("Event", EventSchema);
