// initial the data fetch, analysis and display

// fetch data from database

// add script to page

function addDataVisulization() {
  let myDataVisualiztion = document.getElementById("my_dataviz");
  let scriptElement = document.createElement("script");
  scriptElement.setAttribute("src", "/js/dataAnalysis.js");
  myDataVisualiztion.appendChild(scriptElement);
}

addDataVisulization();
