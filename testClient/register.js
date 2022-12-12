const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const url = `http://localhost:3000/users/register`;

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  };

  const response = await fetch(url, options);

  if (response.status == 201) {
    window.location.assign("login.html");
  } else {
    alert("You've fucked it");
  }
});
