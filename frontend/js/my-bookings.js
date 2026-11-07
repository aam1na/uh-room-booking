// my-bookings.js
// Renders the list of bookings and lets the user cancel one.

async function renderBookings() {
  const container = document.getElementById("bookings-list");
  const bookings = await getBookings();
  const rooms = await getRooms();

  if (!bookings || bookings.length === 0) {
    container.innerHTML = "<p>You have no bookings yet.</p>";
    return;
  }

  container.innerHTML = bookings
    .map((b) => {
      const room = rooms.find((r) => r.id === b.roomId);
      const roomName = room ? room.name : b.roomId;
      return `
        <div class="booking-item">
          <h3>${roomName}</h3>
          <p><strong>Club:</strong> ${b.clubName}</p>
          <p><strong>Date:</strong> ${b.date}</p>
          <p><strong>Time:</strong> ${b.startTime} - ${b.endTime}</p>
          <p><strong>Purpose:</strong> ${b.purpose}</p>
          <button class="cancel-btn" data-id="${b.id}">Cancel</button>
        </div>
      `;
    })
    .join("");

  container.querySelectorAll(".cancel-btn").forEach((button) => {
    button.addEventListener("click", () => {
      handleCancelClick(button.dataset.id);
    });
  });
}

async function handleCancelClick(bookingId) {
  await deleteBooking(bookingId);
  renderBookings();
}

document.addEventListener("DOMContentLoaded", renderBookings);