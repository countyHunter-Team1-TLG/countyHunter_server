// const form = document.querySelector("form");

// form.addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const data = {
//     name: document.getElementById("name").value,
//     email: document.getElementById("email").value,
//     password: document.getElementById("password").value,
//   };

//   await axios.post("/user/register", data).then((res) => {
//     console.log(res);
//   });
// });

const serverUrl = "https://countyhunter.herokuapp.com/user/register";
// register button
var register_form = document.forms.namedItem("register_form");

document
  .getElementById("register_button")
  .addEventListener("click", async function (ev) {
    ev.preventDefault();
    let formData = new FormData(register_form);
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
