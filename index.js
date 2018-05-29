let app = _ => {
  /* PRIVATE VARIABLES */
  let _ctx = document.getElementById('chart').getContext('2d');
  let _chartConfig = {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
      datasets: [{
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };
  let _chart = new Chart(_ctx, _chartConfig);

  let _votingList = document.getElementById('voting-list');
  let _hasVoted = false;

  /* PRIVATE FUNCTIONS */
  let _fetchData = _ => VotingService().getAllVotes()
    .then(votes => {
      _chart.data.datasets[0].data = votes;
      _chart.update();
    });

  let _subscribe = _ => setInterval(_fetchData, 12000);

  let _onVoteSubmit = event => {
    if (event.target.tagName !== 'BUTTON' || _hasVoted) return;

    let id = event.target.id;
    let votes = _chart.data.datasets[0].data;
    votes[id] += 1;

    VotingService().submitVote(id)
      .then(_ => {
        _chart.update();
        _hasVoted = true;
      });
  };

  return {
    /* PUBLIC FUNCTIONS */
    init: _ => {
      _fetchData();
      _subscribe();
      _votingList.addEventListener('click', _onVoteSubmit);
    }
  }
};

(_ => app().init())();