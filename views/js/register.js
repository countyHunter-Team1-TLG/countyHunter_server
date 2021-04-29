const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  axios.post("/user/register", data).then((res) => {
    console.log(res);
  });
});
