const apiKey = "34d2dfe2f79dca9ffc7bd7206070012c"; // dari openweathermap.org
const city = "Kota Bharu";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const temp = data.main.temp;
    const chart = new Chart(document.getElementById("weatherChart"), {
      type: "bar",
      data: {
        labels: ["Suhu (°C)"],
        datasets: [{
          label: "Cuaca",
          data: [temp],
          backgroundColor: "skyblue"
        }]
      }
    });
  })
  .catch(error => console.error("Gagal ambil data:", error));
