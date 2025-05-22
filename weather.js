const apiKey = "34d2dfe2f79dca9ffc7bd7206070012c"; // Your OpenWeatherMap API Key
const city = "Kota Bharu";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const temperature = data.main.temp;
    const condition = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Display weather info as text
    document.getElementById("weatherInfo").innerHTML = `
      <p>Current Temperature: <strong>${temperature}°C</strong></p>
      <p>Condition: <strong>${condition}</strong></p>
      <p>Humidity: <strong>${humidity}%</strong></p>
      <p>Wind Speed: <strong>${windSpeed} m/s</strong></p>
    `;

    // Show temperature chart
    new Chart(document.getElementById("weatherChart"), {
      type: "bar",
      data: {
        labels: ["Temperature (°C)"],
        datasets: [{
          label: "Current Temperature",
          data: [temperature],
          backgroundColor: "skyblue",
          borderColor: "blue",
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 50
          }
        }
      }
    });
  })
  .catch(error => {
    console.error("Failed to fetch weather data:", error);
    document.getElementById("weatherInfo").innerHTML = "<p class='text-red-500'>Failed to load weather data.</p>";
  });
