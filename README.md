# FOCUS-TIMER 

A productivity web app designed to balance focus sessions and rest cycles with a soft visual design.

## 🔗 Live Deployment
* **Live Link:** [INSERT YOUR LIVE NETLIFY DEPLOYED URL HERE]

## 🎯 Problem Statement & Purpose
* **The Problem:**
  It is incredibly easy to lose track of time, work past exhaustion, or get distracted too easily.
  I wanted a simple app that tells users when to focus and when to rest.
  
* **The Solution:**
* A specialized countdown manager that lets users dictate their target focus time parameters and
  pick their automated transition paths (Short Break, Long Break, or None) task-by-task.
  
* **Manual Tracking Alternative:**
  Previously solved inefficiently by writing goals down on random loose paper sheets or constantly setting manual alarms on a phone.

## What it does
* **Custom Time Management**: A default 10-minute focus timer that safely falls back to a clean 10-minute slot if no custom minutes are specified when creating a task.
* **Automated Mode Switching**: Offers 5-minute short breaks and 15-minute long breaks that trigger and start counting down automatically without disruptive alert pop-ups.
* **Dynamic Control Mechanics**: Full flexibility to start, pause, and reset the timer loop manually at any second.
* **Precise Telemetry Counters**: Accurately tracks total focus minutes second-by-second and counts exactly how many focus sessions you have conquered (completely ignoring rest periods).
* **Smart Agenda Checklist**: Add tasks you want to work on, set their unique duration, and specify a break preference per task. Checking off completed tasks moves them instantly to sit directly underneath the active unchecked ones.
* **Premium Theme Styling**: Features a high-fidelity soft peach and strawberry cream layout system with a centered capital header title and proverbs banner text in bold solid black.

## 🛠️ Framework Choice & Considerations
This application was deliberately built using **React**.
I chose React because `useState`, `useEffect`, and `useRef` made it straightforward to manage the timer logic. 
`useState` holds the active state parameters (running state, seconds left, task lists), 
`useEffect` runs the second-by-second countdown interval silently, and
`useRef` provides a strict execution guard to defend against rendering duplication glitches caused by React StrictMode during local testing.



## 🚀 Local Installation & Setup

Follow these exact steps to clone and boot the workspace locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Florence-code-hub/Focus-timer.git
   ```
2. **Navigate into the folder structure:**
   ```bash
   cd focus-timer
   ```
3. **Install the node module packages:**
   ```bash
   npm install
   ```
4. **Launch the local preview server:**
   ```bash
   npm
   run dev
   ```
5. Open your local browser to `http://localhost:5173`. 









