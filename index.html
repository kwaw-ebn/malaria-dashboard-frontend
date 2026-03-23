// Backend Render URL
const BASE_URL = "https://backend-3x5i.onrender.com/";

// Predict function
async function predict() {
    const rainfall = document.getElementById("rainfall").value;
    const temperature = document.getElementById("temperature").value;
    const humidity = document.getElementById("humidity").value;

    const data = {
        rainfall_lag1: Number(rainfall),
        rainfall_lag2: Number(rainfall),
        rainfall_lag3: Number(rainfall),
        temp_lag1: Number(temperature),
        humidity_lag1: Number(humidity),
        rainfall_avg_3: Number(rainfall),
        temp_avg_3: Number(temperature),
        month_num: new Date().getMonth() + 1,
        quarter: Math.floor((new Date().getMonth() + 3)/3)
    };

    try {
        const response = await fetch(`${BASE_URL}predict`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        document.getElementById("prediction").innerText = result.prediction;
        document.getElementById("risk").innerText = result.risk;

        updateChart(result.prediction);
        updateMap(result.risk);

    } catch (err) {
        console.error(err);
        alert("Error fetching prediction from backend");
    }
}

// Sample chart function
let chart;
function updateChart(prediction) {
    const ctx = document.getElementById('chart').getContext('2d');
    const labels = Array.from({length:7}, (_, i) => `Day ${i+1}`);
    const data = labels.map(() => Math.floor(Math.random() * 600));

    if(chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Predicted Cases',
                data: data,
                borderColor: 'rgb(59,130,246)',
                backgroundColor: 'rgba(59,130,246,0.2)',
                tension: 0.3
            }]
        },
        options: { responsive: true }
    });
}

// Sample map function
function updateMap(risk) {
    const mapDiv = document.getElementById('map');
    mapDiv.innerHTML = "";
    const trace = {
        type: "choropleth",
        locationmode: "geojson-id",
        locations: ["NG-AB","NG-LA","NG-KD"], // sample states
        z: [Math.random()*500, Math.random()*500, Math.random()*500],
        text: ["Abuja","Lagos","Kaduna"],
        colorscale: [[0,"green"],[0.5,"yellow"],[1,"red"]],
        colorbar: { title: "Risk Level" }
    };
    const layout = {
        geo: {
            scope: "africa",
            projection: { type: "mercator" }
        }
    };
    Plotly.newPlot('map', [trace], layout, {responsive:true});
}
