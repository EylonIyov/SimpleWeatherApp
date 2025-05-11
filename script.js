
const cityInput       = document.getElementById('city');
const cityNameEl      = document.getElementById('city-name');
const temperatureEl        = document.getElementById('temperature');
const descriptionEl        = document.getElementById('weather-description');
const humidityEl           = document.getElementById('humidity');
const windSpeedEl          = document.getElementById('wind-speed');
const searchButton         = document.getElementById('search-btn');
const weatherImageEl        = document.getElementById('weather-icon');
const shortDescriptionEl    = document.getElementById('visiting-recommendation');



searchButton.addEventListener('click', async () => {
    const city = cityInput.value.trim() || 'Unknown City';

    if (city === '') {
        alert('Please enter a city name.');
        return;
    }
    // Simulate fetching weather data
    // In a real application, you would use fetch() to get data from an API
    const weatherData = await fetch('http://localhost:3001/weather?city=' + city).then(response => response.json());
    if (!weatherData) {
        alert('Error fetching weather data');
        return;
    }
    const country = weatherData.location.country;
    const CountryInfo = await fetch(`https://restcountries.com/v3.1/name/${country}`).then(response => response.json());
    const countryCode = CountryInfo[0].cca2;
    const countryFlag = `https://flagcdn.com/16x12/${countryCode.toLowerCase()}.png`;

    

    cityNameEl.textContent= city;
    temperatureEl.textContent = `Temperature: ${weatherData.current.temp_c}°C`;
    temperatureEl.style.color = weatherData.current.temp_c > 30 ? 'red' : 'blue';

    const res = await fetch(`http://localhost:3001/attractions?city=${city}&country=${country}`);
    if (!res.ok) {
        alert('Error fetching attractions data');
        return;
    }   
    // 
    const  text  = await res.json();

    descriptionEl.textContent = `Weather: ${weatherData.current.condition.text} `;
    humidityEl.textContent    = `Humidity: ${weatherData.current.humidity} %`;
    windSpeedEl.textContent   = `Wind Speed: ${weatherData.current.wind_kph} kp/h`;
    weatherImageEl.src       = countryFlag;
    shortDescriptionEl.textContent = "Attractions: " + text.text;
});

