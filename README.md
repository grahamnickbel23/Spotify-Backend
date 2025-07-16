# 🎵 Spotify Clone – Personalized Music Platform with AI Integration

This project is a full-stack Spotify-inspired music platform that lets users explore songs, upload audio, and generate personalized features using AI models.

---

## 🚀 Features

### 🎧 Core Music App
- Upload, stream, and manage music files
- Support for DASH-segmented audio in multiple bitrates (32k, 64k, 128k)
- Audio uploads auto-convert from `.webm` to `.opus` with bitrate segmentation
- Metadata like title, artist, genre fetched from Spotify using the Spotify Web API

### 🧠 AI/ML-Powered Features *(In Progress)*
- **Lyrics Search via Transliteration**: Allows users to search for songs using phonetic English versions of lyrics (Bengali, Hindi, etc.)
- **Voice Transfer Models**: Convert a song to sound like it was sung by another singer (e.g., Arijit → Shreya)
- **Custom Recommendations**: Parse Spotify or YouTube history exports to generate ML-based song recommendations

### ☁️ Cloud Integration
- AWS S3 integration for song uploads and folder management
- Automatically structured audio folders with MPD manifest support

### 🔐 Authentication *(Planned)*
- Device-based login (like Google/GitHub flow)
- Planned support for 2FA using WebSockets and push notifications

---

## 🧱 Tech Stack

| Layer      | Tools Used                             |
|-----------|------------------------------------------|
| Frontend  | *TBD (React Native or Web, not part of this repo yet)* |
| Backend   | Node.js, Express.js, Prisma, PostgreSQL (via Supabase) |
| ML / AI   | PyTorch (PINN for PDE solving), Voice models (planned) |
| Audio     | FFmpeg for conversion, MPEG-DASH for adaptive streaming |
| Cloud     | AWS S3 for uploads                       |

---

## 🛠️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/your-username/spotify-clone.git
cd spotify-clone

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# (fill in AWS keys, DB URL, etc.)

# Start the server
node index.js
