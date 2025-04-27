# SpamShield - Frontend

This repository contains the frontend client forSpamShield.

The frontend is built with **React.js**, styled for user-friendly interaction, and deployed using **Firebase Hosting**.

---

## Project Structure

| Folder/File | Purpose |
|:---|:---|
| `src/` | React components (Detection, History, Login, Signup, Navbar) |
| `public/` | Static assets (logo, manifest, favicon) |
| `.env` | Backend API URL and environment variables (excluded from GitHub) |
| `firebase.json` | Firebase Hosting configuration |
| `package.json` | Project metadata and dependencies |

---

## Features

- **Authentication**:
  - Login and Signup with email/password via Supabase.
  - Secure session management with JWT tokens stored in localStorage.

- **Spam Detection**:
  - Upload `.txt` or `.eml` files or manually input email text.
  - Real-time spam classification results with labels and confidence scores.

- **User Feedback**:
  - Option to flag whether the system classified a message correctly.
  - Feedback sent to backend and stored for future model improvement.

- **History Tracking**:
  - View personal classification history with timestamps.
  - Visualize spam vs ham statistics.

- **Mobile-Responsive**:
  - Fully responsive layout using React best practices.

---
