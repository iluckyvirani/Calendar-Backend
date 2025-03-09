const express = require("express");
const requestIp = require("request-ip");
const Event = require("../models/Event");
const router = express.Router();

router.post("/add", async (req, res) => {
    const { title, startTime, endTime, description, category, color, recurrence, notifications } = req.body;
    const ipAddress = requestIp.getClientIp(req);

    try {
        const newEvent = new Event({ title, startTime, endTime, description, ipAddress, category, color, recurrence, notifications });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/events", async (req, res) => {
    const ipAddress = requestIp.getClientIp(req);
    const { date } = req.query;

    let query = { ipAddress };

    if (date) {
        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        query.startTime = { $gte: startOfDay, $lt: endOfDay };
    }

    try {
        const events = await Event.find(query);
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/event/:id", async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(updatedEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/event/:id", async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
