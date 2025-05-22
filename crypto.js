const chartCanvas = document.getElementById("cryptoChart");
const coinSelect = document.getElementById("coinSelect");
const cryptoDataDiv = document.getElementById("cryptoData");

let chart; // Global chart variable

function fetchAndDisplayCrypto(coin) {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const price = data[coin].usd;

      // Display text data
      cryptoDataDiv.innerHTML = `
        <p><strong>${coin.toUpperCase()}</strong>: $${price}</p>
      `;

      // If chart exists, destroy it first
      if (chart) {
        chart.destroy();
      }

      // Create new chart
      chart = new Chart(chartCanvas, {
        type: "bar",
        data: {
          labels: [coin.toUpperCase()],
          datasets: [{
            label: "Current Price (USD)",
            data: [price],
            backgroundColor: "skyblue",
            borderColor: "blue",
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
    })
    .catch(error => {
      console.error("Failed to fetch data:", error);
      cryptoDataDiv.innerHTML = "<p class='text-red-500'>Failed to fetch data.</p>";
    });
}

// Initial load
fetchAndDisplayCrypto(coinSelect.value);

// Change coin on selection
coinSelect.addEventListener("change", () => {
  fetchAndDisplayCrypto(coinSelect.value);
});
