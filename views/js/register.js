const register_serverUrl = "https://countyhunter.herokuapp.com/user/register";
// register button
var register_form = document.forms.namedItem("register_form");

document
  .getElementById("register_button")
  .addEventListener("click", async function (ev) {
    ev.preventDefault();
    let formData = new FormData(register_form);
    const data = new URLSearchParams(formData);
    console.log(data);
    let response = await fetch(register_serverUrl, {
      method: "POST",
      body: data,
    });
    let json = await response.json();
    if (!json.auth_token) {
      if (json.errors === undefined) {
        alert(json.error);
      } else {
        alert(json.errors);
      }
    }
    console.log(json);
  });
