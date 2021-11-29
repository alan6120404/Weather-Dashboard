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

    displayForecastInfo(weatherData);
} 

// creating a list of forecast

var displayForecastInfo = function(weatherData) {
    var long = weatherData.coord.lon;
    var lat = weatherData.coord.lat;
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=current,minutely,hourly,alerts&appid=915a0c004b1a5a39724d40f7412169b9"
    // fetching information
    fetch(apiUrl).then(function(response) {
        // request successful
        if (response.ok) {
            console.log(response.json())
            /*response.json().then(function(object) {
                displayWeatherInfo(object, cityName);
            });*/
        }else{
            alert("Error: City location not found.");
        }
    })
    .catch(function(error) {
        alert("Unable to Connect to Server");
    });
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
