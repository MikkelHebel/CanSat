fetch('/data/get')
  .then(response => response.json())
  .then(data => console.log(data));

const selectedChart = document.getElementById('selectedChart');
selectedChart.addEventListener('change', choosenChart);
function choosenChart(){
  console.log(selectedChart.value);
  const label = selectedChart.options[selectedChart.selectedIndex].text;
  //myChart.data.datasets[0].data = selectedChart.value;
  myChart.data.datasets[0].label = label;
  updateChart();
}

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
    const temperature = datapoints.results.map(function(index){
      return index.temperature;
    })
    const humidity = datapoints.results.map(function(index){
      return index.humidity;
    })
    const pressure = datapoints.results.map(function(index){
      return index.pressure;
    })
    const altitude = datapoints.results.map(function(index){
      return index.altitude;
    })

    myChart.config.data.labels = minute;
    myChart.config.data.datasets[0].data = selectedChart.value;
    console.log("Selected chart value:")
    console.log(selectedChart.value)
    myChart.update();
  });
}

const labels = [
  '00:05',
  '00:10',
  '00:15',
  '00:20',
  '00:25',
  '00:30',
];

const data = {
  datasets: [{
    label: 'Temperature',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

const config = {
  type: 'line',
  data: data,
};

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);
