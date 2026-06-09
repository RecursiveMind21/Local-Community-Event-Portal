// ========== TASK 6: PHONE VALIDATION (onblur) ==========
function validatePhone() {
  const phoneInput = document.getElementById("phone");
  if (!phoneInput) return;
  const phoneVal = phoneInput.value.trim();
  const errorSpan = document.getElementById("phoneError");
  if (phoneVal !== "" && !/^\d{10}$/.test(phoneVal)) {
    if (errorSpan)
      errorSpan.innerText = "❌ Enter a valid 10-digit phone number";
    return false;
  } else {
    if (errorSpan) errorSpan.innerText = "";
    return true;
  }
}

// ========== TASK 6 + TASK 8: EVENT FEE & LOCALSTORAGE ==========
function updateEventFeeAndSave() {
  const selectEl = document.getElementById("eventType");
  if (!selectEl) return;
  const selectedVal = selectEl.value;
  let feeText = "";
  switch (selectedVal) {
    case "music":
      feeText = "🎸 Music Festival Fee: $15";
      break;
    case "sports":
      feeText = "🏅 Sports Tournament Fee: $10";
      break;
    case "cleanup":
      feeText = "🌿 Cleanup Campaign: FREE";
      break;
    case "art":
      feeText = "🎭 Art Workshop Fee: $8";
      break;
    case "food":
      feeText = "🍲 Food Festival Fee: $12";
      break;
    default:
      feeText = "💰 Please select an event type";
      break;
  }
  const feeDisplay = document.getElementById("eventFeeDisplay");
  if (feeDisplay) feeDisplay.innerHTML = `<strong>${feeText}</strong>`;
  if (selectedVal) {
    localStorage.setItem("preferredEventType", selectedVal);
    updatePrefDisplay();
  }
}

function updatePrefDisplay() {
  const savedPref = localStorage.getItem("preferredEventType");
  const displaySpan = document.getElementById("savedPrefDisplay");
  if (displaySpan)
    displaySpan.innerText = savedPref ? savedPref.toUpperCase() : "None";
}

function loadSavedEventPreference() {
  const savedEvent = localStorage.getItem("preferredEventType");
  const selectEl = document.getElementById("eventType");
  if (savedEvent && selectEl) {
    const optionExists = Array.from(selectEl.options).some(
      (opt) => opt.value === savedEvent,
    );
    if (optionExists) {
      selectEl.value = savedEvent;
      updateEventFeeAndSave();
    }
  }
}

function countCharacters() {
  const feedback = document.getElementById("feedback");
  if (!feedback) return;
  const length = feedback.value.length;
  const charDisplay = document.getElementById("charCountDisplay");
  if (charDisplay) charDisplay.innerHTML = `✍️ Characters: ${length}`;
  window._formDirty = true;
}

function submitRegistration() {
  const name = document.getElementById("userName");
  const email = document.getElementById("userEmail");
  const eventSelect = document.getElementById("eventType");
  const phone = document.getElementById("phone");
  const outputEl = document.getElementById("formOutputMessage");
  if (!name || !email || !eventSelect || !outputEl) return;
  const nameVal = name.value.trim();
  const emailVal = email.value.trim();
  const eventVal = eventSelect.value;
  if (!nameVal || !emailVal || !eventVal) {
    outputEl.innerText =
      "❌ Please fill all required fields (Name, Email, Event Type).";
    return;
  }
  const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
  if (!emailPattern.test(emailVal)) {
    outputEl.innerText = "❌ Please enter a valid email address.";
    return;
  }
  if (
    phone &&
    phone.value.trim() !== "" &&
    !/^\d{10}$/.test(phone.value.trim())
  ) {
    outputEl.innerText = "❌ Please enter a valid 10-digit phone number.";
    return;
  }
  const eventName =
    eventSelect.options[eventSelect.selectedIndex]?.text || eventVal;
  outputEl.innerText = `✅ Registration Confirmed! ${nameVal}, you're registered for ${eventName}. Confirmation sent to ${emailVal}. Thank you for joining!`;
  window._formDirty = false;

  // Exercise 12: POST to mock API
  postRegistrationToAPI({ name: nameVal, email: emailVal, event: eventVal });
}

