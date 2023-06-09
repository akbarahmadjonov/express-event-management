let wrapper = document.getElementById("div");
let speaker_pic = document.getElementById("image");
let speaker_name = document.getElementById("name");
let founder_of = document.getElementById("founder");

const API = "http://localhost:4000/speakers";

fetch(API, {
  method: "GET",
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error: " + response.status);
    }
  })
  .then((data) => {
    data.forEach((user) => {
      const div = document.createElement("div");
      div.classList.add = "col-sm-6 col-md-4 col-lg-3 p-4";
      div.innerHTML = `
        <img id="image" width='300' src='http://localhost:4000/${user.image}'>
        <h5 class="fs-0 mt-3 mb-1"><a class="color-1" id="name" href="#">${user.speaker_name}</a></h5>
        <div id="founder" class="font-1 fs--1 text-uppercase color-6">${user.founder_of}</div>`;
      wrapper.appendChild(div);
      //   speaker_pic.src = `http://localhost:4000/${user.image}`;
      //   speaker_name.textContent = user.speaker_name;
      //   founder_of.textContent = user.founder_of;
    });
  })
  .catch((error) => {
    console.log(error);
  });

//* LOGIN admin

let form = document.getElementById("form");
let username = document.getElementById("username");
let password = document.getElementById("password");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("http://localhost:4000/admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        return (window.location.href = "admin.html");
      }
      alert("Make sure you type a password is a valid");
    })
    .catch((error) => console.log(error));
});
