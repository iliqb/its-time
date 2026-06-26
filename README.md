# ⏳ itsTime

A simple and lightweight Google Chrome extension that lets you create a countdown for an important event.

Whether you're waiting for a birthday, vacation, wedding, exam, launch date, or any special occasion, **itsTime** keeps track of the remaining time directly from your browser.

---

##  Features

- 📅 Set a custom event name and date
- ⏱️ Live countdown timer
- 💾 Saves data using `chrome.storage.sync`
- 🔄 Automatically restores saved events
- 🎉 Displays a message when the event day arrives
- ⚡ Lightweight and fast
- 🎨 Simple and clean interface

---

## 📸 Preview


## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Chrome Extensions API
- `chrome.storage.sync`

---

## 📂 Project Structure

```bash
its-time/
│
├── index.html        # Main extension popup
├── style.css         # Styles
├── script.js         # Countdown logic
├── manifest.json     # Chrome extension configuration
├── 128.png           # Extension icon
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/iliqb/its-time.git
```

### 2. Open Chrome Extensions

Go to:

```text
chrome://extensions/
```

### 3. Enable Developer Mode

Turn on **Developer mode** in the top-right corner.

### 4. Load the extension

Click:

```text
Load unpacked
```

Then select the project folder.

---

## 🧠 How It Works

The extension stores the selected event name and date using Chrome's `chrome.storage.sync` API.

Every time the extension popup opens, it:

1. Retrieves the saved event data
2. Calculates the remaining time
3. Updates the countdown dynamically
4. Displays a special message when the date arrives or passes

---

## 🔮 Future Improvements

- ⏰ Notifications and reminders
- 🌙 Dark mode
- 📱 Responsive popup design
- 🎨 Multiple themes
- 🔔 Sound alerts
- 📆 Multiple countdown events
- 🌎 Localization support

---

## 🐛 Known Limitations

- Currently supports only one event at a time
- Countdown updates only while the popup is open
- Chrome browser only

---

## 🤝 Contributing

Contributions, ideas, and suggestions are welcome.

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👤 Author

Created by Iliana Quintero

GitHub: https://github.com/iliqb

---

## 🌐 Chrome Web Store

Install the extension here:

https://chromewebstore.google.com/detail/ndoomahidgiehkdhcadicaoplbieiemm