function resetForm() {
  const form = document.getElementById("eventRegistrationForm");
  if (form) form.reset();
  const outputEl = document.getElementById("formOutputMessage");
  if (outputEl) outputEl.innerText = "";
  const charDisplay = document.getElementById("charCountDisplay");
  if (charDisplay) charDisplay.innerHTML = "✍️ Characters: 0";
  const feeDisplay = document.getElementById("eventFeeDisplay");
  if (feeDisplay) feeDisplay.innerHTML = "";
  window._formDirty = false;
}

function clearAllPreferences() {
  localStorage.clear();
  sessionStorage.clear();
  updatePrefDisplay();
  const selectEl = document.getElementById("eventType");
  if (selectEl) {
    selectEl.value = "";
    const feeDisplay = document.getElementById("eventFeeDisplay");
    if (feeDisplay) feeDisplay.innerHTML = "";
  }
  alert("✅ All preferences cleared (localStorage & sessionStorage)");
}

function enlargeImage(img) {
  if (img.style.width === "400px") {
    img.style.width = "";
    img.style.height = "";
  } else {
    img.style.width = "400px";
    img.style.height = "260px";
  }
}

function videoReady() {
  const statusMsg = document.getElementById("videoStatusMsg");
  if (statusMsg) {
    statusMsg.innerHTML =
      "🎬 Video ready to play! Click play to watch community highlights.";
  }
}

let formDirtyFlag = false;
function markFormDirty() {
  formDirtyFlag = true;
  window._formDirty = true;
}
document.addEventListener("DOMContentLoaded", function () {
  const regForm = document.getElementById("eventRegistrationForm");
  if (regForm) {
    const inputs = regForm.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("input", markFormDirty);
      input.addEventListener("change", markFormDirty);
    });
  }
});
window.addEventListener("beforeunload", function (e) {
  if (window._formDirty || formDirtyFlag) {
    const message =
      "⚠️ You have unsaved changes in the registration form. Are you sure you want to leave?";
    e.preventDefault();
    e.returnValue = message;
    return message;
  }
});

function findNearbyEvents(event) {
  if (event) event.stopPropagation();
  const locationDiv =
    document.getElementById("locationInfo") ||
    document.getElementById("locationResult");
  if (!locationDiv) return;
  locationDiv.innerHTML =
    "<p>📍 Getting your location with high accuracy...</p>";
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude.toFixed(5);
      const lon = position.coords.longitude.toFixed(5);
      locationDiv.innerHTML = `<p>✅ <strong>Your location:</strong> ${lat}, ${lon}</p><p>🎉 <strong>Nearby community events:</strong></p><ul style="margin-left: 1rem;"><li>Family Fun Fair - 0.3 miles away</li><li>Farmers Market - 0.7 miles away</li><li>Park Concert Series - 1.1 miles away</li><li>Community Yoga - 0.5 miles away</li></ul>`;
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED)
        locationDiv.innerHTML = "<p>❌ Location permission denied.</p>";
      else if (error.code === error.TIMEOUT)
        locationDiv.innerHTML = "<p>⏱️ Location request timed out.</p>";
      else locationDiv.innerHTML = "<p>⚠️ Unable to retrieve location.</p>";
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
  );
}

function sendContactMessage() {
  const name = document.getElementById("contactName");
  const email = document.getElementById("contactEmail");
  const message = document.getElementById("contactMessage");
  const output = document.getElementById("contactOutput");
  if (!name || !email || !message || !output) return;
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    output.innerText = "❌ Please fill all fields before sending.";
    return;
  }
  output.innerText = `✅ Thanks ${name.value}! We've received your message.`;
  name.value = "";
  email.value = "";
  message.value = "";
  setTimeout(() => (output.innerText = ""), 5000);
}

function setDefaultEventDate() {
  const dateInput = document.getElementById("eventDate");
  if (dateInput && !dateInput.value) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }
}

// ========== JAVASCRIPT EXERCISES 1–14 ==========
console.log("Welcome to the Community Portal");
window.addEventListener("DOMContentLoaded", () => {
  alert("🎉 Community Portal loaded! Explore events, register, and more.");
  loadEventsFromLocal();
  fetchEventsAsync();
});

// Exercise 2: Data types & operators
const EVENT_NAME = "Annual Community Meet";
const EVENT_DATE = "2026-07-15";
let availableSeats = 100;
function updateSeatCount(change) {
  availableSeats += change;
  console.log(`Seats: ${availableSeats}`);
}
console.log(`Event: ${EVENT_NAME} on ${EVENT_DATE} – seats: ${availableSeats}`);

