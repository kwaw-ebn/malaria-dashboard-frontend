const backendUrl = "https://backend-3x5i.onrender.com";

// Predict function
async function predict() {
  const data = {
    rainfall_lag1: Number(document.getElementById("rainfall").value),
    temp_lag1: Number(document.getElementById("temperature").value),
    humidity_lag1: Number(document.getElementById("humidity").value),
    rainfall_lag2: 0,
    rainfall_lag3: 0,
    rainfall_avg_3: 0,
    temp_avg_3: 0,
    month_num: new Date().getMonth() + 1,
    quarter: Math.floor((new Date().getMonth() + 3)/3)
  };

  try {
    const response = await fetch(`${backendUrl}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();

    document.getElementById("prediction").innerText = result.prediction;
    document.getElementById("risk").innerText = result.risk;

    updateChart(result.prediction);

  } catch(err) {
    console.error(err);
    alert("Failed to get prediction from backend.");
  }
}

// Chart.js trend (dummy data for demo)
let chart;
function updateChart(latestPrediction) {
  const ctx = document.getElementById('chart').getContext('2d');
  const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const data = [100, 200, 150, latestPrediction];

  if(chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: [{ label: "Predicted Cases", data, borderColor: "#4F46E5", backgroundColor: "rgba(79,70,229,0.2)" }] },
    options: { responsive: true, plugins: { legend: { display: true } } }
  });
}

// Plotly Nigeria map
const nigeriaData = [
  { state: "Lagos", risk: 300 },
  { state: "Kano", risk: 600 },
  { state: "Rivers", risk: 450 },
  { state: "Kaduna", risk: 200 },
  { state: "Oyo", risk: 150 },
];

const mapData = [{
  type: 'choropleth',
  locationmode: 'country names',
  locations: nigeriaData.map(d => d.state),
  z: nigeriaData.map(d => d.risk),
  text: nigeriaData.map(d => d.state),
  colorscale: [[0, '#22c55e'], [0.5, '#eab308'], [1, '#ef4444']],
  autocolorscale: false,
  marker: { line: { color: 'white', width: 0.5 } },
  colorbar: { title: 'Malaria Cases' }
}];

const mapLayout = {
  title: 'Malaria Risk by State',
  geo: { scope: 'africa', projection: { type: 'mercator' }, showlakes: true, lakecolor: '#ffffff' },
  margin: { t: 30, b: 0, l: 0, r: 0 }
};

Plotly.newPlot('map', mapData, mapLayout, { responsive: true });