const chartCanvas = document.getElementById("weatherChart");
const citySelect = document.getElementById("citySelect");
const weatherDataDiv = document.getElementById("weatherData");

const apiKey = "34d2dfe2f79dca9ffc7bd7206070012c"; // <-- Ganti dengan API key sebenar
let chart;

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;
      const weather = data.weather[0].description;

      // Display text
      weatherDataDiv.innerHTML = `
        <p><strong>${city}</strong></p>
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${wind} m/s</p>
        <p>Weather: ${weather}</p>
      `;

      // Destroy previous chart
      if (chart) {
        chart.destroy();
      }

      // Create chart
      chart = new Chart(chartCanvas, {
        type: "bar",
        data: {
          labels: ["Temp (°C)", "Humidity (%)", "Wind (m/s)"],
          datasets: [{
            label: `${city} Weather Data`,
            data: [temp, humidity, wind],
            backgroundColor: ["skyblue", "lightgreen", "orange"],
            borderColor: ["blue", "green", "darkorange"],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    })
    .catch(error => {
      console.error("Failed to fetch weather:", error);
      weatherDataDiv.innerHTML = "<p class='text-red-500'>Failed to fetch weather data.</p>";
    });
}

// Initial fetch
fetchWeather(citySelect.value);

// On city change
citySelect.addEventListener("change", () => {
  fetchWeather(citySelect.value);
});
