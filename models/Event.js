const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }, 
    description: { type: String },
    ipAddress: { type: String, required: true },

    category: { type: String, enum: ["Personal", "Work", "Meetings", "Others"], default: "Others" },
    color: { type: String, default: "#007bff" }, 

    recurrence: {
        frequency: { type: String, enum: ["daily", "weekly", "monthly", "custom", null], default: null },
        interval: { type: Number, default: 1 },
        daysOfWeek: [{ type: Number }], 
        endDate: { type: Date, default: null } 
    },

    notifications: {
        emailReminder: { type: Boolean, default: false },
        webReminder: { type: Boolean, default: false },
        reminderMinutesBefore: { type: Number, default: 30 } 
    },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", EventSchema);
