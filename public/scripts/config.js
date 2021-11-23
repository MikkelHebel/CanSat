//fetch('/data/get')
//  .then(response => response.json())
//  .then(data => console.log(data));

function startFetch('/data/get') {
  const {min, max} = tempChart.scales.x;
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log('Fetched data between ' + min + ' and ' + max);
    tempChart.data.datasets[0].data = fetchData(min, max);
    tempChart.stop(); // make sure animations are not running
    tempChart.update('none');
  }, 500);
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
    label: 'Temperature',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [],
  }]
};

const config = {
  type: 'line',
  data: {
    datasets: [{
      label: 'Temperature',
      borderColor: randomColor(0.4),
      backgroundColor: randomColor(0.1),
      pointBorderColor: randomColor(0.7),
      pointBackgroundColor: randomColor(0.5),
      pointBorderWidth: 1,
      data: fetchData(start, end),
    }]
  },
  options: {
    scales: scales,
    plugins: {
      zoom: zoomOptions,
      title: {
        display: true,
        position: 'bottom',
        text: (ctx) => zoomStatus(ctx.chart)
      }
    },
    transitions: {
      zoom: {
        animation: {
          duration: 100
        }
      }
    }
  }
};

const tempChart = new Chart(
  document.getElementById('myChart'),
  config
);

const zoomOptions = {
  limits: {
    x: {min: 'original', max: 'original', minRange: 60 * 1000},
  },
  pan: {
    enabled: true,
    mode: 'x',
    modifierKey: 'ctrl',
    onPanComplete: startFetch
  },
  zoom: {
    wheel: {
      enabled: true,
    },
    drag: {
      enabled: true,
    },
    pinch: {
      enabled: true
    },
    mode: 'x',
    onZoomComplete: startFetch
  }
};
