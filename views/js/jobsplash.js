var jobObject = JSON.parse(localStorage.getItem("jobObject"));
console.log(jobObject);
document.getElementById("job-title").innerHTML = jobObject.title;

document
  .getElementById("company-logo")
  .setAttribute("src", jobObject.company_logo);
document.getElementById("description").innerHTML = jobObject.description;

document.getElementById("job-search").addEventListener("submit", searchJobs);

//handle search button click
function searchJobs(e) {
  e.preventDefault();

  const searchJob = e.target.inputTechnology.value;
  const jobLocation = e.target.inputCity.value;

  //   const URLOLD = `https://jobs.github.com/positions?description=${searchJob}&location=${jobLocation}`;

  const URL = `https://countyhunter.herokuapp.com/jobs/getJobs?description=${searchJob}&location=${jobLocation}`;

  fetch(URL)
    .then((res) => res.json())
    .then((json) => displayFoundJobs(json));
}

//handle displaying of found jobs
function displayFoundJobs(data) {
  const addTo = document.getElementById("jlink-list");
  if (data.length === 0) {
    document.getElementById("job-title").innerHTML = "job is not found";
    document.getElementById("company").innerHTML =
      "job is not found theres is not company";
    document
      .getElementById("company-logo")
      .setAttribute("src", "./images/countyhunters.png");
    document.getElementById("description").innerHTML =
      "no description avaliable ";

    addTo.innerHTML = "";
    return;
  } else {
    //first job
    document.getElementById("job-title").innerHTML = data[0].title;
    document.getElementById("company").innerHTML = data[0].company;
    document
      .getElementById("company-logo")
      .setAttribute("src", data[0].company_logo);
    document.getElementById("description").innerHTML = data[0].description;
    document.getElementById("apply_btn").setAttribute("href", data[0].url);
    //ISSUE USING THE URL TO DIRECTLY APPLY AS IT RETURNS AN HTML ELEMENT WITH THE LINK AND NOT JUST THE LINK
    // how_to_apply
    //   if (data.length === 2) {
    //     //rest of the jobs SIDE BAR
    //     document.getElementById("list-home-list").innerHTML = data[1].company;
    //     document.getElementById("list-home").innerHTML = data[1].title;
    //     return;
    //   } else if (data.length === 3) {
    //     document.getElementById("list-profile-list").innerHTML = data[2].company;
    //     document.getElementById("list-profile").innerHTML = data[2].title;
    //     return;
    //   } else if (data.length === 4) {
    //     document.getElementById("list-messages-list").innerHTML = data[3].company;
    //     document.getElementById("list-messages").innerHTML = data[3].title;
    //     return;
    //   } else if (data.length === 5) {
    //     document.getElementById("list-settings-list").innerHTML = data[4].company;
    //     document.getElementById("list-settings").innerHTML = data[4].title;
    //     return;
    //   } else {
    //     return;
    //   }
  }
}
