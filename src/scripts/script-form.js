const btnService = document.querySelectorAll(".LSO-item");
const formHeader = document.querySelectorAll(".LF-header-item");
const nextBtn = document.querySelector(".btn-next");
const backBtn = document.querySelector(".btn-back");
console.log(btnService);
console.log(formHeader);

let service_selected = "";

const showBack_btn = (index_selected) => {
  if (index_selected > 0) {
    backBtn.style.visibility = "visible";
  } else {
    backBtn.style.visibility = "hidden";
  }
};

const checked_head = (index_selected) => {
  for (i = 0; i < index_selected; i++) {
    formHeader[i].classList.add("confirmed");
  }
};

btnService.forEach((botoes, index) => {
  botoes.addEventListener("click", () => {
    for (i = 0; i < btnService.length; i++) {
      btnService[i].classList.remove("service-selected");
    }
    botoes.classList.add("service-selected");
    service_selected = btnService[index].value;
    console.log(service_selected + ": selecionado!");
    nextBtn.classList.add("allowed");
  });
});
formHeader.forEach((head_btns, index) => {
  let index_selected = 0;
  formHeader[index_selected].classList.add("selected");
  showBack_btn(index_selected);
  nextBtn.addEventListener("click", () => {
    if (index_selected < formHeader.length - 1) {
      for (i = 0; i < formHeader.length; i++) {
        formHeader[i].classList.add("anim-back");
        formHeader[i].classList.remove("selected", "selected-back");
      }
      index_selected++;
      formHeader[index_selected].classList.add("selected");
      formHeader[index_selected].classList.remove("anim-back", "anim-next");

      checked_head(index_selected);
      showBack_btn(index_selected);
    }
  });
  backBtn.addEventListener("click", () => {
    if (index_selected > 0) {
      for (i = 0; i < formHeader.length; i++) {
        formHeader[i].classList.add("anim-next");
        formHeader[i].classList.remove(
          "selected",
          "selected-back",
          "confirmed",
        );
      }
      index_selected--;
      formHeader[index_selected].classList.add("selected-back");
      formHeader[index_selected].classList.remove("anim-back", "anim-next");

      checked_head(index_selected);
      showBack_btn(index_selected);
    }
  });
});
for (i = 0; i < btnService.length; i++) {
  console.log(i + " " + btnService[i].value);
}
