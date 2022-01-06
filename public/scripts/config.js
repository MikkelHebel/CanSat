const config = {
  type: 'line',
  data: data,
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
  labels: labels,
  datasets: [{
    label: 'Temperature chart!',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

const chart = new Chart(
  document.getElementById('chart'),
  config
);
