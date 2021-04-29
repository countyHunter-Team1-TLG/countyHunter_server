const serverUrl = "https://countyhunter.herokuapp.com/user/login";
// login button
document
  .getElementById("user_login_button")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    let userEmail = document.getElementById("user_email").value;
    let userPassword = document.getElementById("user_password").value;
    let result = await axios.post(serverUrl, {
      password: userPassword,
      email: userEmail,
    });
    result.then((response) => {
      console.log(response);
    });
  });

//
