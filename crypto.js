const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd";

fetch(url)
  .then(response => response.json())
  .then(data => {
    const btc = data.bitcoin.usd;
    const eth = data.ethereum.usd;
    const sol = data.solana.usd;

    // Display prices as text
    document.getElementById("cryptoData").innerHTML = `
      <p>Bitcoin (BTC): <strong>$${btc}</strong></p>
      <p>Ethereum (ETH): <strong>$${eth}</strong></p>
      <p>Solana (SOL): <strong>$${sol}</strong></p>
    `;

    // Display chart
    const chart = new Chart(document.getElementById("cryptoChart"), {
      type: "bar",
      data: {
        labels: ["BTC", "ETH", "SOL"],
        datasets: [{
          label: "Current Price (USD)",
          data: [btc, eth, sol],
          backgroundColor: ["gold", "purple", "green"],
          borderColor: ["orange", "blue", "darkgreen"],
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
    console.error("Failed to fetch crypto data:", error);
    document.getElementById("cryptoData").innerHTML = "<p class='text-red-500'>Failed to load crypto data.</p>";
  });
