// Stage 2: Bookings API

const express = require("express");
const router = express.Router();
const { readData, writeData } = require("../utils/jsonStore");

// GET /api/bookings
router.get("/", (req, res) => {
  const bookings = readData("bookings.json");
  res.json(bookings);
});

// POST /api/bookings
router.post("/", (req, res) => {
  const { roomId, clubName, date, startTime, endTime, purpose } = req.body;

  // Make sure the required fields are present
  if (!roomId || !clubName || !date || !startTime || !endTime) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // End time must come after start time
  if (endTime <= startTime) {
    return res.status(400).json({ error: "End time must be after start time" });
  }

  const bookings = readData("bookings.json");

  // Stretch goal: block double-booking the same room at overlapping times
  const conflict = bookings.some(
    (b) =>
      b.roomId === roomId &&
      b.date === date &&
      startTime < b.endTime &&
      endTime > b.startTime
  );
  if (conflict) {
    return res.status(409).json({ error: "That room is already booked then" });
  }

  const newBooking = {
    id: Date.now().toString(),
    roomId,
    clubName,
    date,
    startTime,
    endTime,
    purpose: purpose || "",
  };

  bookings.push(newBooking);
  writeData("bookings.json", bookings);
  res.status(201).json(newBooking);
});

// DELETE /api/bookings/:id
router.delete("/:id", (req, res) => {
  const bookings = readData("bookings.json");
  const filtered = bookings.filter((b) => b.id !== req.params.id);

  if (filtered.length === bookings.length) {
    return res.status(404).json({ error: "Booking not found" });
  }

  writeData("bookings.json", filtered);
  res.status(200).json({ message: "Booking canceled" });
});

module.exports = router;