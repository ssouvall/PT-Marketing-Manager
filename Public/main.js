// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
  var data = google.visualization.arrayToDataTable([
  ['Referral Source', '#', { role: "style" }, { role: 'annotation' }],
  ['Eric Heiden', 5, 'red', 5],
  ['Chris Gay', 3, 'blue', 3],
  ['BNI', 2, 'yellow', 2],
  ['Mark Peterson', 2, 'orange', 2],
  ['Dustin Hedstrom', 1, 'purple', 1]
]);

  // Optional; add a title and set the width and height of the chart
  var options = {
      'title':'Referrals',  
      animation: {
        duration: 1000,
        easing: 'out',
        startup: true
        }
    };


  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.BarChart(document.getElementById('barchart_values'));
  chart.draw(data, options);
}

$(window).resize(function(){
    drawChart();
  });