// Generate 100 random points within an svg canvas
const data = d3.range(100).map(() => [Math.random() * 500, Math.random() * 500]);

// Create a scatter plot using the data
d3.select("#scatter-plot")
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => d[0])
  .attr("cy", d => d[1])
  .attr("r", 5)
  .attr("fill", "blue");

// Load the CSV file
d3.csv("titanic.csv").then(function(data) {
  const ageData = d3.rollup(data, v => v.length, d => d.Age);
  const pieData = Array.from(ageData, ([age, count]) => ({ age, count }));

  // Generate the pie chart
  const pie = d3.pie().value(d => d.count);

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(200);

  const pieSvg = d3.select("#pie-chart")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

  const g = pieSvg.append("g")
    .attr("transform", "translate(250,250)");

  g.selectAll("path")
    .data(pie(pieData))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d,i) => d3.schemeCategory10[i]);
});
