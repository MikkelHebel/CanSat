//fetch('/data/get')
//  .then(response => response.json())
//  .then(data => console.log(data));

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
  const data = fetch('/data/get');
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

const scales = {
  x: {
    position: 'bottom',
    min: start,
    max: end,
    type: 'time',
    ticks: {
      autoSkip: true,
      autoSkipPadding: 50,
      maxRotation: 0
    },
    time: {
      displayFormats: {
        hour: 'HH:mm',
        minute: 'HH:mm',
        second: 'HH:mm:ss'
      }
    }
  },
  y: {
    type: 'linear',
    position: 'left',
  },
};

/*const config = {
  type: 'line',
  data: {
    datasets: [{
      label: 'Temperature',
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: 'randomColor(0.7)',
      pointBackgroundColor: 'Utils.randomColor(0.5)',
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
};*/

/* const labels = [
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
};*/

const config = {
  type: 'line',
  data: fetchData(start, end),
  options: {}
};

const tempChart = new Chart(
  document.getElementById('myChart'),
  config
);
