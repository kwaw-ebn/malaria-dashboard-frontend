// Backend URL
const API_URL = "https://backend-3x5i.onrender.com";

// Feature mapping
const features = [
  'rainfall_lag1', 'rainfall_lag2', 'rainfall_lag3',
  'temp_lag1', 'humidity_lag1',
  'rainfall_avg_3', 'temp_avg_3',
  'month_num', 'quarter'
];

function predict() {
  const rainfall = parseFloat(document.getElementById("rainfall").value);
  const temperature = parseFloat(document.getElementById("temperature").value);
  const humidity = parseFloat(document.getElementById("humidity").value);

  // Simple example feature values
  const data = {
    rainfall_lag1: rainfall,
    rainfall_lag2: rainfall * 0.9,
    rainfall_lag3: rainfall * 0.85,
    temp_lag1: temperature,
    humidity_lag1: humidity,
    rainfall_avg_3: (rainfall + rainfall*0.9 + rainfall*0.85)/3,
    temp_avg_3: temperature,
    month_num: new Date().getMonth() + 1,
    quarter: Math.floor((new Date().getMonth() + 3) / 3)
  };

  fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      document.getElementById("prediction").innerText = res.prediction;
      document.getElementById("risk").innerText = res.risk;
      updateChart(res.prediction);
    })
    .catch(err => {
      console.error("Failed to get prediction from backend.", err);
      document.getElementById("prediction").innerText = "--";
      document.getElementById("risk").innerText = "Failed to get prediction";
    });
}

// Example chart
let chartInstance;
function updateChart(value) {
  const ctx = document.getElementById('chart').getContext('2d');
  const labels = ['Week 1','Week 2','Week 3','Week 4','Week 5','Week 6'];
  const data = [value*0.6,value*0.7,value*0.8,value*0.9,value,value*1.1];

  if(chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: [{ label: 'Predicted Cases', data, borderColor: 'rgb(34,197,94)', backgroundColor: 'rgba(34,197,94,0.2)', tension: 0.4 }] },
    options: { responsive: true, maintainAspectRatio: false }
  });
}
