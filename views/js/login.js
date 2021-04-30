const serverUrl = "https://countyhunter.herokuapp.com/user/login";
// login button
var form = document.forms.namedItem("user_login_form");

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
    if (json.success) {
      console.log(json);
    } else {
      alert(json.error);
    }
  });
