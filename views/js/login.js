const serverUrl_login = "https://countyhunter.herokuapp.com/user/login";
const serverUrl_main = "https://countyhunter.herokuapp.com/views/main";

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
    let response = await fetch(serverUrl_login, {
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
    sessionStorage.setItem("JWTOKEN", json.auth_token);
    console.log(sessionStorage.getItem("JWTOKEN"));
    console.log(json);
    // send get request to render main page
    let render = await fetch(serverUrl_main, {
      method: "get",
    });
    let renderResponse = await render.json();
    console.log(renderResponse);
  });
