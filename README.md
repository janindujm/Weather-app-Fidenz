# Weather Comfort Score App ☀️🌤️

A smart weather application that fetches real-time weather data and calculates a **comfort score** to help you find the most pleasant weather conditions across multiple cities.

## 📋 Table of Contents
- [Features](#-features)
- [How It Works](#-how-it-works)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Comfort Score Algorithm](#-comfort-score-algorithm)
- [Environment Variables](#-environment-variables)
- [Docker Deployment](#-docker-deployment)

## ✨ Features

- 🌡️ **Real-time Weather Data** - Fetches live data from OpenWeatherMap API
- 📊 **Comfort Scoring** - Intelligently calculates weather comfort (0-100 scale)
- 🚀 **Redis Caching** - Speeds up responses and reduces API calls
- 🏙️ **Multi-city Comparison** - Compare and rank cities by comfort score
- 🐳 **Fully Dockerized** - Easy deployment with Docker Compose
- 📱 **Modern UI** - Built with React and Vite for a smooth experience

## 🔍 How It Works

The app analyzes multiple weather parameters and combines them into a single comfort score:

| Parameter | Weight | Impact |
|-----------|--------|--------|
| Temperature | 60% | Optimal range: 20-25°C |
| Humidity | 20% | Optimal range: 40-60% |
| Wind Speed | 10% | Lower is better |
| Visibility | 5% | Higher is better |
| Cloudiness | 10% | Less clouds preferred |
| Rain | Penalty | -5 points if raining |

**Score Range**: 0 (uncomfortable) to 100 (perfect conditions)

## 🛠️ Tech Stack

**Frontend**
- React 18
- Vite
- Axios

**Backend**
- Node.js
- Express.js
- Redis (for caching)
- Axios

**External APIs**
- OpenWeatherMap API

**DevOps**
- Docker
- Docker Compose

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Redis (optional if running with Docker)
- OpenWeatherMap API key ([Get one free](https://openweathermap.org/api))

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/weather-app-fidenz.git
cd weather-app-fidenz
```

**2. Set up Backend**
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
OPENWEATHER_API_KEY=your_api_key_here
REDIS_HOST=localhost
REDIS_PORT=6379
PORT=5000
```

Start the backend:
```bash
npm start
```

**3. Set up Frontend**
```bash
cd frontend
npm install
npm run dev
```

The app will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## 📡 API Endpoints

### Get Weather by City Name
```http
GET /weather?city={cityName}
```

**Example Request:**
```bash
curl http://localhost:5000/weather?city=London
```

**Example Response:**
```json
{
  "city": "London",
  "temperature": 18,
  "humidity": 65,
  "windSpeed": 4.5,
  "visibility": 10000,
  "cloudiness": 40,
  "rain": 0,
  "comfortScore": 72.5,
  "cached": false
}
```

### Get Ranked Cities by Comfort Score
```http
GET /byid
```

**Example Response:**
```json
[
  { "city": "Sydney", "score": 87.5, "temperature": 23 },
  { "city": "Colombo", "score": 73.75, "temperature": 28 },
  { "city": "Oslo", "score": 45.2, "temperature": 12 }
]
```

## 🧮 Comfort Score Algorithm

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
Total Score =
(Temp Score * 0.60) +
(Humidity Score * 0.20) +
(Wind Score * 0.10) +
(Visibility Score * 0.05) +
(Cloud Score * 0.10) + Rain Penalty

## 🔐 Environment Variables

### Backend `.env`
```env
# OpenWeatherMap API
OPENWEATHER_API_KEY=your_api_key_here

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Server Configuration
PORT=5000

# Cache Settings (optional)
CACHE_EXPIRATION=3600  # 1 hour in seconds
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000
```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

**1. Build and start all services:**
```bash
docker-compose up --build -d
```

This will start:
- Frontend (React app) on port 5173
- Backend (Express API) on port 5000
- Redis on port 6379

**2. View logs:**
```bash
docker-compose logs -f
```

**3. Stop all services:**
```bash
docker-compose down
```

### Docker Compose Configuration
The `docker-compose.yml` includes:
- Automatic container restart
- Volume mounting for Redis persistence
- Network isolation between services
- Health checks

## 📊 Caching Details

The app uses Redis to cache:
- **Individual city weather** - Cached for 1 hour
- **Ranked city lists** - Cached for 1 hour

Benefits:
- ⚡ Faster response times
- 💰 Reduced API costs
- 🔒 Better rate limit management

Cache logs show `HIT` or `MISS` for debugging.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [Weather Icons](https://erikflowers.github.io/weather-icons/)

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Email: support@yourapp.com

---

Made with ☕ by [Your Name]