// Exercise 3: Conditionals, loops, error handling
function displayOnlyAvailableEvents(events) {
  const today = new Date().toISOString().slice(0, 10);
  events.forEach((event) => {
    if (event.date >= today && event.seats > 0) renderEventCard(event);
    else console.log(`Hidden: ${event.name}`);
  });
}

function safeRegister(eventId, userName) {
  try {
    if (!userName) throw new Error("User name required");
    const event = eventsDataStore.find((e) => e.id == eventId);
    if (!event) throw new Error("Event not found");
    if (event.seats <= 0) throw new Error("No seats left");
    event.seats--;
    console.log(`${userName} registered for ${event.name}`);
    updateEventListDisplay();
    return true;
  } catch (error) {
    console.error("Registration error:", error.message);
    alert(`Registration failed: ${error.message}`);
    return false;
  }
}

// Exercise 4: Closure & higher-order functions
function createCategoryTracker() {
  let counts = {};
  return function (category) {
    counts[category] = (counts[category] || 0) + 1;
    console.log(`${category} regs: ${counts[category]}`);
    return counts[category];
  };
}
const trackCategoryReg = createCategoryTracker();

function filterEventsByCategory(category = "all") {
  if (category === "all") return eventsDataStore;
  return eventsDataStore.filter((event) => event.category === category);
}
window.filterEventsByCategory = function () {
  updateEventListDisplay();
};

// Exercise 5: Objects and Prototypes
class Event {
  constructor(id, name, date, category, seats) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.category = category;
    this.seats = seats;
    this.initialSeats = seats;
  }
  checkAvailability() {
    return this.seats > 0;
  }
}
Event.prototype.getDetails = function () {
  return `${this.name} (${this.date}) – ${this.seats} seats left`;
};

function logEventDetails(event) {
  Object.entries(event).forEach(([k, v]) => console.log(`${k}: ${v}`));
}

// Exercise 6: Arrays – push, filter, map
let eventsDataStore = [];
function addNewEvent() {
  const name = document.getElementById("newEventName")?.value;
  const date = document.getElementById("newEventDate")?.value;
  const category = document.getElementById("newEventCategory")?.value;
  const seats = parseInt(document.getElementById("newEventSeats")?.value);
  if (!name || !date) return alert("Please fill event name and date");
  const newId = eventsDataStore.length + 101;
  const newEvent = new Event(newId, name, date, category, seats);
  eventsDataStore.push(newEvent);
  localStorage.setItem("communityEvents", JSON.stringify(eventsDataStore));
  updateEventListDisplay();
}
function getMusicEvents() {
  return eventsDataStore.filter((ev) => ev.category === "music");
}
function formatEventCards(events) {
  return events
    .map(
      (ev) =>
        `<div class="card"><h3>${ev.name}</h3><p>${ev.date} | Seats: ${ev.seats}</p></div>`,
    )
    .join("");
}

// Exercise 7: DOM Manipulation
function renderEventCard(event) {
  const container = document.getElementById("eventsContainer");
  if (!container) return;
  const card = document.createElement("div");
  card.className = "card";
  card.id = `event-${event.id}`;
  card.innerHTML = `<h3>${event.name}</h3><p>📅 ${event.date} | 🪑 Seats: ${event.seats}</p><p>🎭 ${event.category}</p><button class="register-btn" data-id="${event.id}">✅ Register</button><button class="cancel-btn" data-id="${event.id}">❌ Cancel</button>`;
  container.appendChild(card);
}
function updateEventListDisplay() {
  const container = document.getElementById("eventsContainer");
  if (!container) return;
  container.innerHTML = "";
  const selectedCategory =
    document.getElementById("categoryFilter")?.value || "all";
  let filtered = filterEventsByCategory(selectedCategory);
  const searchTerm =
    document.getElementById("searchInput")?.value.toLowerCase() || "";
  if (searchTerm)
    filtered = filtered.filter((ev) =>
      ev.name.toLowerCase().includes(searchTerm),
    );
  filtered.forEach((event) => renderEventCard(event));
  attachEventButtons();
}
function attachEventButtons() {
  $(".register-btn").click(function () {
    const eventId = parseInt($(this).data("id"));
    const userName = prompt("Enter your name for registration:") || "Guest";
    safeRegister(eventId, userName);
    $(this).closest(".card").fadeOut(300).fadeIn(300);
    trackCategoryReg(eventsDataStore.find((e) => e.id === eventId)?.category);
  });
  $(".cancel-btn").click(function () {
    const eventId = parseInt($(this).data("id"));
    const event = eventsDataStore.find((e) => e.id === eventId);
    if (event && event.seats < event.initialSeats) {
      event.seats++;
      updateEventListDisplay();
      alert("Cancelled. Seat restored.");
    } else alert("No registration to cancel.");
  });
}
window.registerForEvent = function (eventId) {
  const userName = prompt("Enter your name:");
  if (userName) safeRegister(eventId, userName);
};

