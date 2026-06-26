document.addEventListener("DOMContentLoaded", () => {
  const countdownElement = document.getElementById("countdown");
  const eventInput = document.getElementById("event");
  const dateInput = document.getElementById("date");
  const goButton = document.getElementById("goButton");
  const dayLabel = document.getElementById("Days");
  const donateButton = document.getElementById("donateButton");

  let countdownInterval;

  // Verificar que existan los elementos necesarios
  if (
    !countdownElement ||
    !eventInput ||
    !dateInput ||
    !goButton ||
    !dayLabel
  ) {
    console.error("Missing required DOM elements.");
    return;
  }

  // Obtener fecha de hoy sin horas
  function getToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  // Formatear fecha objetivo sin problemas de zona horaria
  function parseLocalDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  // Calcular diferencia en días
  function getDiffDays(eventDate) {
    const today = getToday();
    const targetDate = parseLocalDate(eventDate);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  // Actualizar badge
  function updateBadge(diffDays) {
    if (diffDays > 0) {
      const badgeText = diffDays > 999 ? "999+" : String(diffDays);
      chrome.action.setBadgeText({ text: badgeText });
    } else {
      chrome.action.setBadgeText({ text: "" });
    }
  }

  // Renderizar countdown
  function renderCountdown(eventName, eventDate) {
    const diffDays = getDiffDays(eventDate);

    if (diffDays > 0) {
      countdownElement.textContent = diffDays;
      dayLabel.textContent = diffDays === 1 ? "Day" : "Days";
      updateBadge(diffDays);
      return;
    }

    if (diffDays === 0) {
      countdownElement.textContent = `Today is "${eventName}"!`;
      dayLabel.textContent = "";
      updateBadge(0);
      return;
    }

    countdownElement.textContent = `"${eventName}" already happened.`;
    dayLabel.textContent = "";
    updateBadge(0);
  }

  // Iniciar cuenta regresiva
  function startCountdown(eventName, eventDate) {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    // Render inicial
    renderCountdown(eventName, eventDate);

    // Actualizar cada minuto (no cada segundo)
    countdownInterval = setInterval(() => {
      renderCountdown(eventName, eventDate);
    }, 60 * 1000);
  }

  // Guardar evento
  function saveEvent(eventName, eventDate) {
    chrome.storage.sync.set({ eventName, eventDate }, () => {
      console.log("Saved:", { eventName, eventDate });
    });
  }

  // Cargar evento guardado
  function loadSavedEvent() {
    chrome.storage.sync.get(["eventName", "eventDate"], (result) => {
      if (result.eventName) {
        eventInput.value = result.eventName;
      }

      if (result.eventDate) {
        dateInput.value = result.eventDate;
      }

      if (result.eventName && result.eventDate) {
        startCountdown(result.eventName, result.eventDate);
      }
    });
  }

  // Click en botón Go
  goButton.addEventListener("click", () => {
    const eventName = eventInput.value.trim();
    const eventDate = dateInput.value;

    if (!eventName || !eventDate) {
      alert("Please enter a valid event name and date.");
      return;
    }

    const today = getToday();
    const targetDate = parseLocalDate(eventDate);
    targetDate.setHours(0, 0, 0, 0);

    if (targetDate < today) {
      alert("Please enter today or a future date.");
      return;
    }

    saveEvent(eventName, eventDate);
    startCountdown(eventName, eventDate);
  });

  // Botón de donación
  if (donateButton) {
    donateButton.addEventListener("click", () => {
      const donateUrl = "https://paypal.me/iqb164?country.x=MX&locale.x=es_XC";
      chrome.tabs.create({ url: donateUrl });
    });
  }

  // Cargar al iniciar
  loadSavedEvent();
});
