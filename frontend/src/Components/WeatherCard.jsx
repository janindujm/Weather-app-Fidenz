

const WeatherCard = ({selectedCityWeather,location,setLocation,handleCityClick}) => {
    return (
         <div className="weather-card">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Enter city name..."
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <button id="search-btn" onClick={() => handleCityClick(location)}>
                            Search
                        </button>
                    </div>

                    <div className="weather-details">
                        <h2 id="city-name">
                            {selectedCityWeather?.name || "City Name"}
                        </h2>

                        <h1 id="temperature">
                            {selectedCityWeather
                                ? `${selectedCityWeather.main?.temp?.toFixed(1)}°C`
                                : "25°C"}
                        </h1>

                        <p id="weather-description">
                            {selectedCityWeather
                                ? selectedCityWeather.weather?.[0]?.description
                                : "Clear Sky"}
                        </p>

                        <div className="extra-info">
                            <div className="humidity">
                                <div className="data-name">Humidity</div>
                                <i className="fa-solid fa-droplet"></i>
                                <div className="data">
                                    {selectedCityWeather
                                        ? `${selectedCityWeather.main?.humidity}%`
                                        : "60%"}
                                </div>
                            </div>

                            <div className="Wind">
                                <div className="data-name">Wind</div>
                                <i className="fa-solid fa-wind"></i>
                                <div className="data">
                                    {selectedCityWeather
                                        ? `${selectedCityWeather.wind?.speed} m/s`
                                        : "10 km/h"}
                                </div>
                            </div>

                            <div className="Visibility">
                                <div className="data-name">Visibility</div>
                                <i className="fa-solid fa-eye"></i>
                                <div className="data">
                                    {selectedCityWeather
                                        ? `${selectedCityWeather.visibility} m`
                                        : "Good"}
                                </div>
                            </div>

                            <div className="Cloudiness">
                                <div className="data-name">Cloudiness</div>
                                <i className="fa-solid fa-cloud"></i>
                                <div className="data">
                                    {selectedCityWeather
                                        ? `${selectedCityWeather.clouds?.all}%`
                                        : "Cloudiness"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
};

export default WeatherCard;