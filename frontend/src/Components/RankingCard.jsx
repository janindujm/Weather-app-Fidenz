import React from 'react';


const RankingCard = ({rankedCities,selectedCityWeather, onCityClick,onRefresh }) => {
    return (
        <div className="ranking-card">
            <h3>Top Ranked Cities</h3>
                    <ul id="ranking-list">
                        {rankedCities.map((city, index) => (
                            <li
                                key={index}
                                onClick={() => onCityClick(city.city)}
                                style={{
                                    cursor: 'pointer',
                                    fontWeight:
                                        selectedCityWeather?.name === city.city
                                            ? 'bold'
                                            : 'normal'
                                }}
                            >
                                {city.city}:{"\u00A0\u00A0\u00A0"}{city.score.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <div className="refresh-button">
                        <button onClick={() => onRefresh()}>
                            Refresh
                        </button>
                    </div>
                </div>

    );
};

export default RankingCard;