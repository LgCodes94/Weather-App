var weatherApi = 'c471795327c1b42332efafa91f8353f9';

let locationElement = document.getElementById('location');
let dateElement = document.getElementById('date');
let tempElement = document.getElementById('temp');
let windElement = document.getElementById('wind');
let humidityElement = document.getElementById('humidity');

// Get references to HTML elements
const searchForm = document.getElementById('search-form');
const forecast = document.getElementById('forecast');
const searchHistory = document.getElementById('search-history');
const cityInput = document.getElementById('city-input');
const currentWeather = document.getElementById('current-weather');
let apiKeys = weatherApi;


function fetchWeatherData(city) {

    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKeys}`

    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);

            var { lat, lon } = data[0]
            console.log(lat, lon);
            futureForeCast(lat, lon);
            saveSearchValue(city);
        })
        .catch(function (error) {
            console.error('There was a problem with the fetch operation:', error);
        });
    displayDate();
}

function futureForeCast(lat, lon) {

    let url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKeys}`

    fetch(url2)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            displayCurrentWeather(data);
            displayFutureWeather(data);
        })
        .catch(function (error) {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function displayFutureWeather(data) {

    for (var i = 0; i < data.list.length; i += 8) {


        var date = document.querySelector(`#future${i / 8} #date`);
        var temp = document.querySelector(`#future${i / 8} #temp`);
        var wind = document.querySelector(`#future${i / 8} #wind`);
        var humidity = document.querySelector(`#future${i / 8} #humidity`);


        date.textContent = "Date - " + data.list[i].dt_txt;
        temp.textContent = "Temp - " + data.list[i].main.temp;
        wind.textContent = "Wind - " + data.list[i].wind.speed;
        humidity.textContent = "Humidity - " + data.list[i].main.humidity;

    }
}
function displayCurrentWeather(data) {

    locationElement.textContent = "Location - " + data.city.name;
    // dateElement.textContent = `Date: ${new Date(data.dt * 1000).toDateString()}`;
    tempElement.textContent = "Temp - " + data.list[0].main.temp;
    windElement.textContent = "Wind - " + data.list[0].wind.speed;
    humidityElement.textContent = "Humidity - " + data.list[0].main.humidity;
}

function saveSearchValue() {
    const inputValue = cityInput.value;
    if (inputValue) {
        if (typeof Storage !== 'undefined') {
            let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
            recentSearches.push(inputValue);
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        } else {
            alert('Local storage is not available in your browser.');
        }
    }
}

function addToSearchHistory(city) {
    const listItem = document.createElement('li');
    listItem.textContent = city;
    listItem.addEventListener('click', () => {
        cityInput.value = city;
        fetchWeatherData(city);
    });
    searchHistory.appendChild(listItem);
}


searchForm.addEventListener('click', function (e) {
    console.log(searchForm)
    e.preventDefault();
    const city = cityInput.value;
    fetchWeatherData(city);
});

function displayDate() {
    var currentDate = dayjs().format('MM/DD/YYYY')
    dateElement.textContent = 'Date - ' + currentDate;
}