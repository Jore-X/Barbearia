// ______________________________________________
// ______________________________________________
// ELEMENTOS
// ______________________________________________
// ______________________________________________
const btnService = document.querySelectorAll(".LSO-item");
const btnBarber = document.querySelectorAll(".LBO-item");
const formHeader = document.querySelectorAll(".LF-header-item");
const nextBtn = document.querySelector(".btn-next");
const backBtn = document.querySelector(".btn-back");
console.log(btnService);
console.log(formHeader);
const grids_all = document.querySelectorAll(".layout-form-grid > *");
const grid1 = document.querySelector(".layout-form-grid > :nth-child(1)");
const grid2 = document.querySelector(".layout-form-grid > :nth-child(2)");
const grid3 = document.querySelector(".layout-form-grid > :nth-child(3)");
const grid4 = document.querySelector(".layout-form-grid > :nth-child(4)");
const grid5 = document.querySelector(".layout-form-grid > :nth-child(5)");
console.log(grids_all);
// ______________________________________________
// ______________________________________________
// VARIAVEIS
// ______________________________________________
// ______________________________________________
let service_selected = "";
let barber_selected = "";
let allow_btn = 0;
console.log(allow_btn);

// ______________________________________________
// ______________________________________________
// FUNÇÕES
// ______________________________________________
// ______________________________________________
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

const allow_btn_check = (index_selected) => {
  if (allow_btn >= index_selected && service_selected != "" && allow_btn < 1) {
    nextBtn.classList.add("allowed");
  } else if (
    allow_btn >= index_selected &&
    barber_selected != "" &&
    allow_btn < 2
  ) {
    nextBtn.classList.add("allowed");
  }
};

const toggle_grid = (index_selected) => {
  for (i = 0; i < index_selected; i++) {
    grids_all[i].classList.remove("grid-active", "grid-desactive");
    grids_all[i].classList.add("grid-confirmed");
  }
  for (n = grids_all.length - 1; n > index_selected; n--) {
    grids_all[n].classList.add("grid-desactive");
    grids_all[n].classList.remove("grid-active", "grid-confirmed");
  }

  if (index_selected == 0) {
    grids_all[n].classList.remove("grid-desactive", "grid-confirmed");
    grid1.classList.add("grid-active");
  } else if (index_selected == 1) {
    grids_all[n].classList.remove("grid-desactive", "grid-confirmed");
    grid2.classList.add("grid-active");
  } else if (index_selected == 2) {
    grids_all[n].classList.remove("grid-desactive", "grid-confirmed");
    grid3.classList.add("grid-active");
  } else if (index_selected == 3) {
    grids_all[n].classList.remove("grid-desactive", "grid-confirmed");
    grid4.classList.add("grid-active");
  } else if (index_selected == 4) {
    grids_all[n].classList.remove("grid-desactive", "grid-confirmed");
    grid5.classList.add("grid-active");
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
    allow_btn_check(index_selected);
  });
});
btnBarber.forEach((botoes, index) => {
  botoes.addEventListener("click", () => {
    for (i = 0; i < btnBarber.length; i++) {
      btnBarber[i].classList.remove("barber-selected");
    }
    botoes.classList.add("barber-selected");
    barber_selected = btnBarber[index].value;
    // allow_btn = 1;
    console.log(barber_selected + ": selecionado!");
    allow_btn_check(index_selected);
  });
});
// formHeader.forEach((head_btns, index) => {
let index_selected = 0;
toggle_grid(index_selected);
formHeader[index_selected].classList.add("selected");
showBack_btn(index_selected);
nextBtn.addEventListener("click", () => {
  nextBtn.classList.remove("allowed");
  if (index_selected < formHeader.length - 1) {
    for (i = 0; i < formHeader.length; i++) {
      formHeader[i].classList.add("anim-back");
      formHeader[i].classList.remove("selected", "selected-back");
    }
    index_selected++;
    allow_btn++;
    console.log(allow_btn);

    formHeader[index_selected].classList.add("selected");
    formHeader[index_selected].classList.remove("anim-back", "anim-next");
    toggle_grid(index_selected);
    checked_head(index_selected);
    showBack_btn(index_selected);
    allow_btn_check(index_selected);
  }
});
backBtn.addEventListener("click", () => {
  if (index_selected > 0) {
    for (i = 0; i < formHeader.length; i++) {
      formHeader[i].classList.add("anim-next");
      formHeader[i].classList.remove("selected", "selected-back", "confirmed");
    }
    index_selected--;
    allow_btn--;
    console.log(allow_btn);

    toggle_grid(index_selected);

    formHeader[index_selected].classList.add("selected-back");
    formHeader[index_selected].classList.remove("anim-back", "anim-next");

    checked_head(index_selected);
    showBack_btn(index_selected);
    allow_btn_check(index_selected);
  }
});
// });
// for (i = 0; i < btnService.length; i++) {
//   console.log(i + " " + btnService[i].value);
// }

// ______________________________________________
// ______________________________________________
//  CALENDAR LÓGIC
// ______________________________________________
// ______________________________________________
const calendar_month = document.querySelector(".box-days-calendar");

const fragment_days = document.createDocumentFragment();

for (i = 1; i <= 31; i++) {
  const new_day = document.createElement("span");
  const day_number = document.createElement("p");

  new_day.classList.add("days-calendar");

  day_number.textContent = `${i}`;

  new_day.appendChild(day_number);

  console.log(new_day);
  fragment_days.appendChild(new_day);
}

calendar_month.appendChild(fragment_days);

const horarios = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
];

const calendar_hours = document.querySelector(".box-hours-calendar");
const fragment_hours = document.createDocumentFragment();
console.log(horarios.length);
console.log(horarios);
for (i = 0; i < horarios.length; i++) {
  const new_hour = document.createElement("span");
  const hour_number = document.createElement("p");

  new_hour.classList.add("calendar-hour");
  hour_number.textContent = `${horarios[i]}`;

  new_hour.appendChild(hour_number);

  fragment_hours.appendChild(new_hour);
}

calendar_hours.appendChild(fragment_hours);
