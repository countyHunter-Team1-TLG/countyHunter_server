const serverUrl = "https://countyhunter.herokuapp.com/user/login";
// login button
var form = document.forms.namedItem("user_login_form");
form.addEventListener("submit", async function (ev) {
  let formData = new FormData(form);
  await axios.post(serverUrl, formData).then((response) => {
    console.log(response);
  });
});

//
