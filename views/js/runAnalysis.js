const houseSearchUrl = "https://countyhunter.herokuapp.com/house/getArrays"
// initial the data fetch, analysis and display

// fetch data from database

// add script to page

// house search event
let houseSearch = document.getElementById("house-search");
houseSearch.addEventListener("submit", (ev) => {
  ev.preventDefault();
  let formData = new FormData(houseSearch);
  const data = new URLSearchParams(formData);
  let response = await fetch(houseSearchUrl , {
      method: "GET",
      body: data,
  }); 
  let json = await response.json();
  console.log(json);

});

// don't need this fucntion
function addDataVisulization() {
  let myDataVisualiztion = document.getElementById("my_dataviz");
  let scriptElement = document.createElement("script");
  scriptElement.setAttribute("src", "/js/dataAnalysis.js");
  myDataVisualiztion.appendChild(scriptElement);
}
