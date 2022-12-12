window.addEventListener("load", async () => {
  const options = {
    headers: {
      Authorization: localStorage.getItem("session"),
    },
  };

  const response = await fetch("http://localhost:3000/habits", options);
  const data = await response.json();
  console.log(data);

  if (response.status == 401) {
    window.location.assign("login.html");
  }
});

const logOut = document.querySelector("button");

logOut.addEventListener("click", async () => {
  const accountId = window.location.href.split("=")[1];
  const url = `http://localhost:3000/users/logout/${accountId}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  localStorage.clear();
  window.location.assign("login.html");
});
