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
    const client = await pool.connect();

    client
        // Send query to database
        .query("SELECT * FROM temperature")

        // Handle results
        .then((result) => {
            const results = { data: result ? result.rows : null };
            res.send(results);
        })
    //data: [0, 10, 5, 2, 20, 30, 45],
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {}
};

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);
