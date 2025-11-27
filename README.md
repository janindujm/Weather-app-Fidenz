# Weather-app-Fidenz
# Weather Comfort Score App

## Overview
This is a **Weather App** built with **React + Vite (Frontend)** and **Node.js + Express (Backend)**.  
It fetches live weather data from **OpenWeatherMap API** and calculates a **Comfort Score** for each city.  
The app also uses **Redis** caching to speed up responses and reduce API calls.

---

## Features
- Fetch weather by **city name** or **city ID**
- Calculate **comfort score** based on:
  - Temperature
  - Humidity
  - Wind speed
  - Visibility
  - Cloudiness
  - Rain
- **Cache results** with Redis (Cache HIT / MISS logging)
- **Sort cities** by comfort score
- Dockerized frontend, backend, and Redis

---

## Algorithm

### 1. Fetch Weather Data
Weather data is retrieved from OpenWeatherMap API and includes:
- Temperature (°C)  
- Humidity (%)  
- Wind speed (m/s)  
- Visibility (meters)  
- Cloudiness (%)  
- Rain (mm)

### 2. Score Each Parameter
Each weather parameter is scored from 0–100:

| Parameter   | Weight | Example Scoring Logic |
|------------|--------|---------------------|
| Temperature | 60%   | 20–25°C → 100, 15–18°C → 55, <10°C → 0 |
| Humidity    | 20%   | 40–60% → 100, very low/high → 0 |
| Wind Speed  | 10%   | Calm → 100, very windy → 0 |
| Visibility  | 5%    | Clear → 100, foggy → 0 |
| Cloudiness  | 10%   | Clear → 100, rainy → 0 |
| Rain Penalty| -5    | Slight penalty if rain > 0 |

### 3. Weighted Total
The final **comfort score** is calculated as:

