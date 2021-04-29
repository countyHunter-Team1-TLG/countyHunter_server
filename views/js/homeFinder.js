document.getElementById("home-search").addEventListener("submit", searchHomes);

//handle search button click
function searchHomes(e) {
  e.preventDefault();

  const formAddress = e.target.address;
  const formCity = e.target.city;
  const formState = e.target.state;

  const URL = `${formAddress}  ${formCity} ${formState}`;

  fetch(URL)
    .then((res) => res.json())
    .then((json) => displayFoundHomes(json));
}

//handle displaying of found homes
function displayFoundHomes(data) {
  document.getElementById("address").innerHTML = data[0].address;
  document.getElementById("city").innerHTML = data[0].city;
  document.getElementById("houseimg").setAttribute("src", data[0].img_url);
  document.getElementById("homeinfo").innerHTML = data[0].description;

  //rest of the homes
  const addTo = document.getElementById("hlink-list");
  //create links to display homes on the side bar
  for (let i = 1; i < data.length; i++) {
    let houselistItem = document.createElement("li");
    let a = document.createElement("a");
    a.innerHTML = data.address + ";" + data.city;
    a.setAttribute("onclick", () => {
      //onclick change the main display
      document.getElementById("address").innerHTML = data[i].address;
      document.getElementById("city").innerHTML = data[i].city;
      document.getElementById("houseimg").setAttribute("src", data[i].img_url);
      document.getElementById("homeinfo").innerHTML = data[i].description;
    });

    houselistItem.appendChild(a);

    addTo.appendChild(joblistItem);
  }
}
function displayFoundJobs(data) {
  const addTo = document.getElementById("job-card-container");
  //create cards
  let jobCard = document.createElement("div");
  data.foreach((element) => {
    //job title
    let jobTile = document.createElement("h2");
    jobTile.innerHTML = element.title;
    //company name
    let companyName = document.createElement("h3");
    companyName.innerHTML = element.company;
    //job description
    let jobDescription = document.createElement("p");
    jobDescription.innerHTML = element.description;
    //url to apply to job
    let urlLink = element.url;
    let toJob = `window.location.href='${urlLink}';`;
    //button to go to job post
    let apply = document.createElement("button");
    apply.setAttribute("onclick", toJob);
    apply.innerHTML = "apply";

    //append to card
    jobCard.appendChild(jobTile);
    jobCard.appendChild(companyName);
    jobCard.appendChild(jobDescription);
    jobCard.appendChild(apply);

    //append card to html page
    addTo.appendChild(jobCard);
  });
}
