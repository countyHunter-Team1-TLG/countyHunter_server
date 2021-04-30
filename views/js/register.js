const register_serverUrl = "https://countyhunter.herokuapp.com/user/register";
const serverUrl_main = "https://countyhunter.herokuapp.com/views/main";

// register button
var register_form = document.forms.namedItem("register_form");

/**
 * register button fetch POST request to server
 * return authorization token if successfully registered
 * else return error message pop up alert message
 */
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
        alert(JSON.stringify(json));
      } else {
        alert(json.errors);
      }
    } else {
      sessionStorage.setItem("JWTOKEN", json.auth_token);
      console.log(sessionStorage.getItem("JWTOKEN"));
      console.log(json);
      // render main page
      window.open(serverUrl_main);
    }
  });
