import './WeatherApp.css';


const WeatherApp = () => {
  return (
    <div className="container">

        <div className="logout-section">
            <button id="logout-btn">Logout</button>
        </div>

        <div className="grid-layout">
            <div className="ranking-card">
                <h3>Top Ranked Cities</h3>
                <ul id="ranking-list">
                    <li>1. Colombo - Score 92</li>
                    <li>2. Kandy - Score 88</li>
                    <li>3. Galle - Score 85</li>
                    <li>4. Jaffna - Score 80</li>
                    <li>1. Colombo - Score 92</li>
                    <li>2. Kandy - Score 88</li>
                    <li>3. Galle - Score 85</li>
                    <li>4. Jaffna  Score 80</li>
                </ul>
            </div>

            <div className="weather-card">
                <div className="search-bar">
                    <input type="text" id="search-city" placeholder="Enter city name..." />
                    <button id="search-btn">Search</button>
                </div>

                <div className="weather-details">
                    <h2 id="city-name">City Name</h2>
    
                    <h1 id="temperature">25°C</h1>
                    <p id="weather-description">Clear Sky</p>

             
                    <div className="extra-info">
                        <div className="humidity">
                            <div className="data-name">Humidity</div>
                            <i className="fa-solid fa-droplet"></i>
                            <div className="data">60% </div>
                        </div>
                        <div className="Wind">
                            <div className="data-name">Wind</div>
                            <i className="fa-solid fa-wind"></i>
                            <div className="data">10 km/h</div>
                        </div>
                    </div>


                </div>
            </div>

            <div class="score-card">
                <h3>Comfort Score</h3>
                <p id="comfort-score">85 / 100</p>
                <p id="comfort-comment">Very Pleasant Weather</p>
            </div>

        </div>





    </div>
  );
};


export default WeatherApp;