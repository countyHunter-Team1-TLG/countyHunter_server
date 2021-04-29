// set the dimensions and margins of the graph
var margin = { top: 10, right: 100, bottom: 30, left: 30 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read the data
let dataDB = [
  {
    name: "FSI",
    values: [
      { time: "2019-0-31", value: "10226.0" },
      { time: "2019-1-28", value: "9009.0" },
      { time: "2019-2-31", value: "9538.0" },
      { time: "2019-3-30", value: "10330.0" },
      { time: "2019-4-31", value: "12295.0" },
      { time: "2019-5-30", value: "13779.0" },
      { time: "2019-6-31", value: "14777.0" },
      { time: "2019-7-31", value: "14632.0" },
      { time: "2019-8-30", value: "14030.0" },
      { time: "2019-9-31", value: "13198.0" },
      { time: "2019-10-30", value: "11648.0" },
      { time: "2019-11-31", value: "9378.0" },
      { time: "2020-0-31", value: "7542.0" },
      { time: "2020-1-29", value: "6835.0" },
      { time: "2020-2-31", value: "7544.0" },
      { time: "2020-3-30", value: "8204.0" },
      { time: "2020-4-31", value: "9134.0" },
      { time: "2020-5-30", value: "9683.0" },
      { time: "2020-6-31", value: "10544.0" },
      { time: "2020-7-31", value: "11159.0" },
      { time: "2020-8-30", value: "11491.0" },
      { time: "2020-9-31", value: "11501.0" },
      { time: "2020-10-30", value: "10407.0" },
      { time: "2020-11-31", value: "8751.0" },
      { time: "2021-0-31", value: "7300.0" },
      { time: "2021-1-28", value: "6700.0" },
      { time: "2021-2-31", value: "7379.0" },
    ],
  },
  {
    name: "MPC",
    values: [
      { time: "2019-0-31", value: "19984.1907" },
      { time: "2019-1-28", value: "21193.9377" },
      { time: "2019-2-31", value: "22209.7552" },
      { time: "2019-3-30", value: "23620.0689" },
      { time: "2019-4-31", value: "23979.1776" },
      { time: "2019-5-30", value: "24340.4773" },
      { time: "2019-6-31", value: "23192.9245" },
      { time: "2019-7-31", value: "21892.8644" },
      { time: "2019-8-30", value: "21039.3037" },
      { time: "2019-9-31", value: "21192.0067" },
      { time: "2019-10-30", value: "20954.5468" },
      { time: "2019-11-31", value: "19860.12" },
      { time: "2020-0-31", value: "21259.4717" },
      { time: "2020-1-29", value: "24521.1786" },
      { time: "2020-2-31", value: "28123.1338" },
      { time: "2020-3-30", value: "26748.5783" },
      { time: "2020-4-31", value: "24775.0246" },
      { time: "2020-5-30", value: "23574.9783" },
      { time: "2020-6-31", value: "25183.9476" },
      { time: "2020-7-31", value: "25621.4695" },
      { time: "2020-8-30", value: "26816.1483" },
      { time: "2020-9-31", value: "26905.8355" },
      { time: "2020-10-30", value: "27557.9811" },
      { time: "2020-11-31", value: "25869.9772" },
      { time: "2021-0-31", value: "27118.905" },
      { time: "2021-1-28", value: "29168.5045" },
      { time: "2021-2-31", value: "30973.2223" },
    ],
  },
  {
    name: "SC",
    values: [
      { time: "2019-0-31", value: "3382.0" },
      { time: "2019-1-28", value: "4088.0" },
      { time: "2019-2-31", value: "4868.0" },
      { time: "2019-3-30", value: "5825.0" },
      { time: "2019-4-31", value: "6619.0" },
      { time: "2019-5-30", value: "6559.0" },
      { time: "2019-6-31", value: "6596.0" },
      { time: "2019-7-31", value: "6308.0" },
      { time: "2019-8-30", value: "5270.0" },
      { time: "2019-9-31", value: "5611.0" },
      { time: "2019-10-30", value: "4691.0" },
      { time: "2019-11-31", value: "4859.0" },
      { time: "2020-0-31", value: "3331.0" },
      { time: "2020-1-29", value: "3660.0" },
      { time: "2020-2-31", value: "4695.0" },
      { time: "2020-3-30", value: "4108.0" },
      { time: "2020-4-31", value: "4126.0" },
      { time: "2020-5-30", value: "5718.0" },
      { time: "2020-6-31", value: "6560.0" },
      { time: "2020-7-31", value: "6333.0" },
      { time: "2020-8-30", value: "6701.0" },
      { time: "2020-9-31", value: "6891.0" },
      { time: "2020-10-30", value: "5450.0" },
      { time: "2020-11-31", value: "5724.0" },
      { time: "2021-0-31", value: "3600.0" },
      { time: "2021-1-28", value: "3896.0" },
      { time: "2021-2-31", value: "4577.0" },
    ],
  },
  {
    name: "MDDP",
    values: [
      { time: "2019-0-31", value: "29" },
      { time: "2019-1-28", value: "22" },
      { time: "2019-2-31", value: "12" },
      { time: "2019-3-30", value: "8" },
      { time: "2019-4-31", value: "7" },
      { time: "2019-5-30", value: "8" },
      { time: "2019-6-31", value: "9" },
      { time: "2019-7-31", value: "11" },
      { time: "2019-8-30", value: "12" },
      { time: "2019-9-31", value: "13" },
      { time: "2019-10-30", value: "14" },
      { time: "2019-11-31", value: "16" },
      { time: "2020-0-31", value: "14" },
      { time: "2020-1-29", value: "10" },
      { time: "2020-2-31", value: "5" },
      { time: "2020-3-30", value: "5" },
      { time: "2020-4-31", value: "6" },
      { time: "2020-5-30", value: "6" },
      { time: "2020-6-31", value: "6" },
      { time: "2020-7-31", value: "6" },
      { time: "2020-8-30", value: "6" },
      { time: "2020-9-31", value: "6" },
      { time: "2020-10-30", value: "6" },
      { time: "2020-11-31", value: "7" },
    ],
  },
];
d3.csv("", function (data) {
  // List of groups (here I have one group per column)
  var allGroup = ["FSI", "MDPC", "SC", "MDDP"];

  // // Reformat the data: we need an array of arrays of {x, y} tuples
  var dataReady = dataDB.map(function (grpName) {
    // .map allows to do something for each element of the list
    return {
      name: grpName.name,
      values: grpName.values.map(function (d) {
        return { time: d3.timeParse("%Y-%m-%d")(d.time), value: +d.value };
      }),
    };
  });
  // I strongly advise to have a look to dataReady with
  console.log(dataReady);

  // A color scale: one color for each group
  var myColor = d3.scaleOrdinal().domain(allGroup).range(d3.schemeSet2);

  // Add X axis --> it is a date format
  var x = d3
    .scaleTime()
    .domain(
      d3.extent(dataDB, function (d) {
        return d.date;
      })
    )
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear().domain([0, 20]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Add the lines
  var line = d3
    .line()
    .x(function (d) {
      return x(+d.time);
    })
    .y(function (d) {
      return y(+d.value);
    });
  svg
    .selectAll("myLines")
    .data(dataReady)
    .enter()
    .append("path")
    .attr("class", function (d) {
      return d.name;
    })
    .attr("d", function (d) {
      return line(d.values);
    })
    .attr("stroke", function (d) {
      return myColor(d.name);
    })
    .style("stroke-width", 4)
    .style("fill", "none");

  // Add the points
  svg
    // First we need to enter in a group
    .selectAll("myDots")
    .data(dataReady)
    .enter()
    .append("g")
    .style("fill", function (d) {
      return myColor(d.name);
    })
    .attr("class", function (d) {
      return d.name;
    })
    // Second we need to enter in the 'values' part of this group
    .selectAll("myPoints")
    .data(function (d) {
      return d.values;
    })
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.time);
    })
    .attr("cy", function (d) {
      return y(d.value);
    })
    .attr("r", 5)
    .attr("stroke", "white");

  // Add a label at the end of each line
  svg
    .selectAll("myLabels")
    .data(dataReady)
    .enter()
    .append("g")
    .append("text")
    .attr("class", function (d) {
      return d.name;
    })
    .datum(function (d) {
      return { name: d.name, value: d.values[d.values.length - 1] };
    }) // keep only the last value of each time series
    .attr("transform", function (d) {
      return "translate(" + x(d.value.time) + "," + y(d.value.value) + ")";
    }) // Put the text at the position of the last point
    .attr("x", 12) // shift the text a bit more right
    .text(function (d) {
      return d.name;
    })
    .style("fill", function (d) {
      return myColor(d.name);
    })
    .style("font-size", 15);

  // Add a legend (interactive)
  svg
    .selectAll("myLegend")
    .data(dataReady)
    .enter()
    .append("g")
    .append("text")
    .attr("x", function (d, i) {
      return 30 + i * 60;
    })
    .attr("y", 30)
    .text(function (d) {
      return d.name;
    })
    .style("fill", function (d) {
      return myColor(d.name);
    })
    .style("font-size", 15)
    .on("click", function (d) {
      // is the element currently visible ?
      currentOpacity = d3.selectAll("." + d.name).style("opacity");
      // Change the opacity: from 0 to 1 or from 1 to 0
      d3.selectAll("." + d.name)
        .transition()
        .style("opacity", currentOpacity == 1 ? 0 : 1);
    });
});
