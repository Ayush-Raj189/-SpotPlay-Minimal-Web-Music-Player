# 🎵 SpotPlay
> **A sleek, no-fuss music player built with HTML, CSS, and vanilla JavaScript.**  

SonicPlay is a **lightweight and responsive music player** that lets you browse 🎼, play ▶️, and control 🔊 your local music directly in your browser.  
It’s built without frameworks, focusing on **simplicity, speed, and a clean UI** — perfect for learning or integrating into other projects.  

---

## ✨ Features
- 🎧 **Play / Pause** songs instantly  
- ⏮ **Previous / Next** track navigation  
- 🕒 **Seek bar** for skipping within songs  
- ⏱ **Live time display** (current / total duration)  
- 🔊 **Volume control** with mute/unmute option  
- 📂 **Dynamic folder-based song loading** with cover image & album info  
- 📱 **Responsive design** with hamburger menu for mobile view  

---

## 🛠 Tech Stack
- **HTML5** — Structure & layout  
- **CSS3** — Styling & responsiveness  
- **JavaScript (Vanilla)** — Functionality & dynamic updates  
- **Local HTTP Server** — For file serving & directory fetching  

---

## 📂 Project Structure
├── index.html # Main HTML page
├── style.css # Stylesheet
├── script.js # Main JavaScript logic
├── img/ # Icons & UI images
└── songs/ # Albums & audio files
├── Album 1/
│ ├── song1.mp3
│ ├── song2.mp3
│ ├── cover.jpeg
│ └── info.json
├── Album 2/
│ ├── ...
└── Trending/

## ⚙️ How It Works
1. **Album Fetching** — Reads the `/songs/` directory and lists all albums with cover images and metadata.  
2. **Song Loading** — Fetches `.mp3` files from the selected album folder and displays them in the playlist.  
3. **Playback Control** — Uses the JavaScript `Audio()` API to play and control songs.  
4. **Responsive Sidebar** — Hamburger menu toggles the playlist on small screens.  

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone <https://github.com/Ayush-Raj189/-SpotPlay-Minimal-Web-Music-Player.git>

2️⃣ Start a Local Server
You can use Python:
# Python 3
python -m http.server 3000

3️⃣ Open in Browser
 http://127.0.0.1:3000/video%2084-Project%202/index.html

📄 Requirements
All albums must have:
At least one .mp3 file
cover.jpeg (album cover)
info.json file with:
   {
  "title": "Album Title",
  "description": "Album description here"
}

🧑‍💻 Author
Ayush
Built with ❤️ using pure HTML, CSS & JavaScript.