// Exercise 8: Event Handling (keydown)
window.handleKeySearch = function (event) {
  if (event.key === "Enter") updateEventListDisplay();
};

// Exercise 9: Async/Await + Promise
async function fetchEventsAsync() {
  const spinner = document.getElementById("loadingSpinner");
  if (spinner) spinner.style.display = "block";
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5",
    );
    const data = await response.json();
    const fakeEvents = data.map(
      (post, idx) =>
        new Event(
          idx + 200,
          post.title.slice(0, 30),
          new Date(Date.now() + idx * 86400000).toISOString().slice(0, 10),
          ["music", "sports", "cleanup", "art", "food"][idx % 5],
          Math.floor(Math.random() * 100) + 10,
        ),
    );
    const existingIds = new Set(eventsDataStore.map((e) => e.id));
    const newEvents = fakeEvents.filter((e) => !existingIds.has(e.id));
    eventsDataStore.push(...newEvents);
    localStorage.setItem("communityEvents", JSON.stringify(eventsDataStore));
    updateEventListDisplay();
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Failed to load events");
  } finally {
    if (spinner) spinner.style.display = "none";
  }
}
function fetchEventsThen() {
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch(console.error);
}

// Exercise 10: Modern JS features
function addEventWithDefaults(name = "Untitled Event", seats = 20) {
  console.log(name, seats);
}
function displayEventSummary({ name, date, seats }) {
  console.log(`${name} on ${date} – ${seats} seats`);
}
function cloneEventList() {
  return [...eventsDataStore];
}

// Exercise 11: Form handling (prevent default already added globally)
document
  .querySelectorAll("form")
  .forEach((form) =>
    form.addEventListener("submit", (e) => e.preventDefault()),
  );

// Exercise 12: AJAX & Fetch POST + setTimeout
async function postRegistrationToAPI(userData) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const result = await response.json();
  console.log("API POST result:", result);
}
function simulateDelayedRegistration(userData) {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          success: true,
          message: `Registered ${userData.name} after 2s`,
        }),
      2000,
    ),
  );
}
// Override submit to include delay demo (optional)
const originalSubmit = window.submitRegistration;
window.submitRegistration = async function () {
  originalSubmit();
  const name = document.getElementById("userName")?.value;
  if (name) {
    const delayMsg = await simulateDelayedRegistration({ name });
    console.log(delayMsg.message);
  }
};

// Exercise 13: Debugging (breakpoint helper)
window.debugTest = function () {
  debugger;
  console.log("Events:", eventsDataStore);
};

// Exercise 14: jQuery usage (already in attachEventButtons and below)
$(document).ready(function () {
  $(".card-btn").click(function () {
    $(this).fadeOut(100).fadeIn(100);
  });
  console.log(
    "jQuery ready – frameworks like React provide component-based architecture.",
  );
});

// Helper: Load events from localStorage
function loadEventsFromLocal() {
  const stored = localStorage.getItem("communityEvents");
  if (stored)
    eventsDataStore = JSON.parse(stored).map(
      (e) => new Event(e.id, e.name, e.date, e.category, e.seats),
    );
  else
    eventsDataStore = [
      new Event(1, "Summer Music Fest", "2026-07-20", "music", 120),
      new Event(2, "Charity Sports Day", "2026-08-05", "sports", 80),
      new Event(3, "Park Cleanup", "2026-06-25", "cleanup", 50),
      new Event(4, "Art Workshop", "2026-07-10", "art", 30),
      new Event(5, "Food Carnival", "2026-07-30", "food", 200),
    ];
  updateEventListDisplay();
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  loadSavedEventPreference();
  setDefaultEventDate();
  updatePrefDisplay();
  const feedback = document.getElementById("feedback");
  if (feedback) countCharacters();
});
