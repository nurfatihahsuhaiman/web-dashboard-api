const apiKey = "34d2dfe2f79dca9ffc7bd7206070012c"; // API Key dari OpenWeatherMap
const city = "Kota Bharu";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const suhu = data.main.temp;
    const keadaan = data.weather[0].description;
    const kelembapan = data.main.humidity;
    const angin = data.wind.speed;

    // Papar maklumat cuaca secara teks
    document.getElementById("infoCuaca").innerHTML = `
      <p>Suhu sekarang: <strong>${suhu}°C</strong></p>
      <p>Keadaan: <strong>${keadaan}</strong></p>
      <p>Kelembapan: <strong>${kelembapan}%</strong></p>
      <p>Kelajuan Angin: <strong>${angin} m/s</strong></p>
    `;

    // Papar carta suhu
    const chart = new Chart(document.getElementById("weatherChart"), {
      type: "bar",
      data: {
        labels: ["Suhu (°C)"],
        datasets: [{
          label: "Suhu Semasa",
          data: [suhu],
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
    console.error("Gagal ambil data:", error);
    document.getElementById("infoCuaca").innerHTML = "<p class='text-red-500'>Gagal ambil data cuaca.</p>";
  });
