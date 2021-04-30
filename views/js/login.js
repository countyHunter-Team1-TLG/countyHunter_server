const serverUrl = "https://countyhunter.herokuapp.com/user/login";
// login button
var form = document.forms.namedItem("user_login_form");

/**
 * login button fetch POST request to server
 * return authorization token if successfully login
 * else return error message pop up alert message
 */
document
  .getElementById("user_login_button")
  .addEventListener("click", async function (ev) {
    ev.preventDefault();

    let formData = new FormData(form);
    const data = new URLSearchParams(formData);
    let response = await fetch(serverUrl, {
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
