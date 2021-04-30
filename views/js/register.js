const form = document.querySelector("form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  await axios.post("/user/register", data).then((res) => {
    console.log(res);
  });
});
