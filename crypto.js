const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd";

fetch(url)
  .then(response => response.json())
  .then(data => {
    const btc = data.bitcoin.usd;
    const eth = data.ethereum.usd;
    const sol = data.solana.usd;

    // Teks harga
    document.getElementById("cryptoData").innerHTML = `
      <p>Bitcoin (BTC): <strong>$${btc}</strong></p>
      <p>Ethereum (ETH): <strong>$${eth}</strong></p>
      <p>Solana (SOL): <strong>$${sol}</strong></p>
    `;

    // Carta
    const chart = new Chart(document.getElementById("cryptoChart"), {
      type: "bar",
      data: {
        labels: ["BTC", "ETH", "SOL"],
        datasets: [{
          label: "Harga Semasa (USD)",
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
    console.error("Gagal ambil data crypto:", error);
    document.getElementById("cryptoData").innerHTML = "<p class='text-red-500'>Gagal ambil data crypto.</p>";
  });
