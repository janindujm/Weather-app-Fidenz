import './WeatherApp.css';
import { useEffect, useState } from 'react';

const WeatherApp = () => {
    const [rankedCities, setRankedCities] = useState([]);
    const [selectedCityWeather, setSelectedCityWeather] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/byid')
            .then(res => res.json())
            .then(data => setRankedCities(data))
            .catch(error => console.error('Error fetching ranked cities:', error));
    }, []);

    const handleCityClick = (cityName) => {
        fetch(`http://localhost:5000/weather?city=${cityName}`)
            .then(res => res.json())
            .then(data => {
                console.log("Weather data:", data);
                setSelectedCityWeather(data);
            })
            .catch(err => console.error("Error fetching city weather:", err));
    };

    return (
        <div className="container">

            <div className="logout-section">
                <button id="logout-btn">Logout</button>
            </div>

            <div className="grid-layout">

                {/* Ranking Card */}
                <div className="ranking-card">
                    <h3>Top Ranked Cities</h3>
                    <ul id="ranking-list">
                        {rankedCities.map((city, index) => (
                            <li
                                key={index}
                                onClick={() => handleCityClick(city.city)}
                                style={{ cursor: 'pointer', fontWeight: selectedCityWeather && selectedCityWeather.name === city.city ? 'bold' : 'normal' }}
                            >
                                {city.city}:{"\u00A0\u00A0\u00A0"}{city.score.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <div className="refresh-button">
                        <button
                            onClick={() => window.location.reload()}
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Weather Card */}
                <div className="weather-card">
                    <div className="search-bar">
                        <input type="text" id="search-city" placeholder="Enter city name..." />
                        <button id="search-btn">Search</button>
                    </div>

                    <div className="weather-details">
                        <h2 id="city-name">{selectedCityWeather ? selectedCityWeather.name : "City Name"}</h2>

                        <h1 id="temperature">
                            {selectedCityWeather ? `${selectedCityWeather.main.temp.toFixed(1)}°C` : "25°C"}
                        </h1>
                        <p id="weather-description">
                            {selectedCityWeather ? selectedCityWeather.weather[0].description : "Clear Sky"}
                        </p>

                        <div className="extra-info">
                            <div className="humidity">
                                <div className="data-name">Humidity</div>
                                <i className="fa-solid fa-droplet"></i>
                                <div className="data">
                                    {selectedCityWeather ? `${selectedCityWeather.main.humidity}%` : "60%"}
                                </div>
                            </div>
                            <div className="Wind">
                                <div className="data-name">Wind</div>
                                <i className="fa-solid fa-wind"></i>
                                <div className="data">
                                    {selectedCityWeather ? `${selectedCityWeather.wind.speed} m/s` : "10 km/h"}
                                </div>
                            </div>
                            <div className="Visibility">
                                <div className="data-name">Visibility</div>
                                <i className="fa-solid fa-eye"></i>
                                <div className="data">
                                    {selectedCityWeather ? `${selectedCityWeather.visibility} m` : "Good"}
                                </div>
                            </div>
                            <div className="Cloudiness">
                                <div className="data-name">Cloudiness</div>
                                <i className="fa-solid fa-cloud"></i>
                                <div className="data">
                                    {selectedCityWeather ? `${selectedCityWeather.clouds.all}%` : "Cloudiness"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comfort Score Card */}
                <div className="score-card">
                    <h3>Comfort Score</h3>
                    <div className="circle">
                        <span id="comfort-score-text">
                            {selectedCityWeather ? `${selectedCityWeather.comfortScore.toFixed(2)}%` : "85%"}
                        </span>
                    </div>
                    <p id="comfort-comment">
                        {selectedCityWeather
                            ? selectedCityWeather.comfortScore > 80
                                ? "Very Pleasant Weather"
                                : selectedCityWeather.comfortScore > 50
                                    ? "Pleasant"
                                    : "Moderate or Bad Weather"
                            : "Very Pleasant Weather"}
                    </p>
                </div>

            </div>

        </div>
    );
};

export default WeatherApp;
