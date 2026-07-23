async function loadWeather() {
    // Lucknow Coordinates
     const lat = 26.8467;
     const lon = 80.9462;
     const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=26.8467&longitude=80.9462&current=temperature_2m,wind_speed_10m,relative_humidity_2m`;
     const refreshBtn = document.getElementById("refreshBtn");
     const loadingStatus = document.getElementById("loadingStatus");
     const weatherDisplay = document.getElementById("weatherDisplay");
     const tempVal = document.getElementById("tempVal");
     const windVal = document.getElementById("windVal");

    try {
        // Set loading UI state
        refreshBtn.disabled = true;
        refreshBtn.innerText = "Fetching...";
        loadingStatus.style.display = "block";
        loadingStatus.innerText = "Connecting to satellite weather data...";
        weatherDisplay.style.display = "none"; // Hide previous display while fetching

        // fetch the data form the Open Meteo-API...
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Weather service offline. Code: ${response.status}`);
        }
       
        // convert the string format text into object and Array form that understand by the javascript
        const data = await response.json();

        // Extract current weather properties from deep JSON structure
        const temperature = data.current.temperature_2m;
        const windspeed = data.current.wind_speed_10m;
        const humidity = data.current.relative_humidity_2m; // Assuming humidity is part of the response    

        // Render extracted values into HTML tags
        tempVal.innerText = `${temperature}°C`;
        windVal.innerText = `Wind Speed: ${windspeed} km/h`;
        humidityVal.innerText = `Humidity: ${humidity}%`; // Assuming humidity is part of the response

        // Hide loading text, show weather card display
        loadingStatus.style.display = "none";
        weatherDisplay.style.display = "block";

    } catch (err) {
             console.error("Weather fetch error:", err);
             loadingStatus.innerText = "❌ Failed to load weather data.";
         } finally {
              refreshBtn.disabled = false;
              refreshBtn.innerText = "Refresh Weather";
           }
}
    





