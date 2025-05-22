const apiKey = "34d2dfe2f79dca9ffc7bd7206070012c"; // From openweathermap.org
const city = "Kota Bharu";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const condition = data.weather[0].description;

    // Display info
    document.getElementById("weatherInfo").innerHTML = `
      <strong>Temperature:</strong> ${temp} °C<br>
      <strong>Humidity:</strong> ${humidity}%<br>
      <strong>Condition:</strong> ${condition}
    `;

    // Chart
    new Chart(document.getElementById("weatherChart"), {
      type: "bar",
      data: {
        labels: ["Temperature (°C)", "Humidity (%)"],
        datasets: [{
          label: "Weather Data",
          data: [temp, humidity],
          backgroundColor: ["#60A5FA", "#34D399"]
        }]
      }
    });
  })
  .catch(error => {
    console.error("Failed to fetch weather data:", error);
    document.getElementById("weatherInfo").textContent = "Unable to load weather data.";
  });
