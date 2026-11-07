// booking.js
// Handles the "Book a Room" form on booking.html.

async function populateRoomSelect() {
  const select = document.getElementById("room-select");
  const rooms = await getRooms();

  rooms.forEach((room) => {
    const option = document.createElement("option");
    option.value = room.id;
    option.textContent = `${room.name} (capacity ${room.capacity})`;
    select.appendChild(option);
  });
}

async function handleBookingSubmit(event) {
  event.preventDefault();

  const statusEl = document.getElementById("form-status");

  const bookingData = {
    roomId: document.getElementById("room-select").value,
    clubName: document.getElementById("club-name").value,
    date: document.getElementById("date").value,
    startTime: document.getElementById("start-time").value,
    endTime: document.getElementById("end-time").value,
    purpose: document.getElementById("purpose").value,
  };

  try {
    await createBooking(bookingData);
    statusEl.textContent = "Booking created!";
    statusEl.className = "status-message success";
    event.target.reset();
  } catch (err) {
    statusEl.textContent = err.message;
    statusEl.className = "status-message error";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  populateRoomSelect();
  document
    .getElementById("booking-form")
    .addEventListener("submit", handleBookingSubmit);
});