fetch('/data/get')
  .then(response => response.json())
  .then(data => console.log(data));


const labels = [
  '00:05',
  '00:10',
  '00:15',
  '00:20',
  '00:25',
  '00:30',
];

const data = {
  labels: labels,
  datasets: [{
    label: 'Temperature',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [],
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {}
};


const tempChart = new Chart(
  document.getElementById('myChart'),
  config
);
