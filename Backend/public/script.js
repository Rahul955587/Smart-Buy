let chart;

async function analyze() {
  const url = document.getElementById("url").value;

  if (!url) {
    alert("Paste product link first!");
    return;
  }

//   const res = await fetch("/analyze", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ url }),
  // });
  const res = await fetch("/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  const data = await res.json();

  const box = document.getElementById("resultBox");

  if (data.error) {
    box.innerHTML = `<p>${data.error}</p>`;
    return;
  }
  document.querySelector(".analysis-container").style.display = "flex";

  // decision color
  let decisionClass = "neutral";
  if (data.decision.includes("BUY")) decisionClass = "buy";
  else if (data.decision.includes("WAIT")) decisionClass = "wait";

  // box.innerHTML = `
  //       <h3>${data.name}</h3>
  //       <p>💰 Current Price: ₹${data.current}</p>
  //       <p>📊 Average Price: ₹${data.avg.toFixed(2)}</p>
  //       <p class="${decisionClass}">🧠 Decision: ${data.decision}</p>
  //       <p>⭐ Seller: ${data.sellerStatus}</p>
  //   `;
  box.innerHTML = `
  <div class="info-card">
    <h4>💰 Current Price</h4>
    <p>₹${data.current}</p>
  </div>

  <div class="info-card">
    <h4>📊 Average Price</h4>
    <p>₹${data.avg.toFixed(2)}</p>
  </div>

  <div class="info-card">
    <h4>🧠 Decision</h4>
    <p class="${decisionClass}">${data.decision}</p>
  </div>

  <div class="info-card">
    <h4>⭐ Seller</h4>
    <p>${data.sellerStatus}</p>
  </div>
`;

  drawChart(data.history);
}

function drawChart(history) {
  const ctx = document.getElementById("chart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: history.map((_, i) => "T" + (i + 1)),
      datasets: [
        {
          label: "Price Trend",
          data: history,
          borderWidth: 3,
          tension: 0.4,
        },
      ],
    },
  });
}
const sidebar = document.getElementById("sidebar");
const trigger = document.querySelector(".sidebar-trigger");

trigger.addEventListener("mouseenter", () => {
  sidebar.classList.add("active");
});

sidebar.addEventListener("mouseenter", () => {
  sidebar.classList.add("active");
});

sidebar.addEventListener("mouseleave", () => {
  sidebar.classList.remove("active");
});

function toggleTheme() {
  document.body.classList.toggle("dark");

  const icon = document.querySelector("#themeToggle i");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
}

function toggleChat() {
  alert("AI Assistant coming soon 🚀");
}

// let chart;

// async function analyze() {
//   const url = document.getElementById("url").value;

//   const res = await fetch("http://localhost:5000/analyze", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ url }),
//   });

//   const data = await res.json();

//   if (data.error) {
//     document.getElementById("result").innerHTML = data.error;
//     return;
//   }

//   document.getElementById("result").innerHTML = `
//     <h3>${data.name}</h3>
//     <p>Current Price: ₹${data.current}</p>
//     <p>Average Price: ₹${data.avg.toFixed(2)}</p>
//     <p>Decision: ${data.decision}</p>
//     <p>Seller: ${data.sellerStatus}</p>
//   `;

//   drawChart(data.history);
// }

// function drawChart(history) {
//   const ctx = document.getElementById("chart");

//   if (chart) chart.destroy();

//   chart = new Chart(ctx, {
//     type: "line",
//     data: {
//       labels: history.map((_, i) => "T" + (i + 1)),
//       datasets: [
//         {
//           label: "Price Trend",
//           data: history,
//         },
//       ],
//     },
//   });
// }
