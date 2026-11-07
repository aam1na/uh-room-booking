// api.js
// The ONLY file that talks to the backend.
// Express serves the frontend, so relative URLs like "/api/rooms" work.

// ---------- Rooms ----------

async function getRooms() {
  const response = await fetch("/api/rooms");
  return await response.json();
}

async function getRoomById(id) {
  const response = await fetch(`/api/rooms/${id}`);
  return await response.json();
}

// ---------- Bookings ----------

async function getBookings() {
  const response = await fetch("/api/bookings");
  return await response.json();
}

async function createBooking(bookingData) {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Could not create booking");
  }
  return data;
}

async function deleteBooking(id) {
  const response = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
  return await response.json();
}