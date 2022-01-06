fetch('/data/get')
  .then(response => response.json())
  .then(data => console.log(data));

let timer;
function startFetch({chart}) {
  console.log("startFetch has been called!");
  const {min, max} = chart.scales.x;
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log('Fetched data between ' + min + ' and ' + max);
    chart.data.datasets[0].data = fetchData(min, max);
    chart.stop(); // make sure animations are not running
    chart.update('none');
  }, 500);
}

const start = new Date().valueOf();
const end = start + 1000 * 60 * 60 * 24 * 2;
const allData = [];
let y = 100;
for (let x = start; x <= end; x += 1000) {
  y += 5 - Math.random() * 10;
  allData.push({x, y});
}

function fetchData(x1, x2) {
  console.log("fetchData has been called!");
  const step = Math.max(1, Math.round((x2 - x1) / 100000));
  const data = fetch('/data/get').then(response => response.json()).then(data => console.log(data));
  console.log("Printed data:");
  console.log(data);
  //const data = [];
  let i = 0;
  while (i < allData.length && allData[i].x < x1) {
    i++;
  }
  while (i < allData.length && allData[i].x <= x2) {
    data.push(allData[i]);
    i += step;
  }
  return data;
  console.log("Returned data:");
  console.log(data);
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
  labels: labels,
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
  data: fetchData(start, end),
};

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);
