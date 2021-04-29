const serverUrl = "https://countyhunter.herokuapp.com/user/login";
// login button
var form = document.forms.namedItem("user_login_form");

document
  .getElementById("user_login_button")
  .addEventListener("click", async function (ev) {
    let formData = new FormData(form);
    let response = await fetch(serverUrl, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    let json = response.json();
    console.log(json);
  });
