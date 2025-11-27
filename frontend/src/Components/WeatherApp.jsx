import './WeatherApp.css';
import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import RankingCard from './RankingCard';
import WeatherCard from './WeatherCard';
import ScoreCard from './ScoreCard';


const WeatherApp = () => {

    const { logout } = useAuth0();

    const [rankedCities, setRankedCities] = useState([]);
    const [selectedCityWeather, setSelectedCityWeather] = useState(null);
    const [location, setLocation] = useState('');

    // Load ranked cities on first render
    useEffect(() => {
        fetch('http://localhost:5000/byid')
            .then(res => res.json())
            .then(data => setRankedCities(data))
            .catch(error => console.error('Error fetching ranked cities:', error));
    }, []);

    // Fetch weather for a clicked city
    const handleCityClick = (cityName) => {
        if (!cityName) return;

        fetch(`http://localhost:5000/weather?city=${cityName}`)
            .then(res => res.json())
            .then(data => {
                console.log("Weather data:", data);
                setSelectedCityWeather(data);
            })
            .catch(err => console.error("Error fetching city weather:", err));
    };

    const refreshRankedCities = () => {
        fetch('http://localhost:5000/byid')
            .then(res => res.json())
            .then(data => setRankedCities(data))
            .catch(error => console.error('Error fetching ranked cities:', error));
    }

    return (
        <div className="container">

            <div className="logout-section">
                <button id="logout-btn" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
            </div>

            <div className="grid-layout">

                {/* Ranking Card */}
                <RankingCard
                    rankedCities={rankedCities}
                    selectedCityWeather={selectedCityWeather}
                    onCityClick={handleCityClick}
                    onRefresh={refreshRankedCities}
                />

                <WeatherCard
                    selectedCityWeather={selectedCityWeather}
                    location={location}
                    setLocation={setLocation}
                    handleCityClick={handleCityClick}
                />
                

                {/* Comfort Score Card */}
                <ScoreCard 
                selectedCityWeather={selectedCityWeather} 
                />

            </div>
        </div>
    );
};

export default WeatherApp;
