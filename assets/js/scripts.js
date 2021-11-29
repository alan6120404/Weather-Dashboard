var getWeatherInfo = function(cityName) {
    // TODO: fetching weather data from open weather api 
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + "&units=imperial&appid=915a0c004b1a5a39724d40f7412169b9"

    // request the url 
        fetch(apiUrl).then(function(response) {
            // request successful
            if (response.ok) {
                //console.log(response.json())
                response.json().then(function(object) {
                    displayWeatherInfo(object, cityName);
                });
            }else{
                alert("Error: City location not found.");
            }
        })
        .catch(function(error) {
            alert("Unable to Connect to Server");
        });
};

// display repo current and future weather condition
var displayWeatherInfo = function(weatherData, city) {

    // make sure the interior is empty
    currentWeatherEl.innerHTML = "";

    // getting the current date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    // var all the needed parameter of the weather
    var temp = weatherData.main.temp;
    var wind = weatherData.wind.speed;
    var humid = weatherData.main.humidity;
    var feelLike = weatherData.main.feels_like; 
    //var icn = weatherData.weather.icon;

    // capitalizing the city name
    arr = city.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    city = arr.join(" ");

    // create elements of the div
    var titleEl = document.createElement("h3");
    titleEl.textContent = city + " (" + today + ") ";

    var tempEl = document.createElement("p");
    tempEl.textContent = "Temp: " + temp + " F";
    var windEl = document.createElement("p");
    windEl.textContent = "Wind: " + wind + " MPH";
    var humidEl = document.createElement("p");
    humidEl.textContent = "Humidity: " + humid + " %";
    var feelLikeEl = document.createElement("p");
    feelLikeEl.textContent = "Feels Like: " + feelLike + " F";

    currentWeatherEl.appendChild(titleEl);
    currentWeatherEl.appendChild(tempEl);
    currentWeatherEl.appendChild(windEl);
    currentWeatherEl.appendChild(humidEl);
    currentWeatherEl.appendChild(feelLikeEl);

    getForecastInfo(weatherData);
} 

// fetching forecast data from open weather

var getForecastInfo = function(weatherData) {
    var long = weatherData.coord.lon;
    var lat = weatherData.coord.lat;
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=current,minutely,hourly,alerts&appid=915a0c004b1a5a39724d40f7412169b9"
    // fetching information
    fetch(apiUrl).then(function(response) {
        // request successful
        if (response.ok) {
            //console.log(response.json())
            response.json().then(function(object) {
                displayForecastInfo(object);
            });
        }else{
            alert("Error: City location not found.");
        }
    })
    .catch(function(error) {
        alert("Unable to Connect to Server");
    });
};

// creating a list of forecast

var displayForecastInfo = function(weatherData) {
    // clearing whatever is inside the daily forecast
    futureWeatherEl.innerHTML = "";

    // getting the current date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    // creating the elements within
    var dailyTitleEl = document.createElement("h4");
    dailyTitleEl.textContent = "5-Day Forecast: ";
    futureWeatherEl.appendChild(dailyTitleEl);
    var forecastContainEl = document.createElement("div");
    forecastContainEl.classList = " d-flex flex-row mx-auto flex-wrap";
    futureWeatherEl.appendChild(forecastContainEl);
    // run for loop to create elements for all 5 days of forecast
    for (var i = 0; i <= 4; i++) {
        var temp = weatherData.daily[i].temp.day;
        var wind = weatherData.daily[i].wind_speed;
        var humid = weatherData.daily[i].humidity;
        // adding a day to the original date
        dd++;
        // creating elements
        var containerEl = document.createElement("div");
        containerEl.classList = "border border-secondary border-3 rounded rounded-2 bg-dark text-white px-4 py-3 m-1"
        var titleEl = document.createElement("h5");
        titleEl.textContent = today;

        var tempEl = document.createElement("p");
        tempEl.textContent = "Temp: " + temp + " F";
        var windEl = document.createElement("p");
        windEl.textContent = "Wind: " + wind + " MPH";
        var humidEl = document.createElement("p");
        humidEl.textContent = "Humidity: " + humid + " %";

        forecastContainEl.appendChild(containerEl);
        containerEl.appendChild(titleEl);
        containerEl.appendChild(tempEl);
        containerEl.appendChild(windEl);
        containerEl.appendChild(humidEl);
    }
};

// handling the "submit"
var formSubmitHandler = function(weather) {
    weather.preventDefault();

    // get value from input element
    var cityName = cityInputEl.value.trim();
    if (cityName) {
        getWeatherInfo(cityName);
        cityInputEl.value = "";
    } else {
        alert("No such city exist.");
    }
    console.log(weather);
}


var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-input");
cityFormEl.addEventListener("submit", formSubmitHandler);
var currentWeatherEl = document.querySelector("#current-weather");
var futureWeatherEl = document.querySelector("#future-weather");