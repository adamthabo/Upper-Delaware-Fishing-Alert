// Fetch USGS river data (discharge and gauge height)
const usgsUrl = "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01426500&parameterCd=00060,00065";
fetch(usgsUrl)
  .then(response => response.json())
  .then(data => {
    const timeSeries = data.value.timeSeries;
    if (timeSeries && timeSeries.length >= 2) {
      const siteName = timeSeries[0].sourceInfo.siteName;
      const flowCFS = timeSeries[0].values[0].value[0].value;    // Discharge (cubic feet per second)
      const gaugeFt = timeSeries[1].values[0].value[0].value;    // Gage height (feet)
      document.getElementById('usgs-data').innerText = `${siteName}: ${flowCFS} cfs, ${gaugeFt} ft`;
    } else {
      document.getElementById('usgs-data').innerText = "River data not available.";
    }
  })
  .catch(error => {
    console.error("USGS data fetch error:", error);
    document.getElementById('usgs-data').innerText = "Error loading river data.";
  });

// Fetch NOAA weather data (using National Weather Service API for forecast)
const lat = 42.003;    // Latitude for Upper Delaware area (e.g., Hale Eddy NY)
const lon = -75.383;   // Longitude for Upper Delaware area
fetch(`https://api.weather.gov/points/${lat},${lon}`)
  .then(response => response.json())
  .then(pointsData => {
    const forecastUrl = pointsData.properties?.forecast;
    if (forecastUrl) {
      return fetch(forecastUrl);
    } else {
      throw new Error("Forecast URL not available");
    }
  })
  .then(response => response.json())
  .then(forecastData => {
    const periods = forecastData.properties?.periods;
    if (periods && periods.length > 0) {
      // Use the first period (current or next upcoming forecast period)
      const currentPeriod = periods[0];
      document.getElementById('weather-data').innerText = 
        `${currentPeriod.name}: ${currentPeriod.shortForecast}, Temp: ${currentPeriod.temperature}°${currentPeriod.temperatureUnit}`;
    } else {
      document.getElementById('weather-data').innerText = "Weather data not available.";
    }
  })
  .catch(error => {
    console.error("Weather data fetch error:", error);
    document.getElementById('weather-data').innerText = "Error loading weather data.";
  });

// Fly pattern suggestion logic (keeps previous logic functional or similar)
const flyPatterns = [
  "Blue-Winged Olive",
  "March Brown",
  "Hendrickson",
  "Sulphur Dun",
  "Caddis Larva",
  "Stonefly Nymph",
  "Adams Dry Fly",
  "Woolly Bugger"
];
// Example logic: pick a random pattern to suggest
const randomPattern = flyPatterns[Math.floor(Math.random() * flyPatterns.length)];
document.getElementById('fly-info').innerText = `Try a ${randomPattern} pattern today!`;
