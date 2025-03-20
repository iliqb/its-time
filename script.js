document.addEventListener("DOMContentLoaded", () => {
  const countdownElement = document.getElementById("countdown");
  const eventInput = document.getElementById("event");
  const dateInput = document.getElementById("date");
  const goButton = document.getElementById("goButton");
  const dayLabel = document.getElementById("Days");
  let countdownInterval;

  // Obtener la hora exacta desde un servidor
  function getInternetTime() {
    return fetch("http://worldtimeapi.org/api/timezone/Etc/UTC.json")
      .then((response) => response.json())
      .then((data) => new Date(data.datetime)) // Convertir la respuesta a un objeto Date
      .catch((error) => {
        console.error("Error fetching internet time:", error);
        return new Date(); // Si falla, usar la hora local
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
        startCountdown(result.eventName, result.eventDate);
      }
    });
  }

  // Guardar evento
  function saveEvent(eventName, eventDate) {
    chrome.storage.sync.set({ eventName, eventDate }, () => {
      console.log("saved", { eventName, eventDate });
    });
  }

  // Iniciar cuenta regresiva
  async function startCountdown(eventName, eventDate) {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(async () => {
      const today = await getInternetTime(); // Obtener la hora exacta desde internet
      today.setHours(0, 0, 0, 0);
      const targetDate = new Date(eventDate);
      targetDate.setHours(0, 0, 0, 0);
      const diffTime = targetDate - today;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffTime <= 0) {
        clearInterval(countdownInterval);
        dayLabel.textContent = "";
        if (diffDays === 0) {
          countdownElement.textContent = `Today is "${eventName}"!`;
        } else {
          countdownElement.textContent = `"${eventName}" already happened.`;
        }
        chrome.action.setBadgeText({ text: "" }); // Limpiar badge
        return;
      } else {
        dayLabel.textContent = diffDays === 1 ? "Day" : "Days";
      }

      countdownElement.textContent = `${diffDays}`;
      chrome.action.setBadgeText({ text: `${diffDays}` });
    }, 1000);
  }

  // Evento del botón "Go"
  goButton.addEventListener("click", () => {
    const eventName = eventInput.value.trim();
    const eventDate = dateInput.value;

    if (!eventName || !eventDate) {
      alert("Please enter a valid event name and date.");
      return;
    }

    const today = new Date();
    const targetDate = new Date(eventDate);
    if (targetDate < today) {
      alert("Please enter a future date.");
      return;
    }

    saveEvent(eventName, eventDate);
    startCountdown(eventName, eventDate);
  });

  // Cargar evento al iniciar
  loadSavedEvent();
});

// Abrir URL de donación
document.getElementById("donateButton").addEventListener("click", () => {
  const donateUrl = "https://paypal.me/iqb164?country.x=MX&locale.x=es_XC";
  chrome.tabs.create({ url: donateUrl }); // Usar chrome.tabs.create en lugar de window.open
});
