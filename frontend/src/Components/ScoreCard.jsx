
import React from "react";

const ScoreCard = ({selectedCityWeather}) => {
    return (
        <div className="score-card">
                    <h3>Comfort Score</h3>
                    <div className="circle">
                        <span id="comfort-score-text">
                            {selectedCityWeather
                                ? `${selectedCityWeather.comfortScore?.toFixed(2)}%`
                                : "85%"}
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
    )
};

export default ScoreCard;