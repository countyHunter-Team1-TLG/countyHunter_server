const houseSearchUrl = "https://countyhunter.herokuapp.com/house/getArrays";
// initial the data fetch, analysis and display

// fetch data from database

// add script to page

// house search event
let houseSearch = document.getElementById("house-search");
document
  .getElementById("houseSearch_btn")
  .addEventListener("click", async (ev) => {
    ev.preventDefault();
    let formData = new FormData(houseSearch);
    const data = new URLSearchParams(formData);
    console.log(`house data before sent: ${data}`);
    let response = await fetch(houseSearchUrl, {
      method: "POST",
      body: data,
    });
    let json = await response.json();
    console.log(json);

    // refresh and display
    document.getElementById("my_dataviz").innerHTML = "";
    displayData(json);
  });

// don't need this fucntion
function addDataVisulization() {
  let myDataVisualiztion = document.getElementById("my_dataviz");
  let scriptElement = document.createElement("script");
  scriptElement.setAttribute("src", "/js/dataAnalysis.js");
  myDataVisualiztion.appendChild(scriptElement);
}

function displayData(data) {
  // set the dimensions and margins of the graph
  let dataDisplayMargin = { top: 10, right: 100, bottom: 30, left: 30 },
    width = 960 - dataDisplayMargin.left - dataDisplayMargin.right,
    height = 500 - dataDisplayMargin.top - dataDisplayMargin.bottom;

  // append the svg object to the body of the page
  let svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width + dataDisplayMargin.left + dataDisplayMargin.right)
    .attr("height", height + dataDisplayMargin.top + dataDisplayMargin.bottom)
    .append("g")
    .attr(
      "transform",
      "translate(" + dataDisplayMargin.left + "," + dataDisplayMargin.top + ")"
    );

  //Read the data
  // this need to be pulled from Mongodb
  let dataDB = data;
  if (typeof dataDB != Array) {
    console.log("display data: dataDB not array");
  }

  // List of groups (here I have one group per column)
  let allGroup = [
    "For Sale Inventory",
    "Median Price Cut",
    "Sales Cut",
    "Median Days Pending",
  ];
  let xFormat = "%Y-%m-%d";
  let min_normal = 0;
  let max_normal = 0;
  let dataNomalized = dataDB.map(function (grpName) {
    return {
      name: grpName.name,
      values: grpName.values.map(function (d) {
        return +d.value;
      }),
    };
  });
  // // Reformat the data: we need an array of arrays of {x, y} tuples
  let dataReady = dataDB.map(function (grpName) {
    // .map allows to do something for each element of the list
    let index = dataDB.indexOf(grpName);
    let maxValue = d3.max(dataNomalized[index].values);
    let minValue = d3.min(dataNomalized[index].values);
    console.log(`max-${maxValue}, min-${minValue}`);
    return {
      name: grpName.name,
      values: grpName.values.map(function (d) {
        return {
          time: d3.timeParse(xFormat)(d.time),
          value: (+d.value - minValue) / +maxValue,
        };
      }),
    };
  });
  // check data difficiency
  console.log(dataReady);

  // A color scale: one color for each group
  let myColor = d3.scaleOrdinal().domain(allGroup).range(d3.schemeSet2);

  // Add X axis --> it is a date format
  let x = d3
    .scaleTime()
    .domain([new Date(2018, 10, 1), new Date(2021, 4, 1)])
    .rangeRound([0, width]);
  // Add Y axis
  let y = d3.scaleLinear().domain([0, 1]).range([height, 0]);

  // Add the lines
  var line = d3
    .line()
    .x(function (d) {
      return x(d.time);
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
      return 40 + i * 100;
    })
    .attr("y", 30)
    .text(function (d) {
      return getLegandName(d.name);
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

  var g = svg
    .append("g")
    .attr(
      "transform",
      "translate(" + dataDisplayMargin.left + "," + dataDisplayMargin.top + ")"
    );

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat(xFormat)));

  g.append("g").call(d3.axisLeft(y));
}

/**
 *
 * @param {db_collection} legend in collection name
 * @returns full description of the data set
 */
function getLegandName(legend) {
  let name;
  switch (legend) {
    case "FSI":
      name = "For Sale Inventory";
      break;
    case "MDDP":
      name = "Median Days Pending";
      break;
    case "MLP":
      name = "Median List Price";
      break;
    case "MSP":
      name = "Median Sale Price";
      break;
    case "SC":
      name = "Sales Count";
      break;
    case "MPC":
      name = "Median Price Cut";
      break;
    default:
      break;
  }
  return name;
}
