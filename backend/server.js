const express = require("express");
const cors = require("cors");
const cities_file = require("./cities.json");
const {getCachedData,setCachedData,getLastCacheStatus} = require("./cache");

require("dotenv").config();

const app = express();
app.use(cors());

const API_KEY = process.env.WEATHER_API_KEY;



// Helper function to calculate comfort score
function comfortScore(temp, humidity, windSpeed, visibility, cloudiness, rain ) {
    let scoreTemp = 0, scoreHumidity = 0, scoreWind = 0, scoreVisibility = 0, scoreCloud = 0;

    // Temperature (0–100 raw, later weighted to 50%)
    if (temp >= 20 && temp <= 25) scoreTemp = 100;
    else if ((temp > 18 && temp < 20) || (temp > 25 && temp < 28)) scoreTemp = 85;
    else if ((temp > 15 && temp < 18) || (temp > 28 && temp < 30)) scoreTemp = 55;
    else if ((temp > 13 && temp < 15) || (temp > 30 && temp < 33)) scoreTemp = 25;
    else if ((temp > 9 && temp < 13) || (temp > 33 && temp < 35)) scoreTemp = 10;
    else scoreTemp = 1;
    

    // Humidity (0–100 raw, later weighted to 20%)
    if (humidity >= 40 && humidity <= 60) scoreHumidity = 100;
    else if ((humidity > 30 && humidity < 40) || (humidity > 60 && humidity < 75)) scoreHumidity = 75;
    else if (humidity > 75 && humidity <= 95) scoreHumidity = 50;
    else if (humidity > 95 || humidity <= 20) scoreHumidity = 0;

    // Wind Speed (0–100 raw, weighted to 10%)
    if (windSpeed < 0.5) scoreWind = 100;
    else if (windSpeed >= 0.5 && windSpeed < 3) scoreWind = 75;
    else if (windSpeed >= 3 && windSpeed < 7) scoreWind = 50;
    else if (windSpeed >= 7 && windSpeed < 10) scoreWind = 25;
    else scoreWind = 0;

    // Visibility (0–100 raw, weighted to 5%)
    if (visibility >= 10000) scoreVisibility = 100;
    else if (visibility >= 5000) scoreVisibility = 75;
    else if (visibility >= 1000) scoreVisibility = 25;
    else scoreVisibility = 0;

    if (rain > 0) {
        scoreCloud = 0; // raining = low comfort
    } else {
        if (cloudiness < 20) scoreCloud = 100;
        else if (cloudiness < 80) scoreCloud = 75;
        else scoreCloud = 25;
    }


    let rainPenalty = 0;
    if(rain > 0) {
                rainPenalty = -5;   // slight penalty for rain
        } else {
                rainPenalty = 0;    // no penalty if no rain
            }
    // Weighted total
    let totalScore =
        (scoreTemp * 0.60) +
        (scoreHumidity * 0.20) +
        (scoreWind * 0.10) +
        (scoreVisibility * 0.05) +
        (scoreCloud * 0.10) + rainPenalty;


    return totalScore; // clamp 0–100
}

async function getWeatherDatabyid(city_id) {
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${city_id}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getWeatherByCityName(city_name) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getcitiesid() {
    const ids = cities_file.List.map(city => city.CityCode);
    const city_name = cities_file.List.map(city => city.CityName);
    const results = [];

    for (let i = 0; i < ids.length; i++) {

        try {
            const data = await getWeatherDatabyid(ids[i]);   // <-- FIXED: added await

            const temp = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const pressure = data.main.pressure;
            const visibility = data.visibility;
            const cloudiness = data.clouds.all;
            const rain = data.rain && data.rain['1h'] ? data.rain['1h'] : 0;

            const score = comfortScore(temp, humidity, windSpeed, visibility, cloudiness, rain);

            results.push({
                city: city_name[i],
                score: score
            });

            results.sort((a, b) => b.score - a.score);

        } catch (err) {
            console.error(`Error fetching weather data for city ID ${ids[i]}:`, err);
        }
    }
    return results;
}


app.get("/weather", async (req, res) => {
    const city = req.query.city;

    if (!city) return res.status(400).json({ error: "City is required" });

    //Caching part
    const cacheKey = city.toLowerCase();
    const cached = await getCachedData(cacheKey);
    if (cached) {
        console.log(`Cache ${getLastCacheStatus()} for city: ${city}`);
        return res.json(cached);
    }


    try {
        
        const data = await getWeatherByCityName(city);

        if (data.cod !== 200) return res.status(404).json({ error: data.message });

        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const pressure = data.main.pressure;
        const visibility = data.visibility;
        const cloudiness = data.clouds.all;
        const rain = data.rain && data.rain['1h'] ? data.rain['1h'] : 0;

        const score = comfortScore(temp, humidity, windSpeed, visibility, cloudiness, rain);

        // Send weather + comfort score
        const responseData = {
            weather: data.weather,
            main: data.main,
            wind: data.wind,
            clouds: data.clouds,
            visibility: visibility,
            name: data.name,
            comfortScore: score
        };


        console.log(`Comfort score for ${city}:`, score);
        await setCachedData(cacheKey, responseData); 
        console.log(`Cache ${getLastCacheStatus()} for city: ${city}`)
        return res.json(responseData);

    } catch (err) {
        console.error("Backend Error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/byid", async (req, res) => {

    const cachekey = `citylist_rank`;
    const cached =  await getCachedData (cachekey);
    if(cached) {
        console.log(`Cache ${getLastCacheStatus()} for city list`);
        return res.json(cached);
    }

    const citydict = await getcitiesid();
    await setCachedData(cachekey, citydict); // cache for 30 minutes
    res.json(citydict);
    console.log(citydict);
    console.log(`Cache ${getLastCacheStatus()} for city list`)
    
});

app.listen(5000, () => console.log("Backend running on port 5000"));
