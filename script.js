const mobibe_btn = document.getElementById("mobile_header_btn");
const mobibe_menu = document.getElementById("mobile_menu");
const header_menu = document.querySelector("header");

mobibe_btn.addEventListener("click", function () {
  console.log("botão clicado");
  mobibe_menu.classList.toggle("active");
  header_menu.classList.toggle("mobile-active");

  const iconBars = document.querySelector("#mobile_header_btn i");
  iconBars.classList.toggle("fa-bars");
  iconBars.classList.toggle("fa-x");
});
