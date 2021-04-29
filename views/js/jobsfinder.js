document.getElementById("job-search").addEventListener("submit", searchJobs);
document.getElementById("details-00").addEventListener("click", detailsSend);

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
    document.getElementById("company-title-00").innerHTML =
      data[0].company + " : " + data[0].title;
    document
      .getElementById("companylogo-00")
      .setAttribute("src", data[0].company_logo);
    document.getElementById("company-description-00").innerHTML =
      data[0].description;

    // if (data.length === 2) {
    //rest of the jobs SIDE BAR
    document.getElementById("company-title-01").innerHTML =
      data[1].company + " : " + data[1].title;
    document
      .getElementById("companylogo-01")
      .setAttribute("src", data[1].company_logo);
    document.getElementById("company-description-01").innerHTML =
      data[1].description;

    //   return;
    // } else if (data.length === 3) {
    document.getElementById("company-title-02").innerHTML =
      data[2].company + " : " + data[2].title;
    document
      .getElementById("companylogo-02")
      .setAttribute("src", data[2].company_logo);
    document.getElementById("company-description-02").innerHTML =
      data[2].description;

    document.getElementById("company-title-03").innerHTML =
      data[3].company + " : " + data[3].title;
    document
      .getElementById("companylogo-03")
      .setAttribute("src", data[3].company_logo);
    document.getElementById("company-description-03").innerHTML =
      data[3].description;

    document.getElementById("company-title-04").innerHTML =
      data[4].company + " : " + data[4].title;
    document
      .getElementById("companylogo-04")
      .setAttribute("src", data[4].company_logo);
    document.getElementById("company-description-04").innerHTML =
      data[4].description;

    document.getElementById("company-title-05").innerHTML =
      data[5].company + " : " + data[5].title;
    document
      .getElementById("companylogo-05")
      .setAttribute("src", data[5].company_logo);
    document.getElementById("company-description-05").innerHTML =
      data[5].description;
  }
}
// function detailsSend() {
//   let company_job_description = document.getElementById("company-title-00")
//     .innerHTML;
//   let img_src = document.getElementById("companylogo-02").src;
//   let company_description = document.getElementById("company-description-02")
//     .innerHTML;

//   document.getElementById("job-title").innerHTML = company_job_description;
//   // document.getElementById("company").innerHTML = data[0].company;
//   document.getElementById("company-logo").setAttribute("src", img_src);
//   document.getElementById("description").innerHTML =
//     data[0].company_description;
//   // document.getElementById("apply_btn").setAttribute("href", data[0].url);
// }
//MAY NOT BE USED
function changedisplay(data) {
  console.log("clicked");
  //onclick change the main display
  document.getElementById("job-title").innerHTML = data.title;
  document.getElementById("company").innerHTML = data.company;
  document
    .getElementById("company-logo")
    .setAttribute("src", data.company_logo);
  document.getElementById("description").innerHTML = data.description;
}

/*
*   HERE WILL BE CODE THAT I MAY NEED LATER

HTML CODE:  src="https://www.thetravelmagazine.net/wp-content/uploads/World-Wonders-Tour-Image.jpg"
*/
