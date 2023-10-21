var weatherApi = 'c471795327c1b42332efafa91f8353f9';

// Get references to HTML elements
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');
const searchHistory = document.getElementById('search-history');

// API Key
var weatherApi = 'c471795327c1b42332efafa91f8353f9';

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`http://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}?appid={weatherApi}`);
        const currentData = await response.json();

        const forecastResponse = await fetch(`http://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}?appid={weatherApi}`);
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

        addCityToSearchHistory(city);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
   
}

function displayForecast(data) {
   
}

function addCityToSearchHistory(city) {
}

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const city = cityInput.value;
    fetchWeatherData(city);
});
