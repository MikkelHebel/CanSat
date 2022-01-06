fetch('/data/get')
  .then(response => response.json())
  .then(data => console.log(data));

function updateChart() {
  async function fetchData() {
    const url = 'https://shielded-bayou-08572.herokuapp.com/data/get';
    const response = await fetch(url);
    // Wait until the request has been completed
    const datapoints = await response.json();
    console.log(datapoints);
    return datapoints;
  };

  fetchData().then(datapoints => {
    const minute = datapoints.results.map(function(index){
      return index.time;
    })
    const humidity = datapoints.results.map(function(index){
      return index.humidity;
    })

    humidityChart.config.data.humidityLabels = minute;
    humidityChart.config.data.datasets[0].data = humidity;
    humidityChart.update();
  });
}

const humidityLabels = [
  '00:05',
  '00:10',
  '00:15',
  '00:20',
  '00:25',
  '00:30',
];

const humidityData = {
  datasets: [{
    label: 'Humidity',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

const config = {
  type: 'line',
  data: humidityData,
};

const humidityChart = new Chart(
  document.getElementById('humidityChart'),
  config
);
