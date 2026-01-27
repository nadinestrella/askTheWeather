# 🌤️ AskTheWeather

AskTheWeather is a web application built with **React + TypeScript** that allows you to check the current weather and forecast for a city using the **free OpenMeteo API**.

The user can enter a city, check the weather information, and this is saved in **localStorage** to persist the data between recharges.

---

## 🚀 Features

- 🔍 Search for cities by name
- 🌡️ Current temperature
- ☁️ Weather conditions
- 📅 Multi-day forecast
- 💾 Data persistence in `localStorage`
- ⏳ Load states and error handling
- 🎨 Modern interface with Tailwind CSS

---

## 🛠️ Technologies used

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Open-Meteo API**
- **Lucide React Icons**

---

## 🌍 APIs used

`https://open-meteo.com/en/docs`

---

## 🤖 AI Weather Assistant (Gemini)

This project integrates Google Gemini to provide an AI-powered weather description for a given city.

When the user searches for a city, in addition to fetching real weather data from the Open-Meteo API, the app can ask Gemini to generate a short, human-friendly sentence describing the current weather.

### How it works

- Uses Google Generative AI (Gemini).

- Sends a prompt like:
  "Tell me the current weather in Paris. Answer in one short sentence."

- The response is cleaned and displayed in the UI.

- Errors and loading states are handled gracefully.

This feature demonstrates:

- Integration with an external AI service

- Async state handling in React

- Error management for third-party APIs

## 🧪 Testing

The project includes automated tests to ensure reliability and correct behavior.

### Technologies used

- Vitest – test runner

- @testing-library/react – testing React hooks

- jsdom – browser-like environment for tests

- Mocks & spies with vi.mock and vi.spyOn

### What is tested

- fetchWeather service
  - Returns correct weather data when APIs respond successfully

  - Throws meaningful errors when the city is not found or APIs fail

- useWeather hook
  - Correctly updates loading, weatherData, and error states

  - Handles successful and failed API calls

  - Works independently from real network requests by mocking services

### Example test scenarios

- Successful weather fetch and state update

- Error handling when the API fails

- Local state isolation between tests

### To run the tests:

```bash
npm run test
```

## Getting Started

This project is publicly available on GitHub and can be run locally by following the steps below.

### Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js** (version 18 or higher recommended)
- **npm** (comes with Node.js)
- **Git**

---

### Clone the Repository

Clone the repository from GitHub using the following command:

```bash
git clone https://github.com/nadinestrella/askTheWeather.git
```

Then navigate to the project directory:

```bash
cd askTheWeather
```

### Install Dependencies

Install all required dependencies by running:

```bash
npm install
```

### Run the Project

To start the application in development mode, run:

```bash
npm run dev
```

### The application will be available in your browser at:

```bash
http://localhost:5173
```

## 👩🏼‍💻 Developed by Nadine Estrella
