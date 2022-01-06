fetch('/data/get')
  .then(response => response.json())
  .then(data => console.log(data));

async function fetchData() {
  const url = 'https://shielded-bayou-08572.herokuapp.com/data/get';
  const response = await fetch(url);
  // Wait until the request has been completed
  const datapoints = await response.json();
  console.log(datapoints);
};

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
    label: 'Temperature chart!',
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

const actions = [
  {
    name: 'Reset zoom',
    handler(chart) {
      chart.resetZoom('zoom');
    }
  }
];

module.exports = {
  actions,
  config,
  output: 'console.log output'
};

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);
