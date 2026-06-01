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

  // Save to localStorage (Task 8)
  if (selectedVal) {
    localStorage.setItem("preferredEventType", selectedVal);
    updatePrefDisplay();
  }
}

// ========== DISPLAY SAVED PREFERENCE ==========
function updatePrefDisplay() {
  const savedPref = localStorage.getItem("preferredEventType");
  const displaySpan = document.getElementById("savedPrefDisplay");
  if (displaySpan) {
    displaySpan.innerText = savedPref ? savedPref.toUpperCase() : "None";
  }
}

// ========== LOAD SAVED EVENT PREFERENCE ON PAGE LOAD ==========
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

// ========== TASK 6: CHARACTER COUNTER ==========
function countCharacters() {
  const feedback = document.getElementById("feedback");
  if (!feedback) return;

  const length = feedback.value.length;
  const charDisplay = document.getElementById("charCountDisplay");
  if (charDisplay) charDisplay.innerHTML = `✍️ Characters: ${length}`;

  // Mark form as dirty for beforeunload warning
  window._formDirty = true;
}

// ========== TASK 5: SUBMIT REGISTRATION WITH OUTPUT ==========
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

  // Success message in <output> element (Task 5 requirement)
  const eventName =
    eventSelect.options[eventSelect.selectedIndex]?.text || eventVal;
  outputEl.innerText = `✅ Registration Confirmed! ${nameVal}, you're registered for ${eventName}. Confirmation sent to ${emailVal}. Thank you for joining!`;

  // Reset dirty flag
  window._formDirty = false;
}

// ========== RESET FORM ==========
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

// ========== TASK 8: CLEAR LOCALSTORAGE & SESSIONSTORAGE ==========
function clearAllPreferences() {
  localStorage.clear();
  sessionStorage.clear();
  updatePrefDisplay();

  // Reset event type dropdown if exists
  const selectEl = document.getElementById("eventType");
  if (selectEl) {
    selectEl.value = "";
    const feeDisplay = document.getElementById("eventFeeDisplay");
    if (feeDisplay) feeDisplay.innerHTML = "";
  }

  alert("✅ All preferences cleared (localStorage & sessionStorage)");
}

// ========== TASK 6: ENLARGE IMAGE ON DOUBLE-CLICK ==========
function enlargeImage(img) {
  if (img.style.width === "400px") {
    img.style.width = "";
    img.style.height = "";
  } else {
    img.style.width = "400px";
    img.style.height = "260px";
  }
}

// ========== TASK 7: VIDEO READY MESSAGE ==========
function videoReady() {
  const statusMsg = document.getElementById("videoStatusMsg");
  if (statusMsg) {
    statusMsg.innerHTML =
      "🎬 Video ready to play! Click play to watch community highlights.";
    setTimeout(() => {
      if (
        statusMsg.innerHTML ===
        "🎬 Video ready to play! Click play to watch community highlights."
      ) {
        // Keep message but optional fade effect
      }
    }, 5000);
  }
}

// ========== TASK 7: BEFOREUNLOAD WARNING ==========
let formDirtyFlag = false;

function markFormDirty() {
  formDirtyFlag = true;
  window._formDirty = true;
}

// Attach dirty tracking to registration form if it exists
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

// ========== TASK 9: GEOLOCATION ==========
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
      locationDiv.innerHTML = `
                <p>✅ <strong>Your location:</strong> ${lat}, ${lon}</p>
                <p>🎉 <strong>Nearby community events:</strong></p>
                <ul style="margin-left: 1rem;">
                    <li>Family Fun Fair - 0.3 miles away</li>
                    <li>Farmers Market - 0.7 miles away</li>
                    <li>Park Concert Series - 1.1 miles away</li>
                    <li>Community Yoga - 0.5 miles away</li>
                </ul>
            `;
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        locationDiv.innerHTML =
          "<p>❌ Location permission denied. Please enable location services to find nearby events.</p>";
      } else if (error.code === error.TIMEOUT) {
        locationDiv.innerHTML =
          "<p>⏱️ Location request timed out. Please try again.</p>";
      } else {
        locationDiv.innerHTML =
          "<p>⚠️ Unable to retrieve location. Check your device settings.</p>";
      }
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
  );
}

// ========== CONTACT FORM MESSAGE ==========
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

  output.innerText = `✅ Thanks ${name.value}! We've received your message and will respond within 24 hours.`;

  // Clear form
  name.value = "";
  email.value = "";
  message.value = "";

  setTimeout(() => {
    output.innerText = "";
  }, 5000);
}

// ========== SET DEFAULT DATE ==========
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

// ========== INITIALIZE ON PAGE LOAD ==========
document.addEventListener("DOMContentLoaded", function () {
  loadSavedEventPreference();
  setDefaultEventDate();
  updatePrefDisplay();

  // Initialize character counter if feedback exists
  const feedback = document.getElementById("feedback");
  if (feedback) {
    countCharacters();
  }
});
