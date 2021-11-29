var getWeatherRepo = function(cityName) {
    // TODO: fetching weather data from open weather api 
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + "&appid=915a0c004b1a5a39724d40f7412169b9"

    // request the url 
        fetch(apiUrl).then(function(response) {
            // request successful
            if (response.ok) {
                console.log(response.json());
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
        getWeatherRepo(cityName);
        cityInputEl.value = "";
    } else {
        alert("No such city exist.");
    }
    console.log(weather);
}


var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-input");
cityFormEl.addEventListener("submit", formSubmitHandler);

