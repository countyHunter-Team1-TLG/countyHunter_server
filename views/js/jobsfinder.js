document.getElementById("job-search").addEventListener("submit", searchJobs);
//document.getElementById("favs").addEventListener("click", addToFavorites);

let jobsArray;

// function addToFavorites() {
//   let preference = document.getElementById("company-title-00").innerHTML;
//   const URLPOST = `https://countyhunter.herokuapp.com/user/update-preferences`;
//   let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTk3MjYxMjYsIm5hbWUiOiJXQU5HIiwiZW1haWwiOiJhbm90aGVyd2FuZy54YW5kZXJAZ21haWwuY29tIiwiam9iUHJlZmVyZW5jZXMiOjEsImhvdXNlUHJlZmVyYW5jZXMiOjEsImlhdCI6MTYxOTcyMjUyNn0.0dBzPCoICNKS45yc9jX4oa6PB8Q9nnZGYau0t-L1qWQ`;
//   return fetch(URLPOST, {
//     method: "POST",
//     body: { jobPreferences: preference },
//     headers: {
//       Authorization: `auth_token ${token}`,
//     },
//   })
//     .then((response) => response.json())
//     .then((response) => console.log(response));
// }

//handle search button click
async function searchJobs(e) {
  e.preventDefault();

  const searchJob = e.target.inputTechnology.value;
  const cityTarget = e.target.inputCity.value;
  const stTarget = e.target.inputState.value;
  const zipTarget = e.target.inputZip.value;

  //   const URLOLD = `https://jobs.github.com/positions?description=${searchJob}&location=${jobLocation}`;

  // const URL = `https://countyhunter.herokuapp.com/jobs/getJobs?description=${searchJob}&location=${jobLocation}`;

  console.log(searchJob);
  console.log(cityTarget);
  console.log(stTarget);
  console.log(zipTarget);

  if (searchJob != 0) {
    jobsArray = await getJobs(searchJob, cityTarget);
    console.log(jobsArray);
    displayFoundJobs(jobsArray);
  } else {
    return window.alert(
      "No job results with the given technology at the specified location. Try another city"
    );
  }
  // if () {

  // }
}

async function getJobs(searchJob, jobLocation) {
  // const API = `https://countyhunter.herokuapp.com/jobs/getJobs?description=${searchJob}&location=${jobLocation}`;
  const API = `https://github-jobs-cris.herokuapp.com/jobs?tech=${searchJob}&location=${jobLocation}`;

  try {
    const response = await fetch(API);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
}

//handle displaying of found jobs
function displayFoundJobs(data) {
  const container = document.querySelector("#card_container");
  container.innerHTML = "";

  for (let index = 0; index < data.length; index++) {
    let createdCard = jobCard(data[index], index);
    container.appendChild(createdCard);
  }
}

function jobCard(jsonObject, arrayIndex) {
  let cardDiv = document.createElement("div");
  cardDiv.setAttribute("class", "card d-flex align-items-center");
  const { company, company_logo, title, description, location } = jsonObject;

  let shortDesc = subStringDescShort(description, description.length);
  cardDiv.setAttribute("id", arrayIndex);
  cardDiv.innerHTML = `
      <img id="company_logo" src="${company_logo}"
          class="card-img-top ms-2 mt-4 card_photo">
      <div class="card-body">
        <h3 id="job_title" class="card-title pt-2">${title}</h3>
        <h4 class="text-muted pt-4 pb-4" id="company_name"> at ${company}</h4> 
        <h5 id="location">Location:${location}</h5>
        <p  id="company_description" class="card-text">${shortDesc}</p>
        <div class="card-body">
          <a href="/views/job-details" class="card-link btn col-12 details">Details</a>
        </div>
      </div>
    </div>`;

  cardDiv.querySelector(".details").addEventListener("click", detailsSend);
  return cardDiv;
}

function detailsSend(event) {
  let card = event.target.parentElement.parentElement.parentElement;
  console.log(jobsArray[card.id], "logging object at index card.id");
  localStorage.setItem("jobObject", JSON.stringify(jobsArray[card.id]));
}

function subStringDescShort(descString, descStringLength) {
  let firstPIndex = descString.indexOf("<p>");
  let lastPIndex = descString.indexOf("</p>") + 3;

  let firstPString = descString.substring(firstPIndex, lastPIndex);
  if (descString.length === descStringLength) {
    descString = descString.substring(lastPIndex + 1);
    let secondPString = subStringDescShort(descString, descStringLength);
    let shortDesc = firstPString + secondPString;
    return shortDesc;
  }
  return firstPString;
}
