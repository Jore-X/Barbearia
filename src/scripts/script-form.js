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
console.log(grids_all);
const calendar_month = document.querySelector(".box-days-calendar");
const form = document.getElementById("data-form");
// ______________________________________________
// ______________________________________________
// VARIAVEIS
// ______________________________________________
// ______________________________________________
let service_selected = {
  service: "",
  price: "",
  duration: "",
};
let barber_selected = "",
  day_selected = undefined;
let hour_selected = undefined;
let allow_btn = 0;
let form_allow_btn = false;
console.log("allow_btn: " + allow_btn);

const Cliente = {
  name: "",
  surname: "",
  observation: "",
  contato: {
    phone_number: "",
    email: "",
  },
  selections: {
    service: {
      name: "",
      price: "70",
      duration: "",
    },
    barber: "",
    date_select: undefined,
    hour_select: "",
  },
};

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
  for (let i = 0; i < index_selected; i++) {
    formHeader[i].classList.add("confirmed");
  }
};

const allow_btn_check = (index_selected) => {
  const paragraphs_backBtn = document.querySelectorAll(".btn-back > p");
  const paragraphs_nextBtn = document.querySelectorAll(".btn-next > p");
  for (let i = 0; i < paragraphs_nextBtn.length; i++) {
    paragraphs_nextBtn[i].style.display = "none";
  }
  for (let i = 0; i < paragraphs_backBtn.length; i++) {
    paragraphs_backBtn[i].style.display = "none";
  }
  if (index_selected === 3) {
    paragraphs_nextBtn[1].style.display = "inline-block";
    paragraphs_backBtn[0].style.display = "inline-block";
  } else if (index_selected === 4) {
    paragraphs_nextBtn[2].style.display = "inline-block";
    paragraphs_backBtn[1].style.display = "inline-block";
    resume_logic(Cliente);
  } else if (index_selected != 3 && index_selected != 4) {
    paragraphs_nextBtn[0].style.display = "inline-block";
    paragraphs_backBtn[0].style.display = "inline-block";
  }
  // _______________________________________________________
  if (
    allow_btn >= index_selected &&
    service_selected.service != "" &&
    allow_btn < 1
  ) {
    nextBtn.classList.add("allowed");
  } else if (
    allow_btn >= index_selected &&
    barber_selected != "" &&
    allow_btn < 2
  ) {
    nextBtn.classList.add("allowed");
  } else if (
    allow_btn >= index_selected &&
    day_selected != undefined &&
    hour_selected != undefined &&
    allow_btn < 3
  ) {
    nextBtn.classList.add("allowed");
  } else if (
    allow_btn >= index_selected &&
    day_selected != undefined &&
    hour_selected != undefined &&
    allow_btn < 4 &&
    form_allow_btn
  ) {
    nextBtn.classList.add("allowed");
  } else if (
    index_selected === 4 &&
    allow_btn >= index_selected &&
    day_selected != undefined &&
    hour_selected != undefined &&
    allow_btn === 4
  ) {
    nextBtn.classList.add("allowed");
  }
};

const toggle_grid = (index_selected) => {
  for (let i = 0; i < index_selected; i++) {
    grids_all[i].classList.remove("grid-active", "grid-desactive");
    grids_all[i].classList.add("grid-confirmed");
  }
  for (let i = grids_all.length - 1; i > index_selected; i--) {
    grids_all[i].classList.add("grid-desactive");
    grids_all[i].classList.remove("grid-active", "grid-confirmed");
  }

  grids_all[index_selected].classList.remove(
    "grid-desactive",
    "grid-confirmed",
  );
  grids_all[index_selected].classList.add("grid-active");
};
const calendar_selection = (days_calendar, months_index) => {
  days_calendar.forEach((day_btn, index) => {
    day_btn.addEventListener("click", () => {
      for (let i = 0; i < days_calendar.length; i++) {
        days_calendar[i].classList.remove("day-selected");
      }
      days_calendar[index].classList.add("day-selected");
      day_selected = days_calendar[index].dataset.date;
      Cliente.selections.date_select = `${day_selected}/${months_index + 1}/${currentDate.year}`;
      console.log("dia selecionado = " + day_selected);
      console.log(Cliente.selections.date_select);
      calendar_hour_box.classList.add("show");
      allow_btn_check(index_selected, form_allow_btn);
    });
    // console.log(Number(day_btn.dataset.date));
  });
  console.log("days_calendar = " + days_calendar.length);
};
const calendar_render = (currentDate, months_index) => {
  let month_selected_days = new Date(
    currentDate.year,
    months_index + 1,
    0,
  ).getDate();
  let start_week_day = new Date(currentDate.year, months_index, 1).getDay();

  const fragment_days = document.createDocumentFragment();

  for (let n = 0; n < start_week_day; n++) {
    const new_day = document.createElement("span");

    fragment_days.appendChild(new_day);
  }
  for (let i = 1; i <= month_selected_days; i++) {
    const new_month = document.createElement("div");
    const new_day = document.createElement("span");
    const day_number = document.createElement("p");

    new_month.classList.add("calendar-month");

    new_day.classList.add("days-calendar");
    new_day.dataset.date = i;

    day_number.textContent = `${i}`;

    new_day.appendChild(day_number);

    fragment_days.appendChild(new_day);
  }
  calendar_month.innerHTML = "";
  calendar_month.appendChild(fragment_days);
  console.log(calendar_month);

  const days_calendar = document.querySelectorAll(".days-calendar");
  calendar_selection(days_calendar, months_index);
  days_unavailable(currentDate, days_calendar, months_index);
};
const days_unavailable = (currentDate, days_calendar, months_index) => {
  const month_days_amount = new Date(
    currentDate.year,
    currentDate.month + 1,
    0,
  ).getDate();
  console.log("Dias quantidade: " + month_days_amount);
  console.log(days_calendar);
  if (months_index < currentDate.month) {
    for (let i = 0; i < days_calendar.length; i++) {
      days_calendar[i].classList.add("day-unavailable");
    }
  } else if (months_index == currentDate.month) {
    for (let i = 0; i < currentDate.day - 1; i++) {
      days_calendar[i].classList.add("day-unavailable");
    }
  }
};
const phoneMask = (input) => {
  // Remove tudo que não for Número
  let valor = input.value.replace(/\D/g, "");
  // Limita estritamente a 11 digitos numericos
  if (valor.length > 11) {
    valor = valor.slice(0, 11);
  }
  // Aplica formatação visual dinamicamente
  if (valor.length > 0) {
    valor = "(" + valor;
  }
  if (valor.length > 3) {
    valor = valor.slice(0, 3) + ") " + valor.slice(3);
  }
  if (valor.length > 10) {
    valor = valor.slice(0, 10) + "-" + valor.slice(10);
  }

  // atualiza o valor do input com a mascara
  input.value = valor;
};
resume_logic = (Cliente) => {
  const services = {
    classic: "Corte Clássico",
    full_beard: "Barba Completa",
    cut_beard: "Corte + Barba",
    american_fade: "Degradê Americano",
    hair_tratament: "Tratamento Capilar",
    premium_ritual: "Ritual Premium",
  };
  const itens_grid = [
    { label: "Serviço", value: services[Cliente.selections.service.name] },
    { label: "Barbeiro", value: Cliente.selections.barber },
    { label: "Data", value: Cliente.selections.date_select },
    { label: "Horário", value: Cliente.selections.hour_select },
    { label: "Cliente", value: `${Cliente.name} ${Cliente.surname}`.trim() },
    { label: "Duração", value: Cliente.selections.service.duration },
    { label: "Total", value: `R$ ${Cliente.selections.service.price}` },
  ];

  const grid_resume = document.querySelector(".LR-grid");
  const fragmentResume = document.createDocumentFragment();

  for (let i = 0; i < itens_grid.length; i++) {
    const new_grid_item = document.createElement("div");
    const new_p_item = document.createElement("p");
    const new_span_item = document.createElement("span");

    new_grid_item.classList.add("LR-item");

    new_p_item.textContent = `${itens_grid[i].label}`;
    // if (i == itens_grid.length - 1) {
    //   new_span_item.innerHTML = `<span>R$</span> ${itens_grid[i].value}`;
    // } else {
    new_span_item.textContent = `${itens_grid[i].value}`;
    // }

    new_grid_item.appendChild(new_p_item);
    new_grid_item.appendChild(new_span_item);

    fragmentResume.appendChild(new_grid_item);
  }
  grid_resume.appendChild(fragmentResume);
  console.log(grid_resume);
  const final_warning = document.querySelector(".LR-bottom-resume");
  final_warning.innerHTML = `📱 A confirmação será enviada ao WhatsApp <span>${Cliente.contato.phone_number}</span> e ao e-mail cadastrado.`;
};

btnService.forEach((botoes, index) => {
  botoes.addEventListener("click", () => {
    for (let i = 0; i < btnService.length; i++) {
      btnService[i].classList.remove("service-selected");
    }
    botoes.classList.add("service-selected");
    service_selected.service = btnService[index].value;
    service_selected.price = btnService[index].dataset.price;
    service_selected.duration = btnService[index].dataset.duration;
    Cliente.selections.service = {
      name: service_selected.service,
      price: service_selected.price,
      duration: service_selected.duration,
    };
    console.log(
      service_selected.service +
        ": selecionado!\n" +
        "Duração: " +
        service_selected.duration +
        "\nValor: " +
        service_selected.price,
    );
    allow_btn_check(index_selected, form_allow_btn);
  });
});
btnBarber.forEach((botoes, index) => {
  botoes.addEventListener("click", () => {
    for (let i = 0; i < btnBarber.length; i++) {
      btnBarber[i].classList.remove("barber-selected");
    }
    botoes.classList.add("barber-selected");
    barber_selected = btnBarber[index].value;
    Cliente.selections.barber = barber_selected;
    // allow_btn = 1;
    console.log(barber_selected + ": selecionado!");
    allow_btn_check(index_selected, form_allow_btn);
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
    for (let i = 0; i < formHeader.length; i++) {
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
    allow_btn_check(index_selected, form_allow_btn);
  }
  console.log(Cliente);
});
backBtn.addEventListener("click", () => {
  if (index_selected > 0) {
    for (let i = 0; i < formHeader.length; i++) {
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
    allow_btn_check(index_selected, form_allow_btn);
  }
});
// });
// for (let i = 0; i < btnService.length; i++) {
//   console.log(i + " " + btnService[i].value);
// }

// ______________________________________________
// ______________________________________________
//  CALENDAR LÓGIC
// ______________________________________________
// ______________________________________________
const currentDateFull = new Date();
console.log(currentDateFull);
const currentDate = {
  year: currentDateFull.getFullYear(),
  month: currentDateFull.getMonth(),
  day: currentDateFull.getDate(),
  hour: currentDateFull.getHours(),
  minutes: currentDateFull.getMinutes(),
};
console.log("Get Day: " + new Date(2026, 6, 1).getDay());
console.log(currentDate);
console.log(
  "Quantidade de dias do mês: " +
    new Date(currentDate.year, currentDate.month + 1, 0).getDate(),
);
// ______________________________________________
const back_month_btn = document.querySelector(".back-month-btn");
const next_month_btn = document.querySelector(".next-month-btn");
const months = document.querySelectorAll(".months");
let months_index = currentDate.month;
months[months_index].classList.add("month-selected");
// ______________________________________________
calendar_render(currentDate, months_index);
back_month_btn.addEventListener("click", () => {
  for (let i = 0; i < months.length; i++) {
    months[i].classList.remove("month-selected");
  }
  if (months_index > 0) {
    months_index--;
  }
  months[months_index].classList.add("month-selected");
  calendar_render(currentDate, months_index);
});
// ______________________________________________
next_month_btn.addEventListener("click", () => {
  for (let i = 0; i < months.length; i++) {
    months[i].classList.remove("month-selected");
  }
  if (months_index < months.length - 1) {
    months_index++;
  }
  months[months_index].classList.add("month-selected");
  calendar_render(currentDate, months_index);
});
// ______________________________________________
// ______________________________________________
// ______________________________________________
const horarios = [
  { horario: "09:00", minutos: 540 },
  { horario: "09:30", minutos: 570 },
  { horario: "10:00", minutos: 600 },
  { horario: "10:30", minutos: 630 },
  { horario: "11:00", minutos: 660 },
  { horario: "11:30", minutos: 690 },
  { horario: "13:00", minutos: 780 },
  { horario: "13:30", minutos: 810 },
  { horario: "14:00", minutos: 840 },
  { horario: "14:30", minutos: 870 },
  { horario: "15:00", minutos: 900 },
  { horario: "15:30", minutos: 930 },
  { horario: "16:00", minutos: 960 },
  { horario: "16:30", minutos: 990 },
  { horario: "17:00", minutos: 1020 },
  { horario: "17:30", minutos: 1050 },
  { horario: "18:00", minutos: 1080 },
  { horario: "18:30", minutos: 1110 },
  { horario: "19:00", minutos: 1140 },
  { horario: "19:30", minutos: 1170 },
];

const calendar_hour_box = document.querySelector(".box-hours-calendar");
const fragment_hours = document.createDocumentFragment();
console.log(horarios);
for (let i = 0; i < horarios.length; i++) {
  const new_hour = document.createElement("span");
  const hour_number = document.createElement("p");

  new_hour.classList.add("calendar-hour");
  new_hour.dataset.horaText = horarios[i].horario;
  new_hour.dataset.horaNumero = horarios[i].minutos;

  hour_number.textContent = `${horarios[i].horario}`;

  new_hour.appendChild(hour_number);
  // console.log(new_hour);
  fragment_hours.appendChild(new_hour);
}

calendar_hour_box.appendChild(fragment_hours);
// ______________________________________________
const calendar_hours = document.querySelectorAll(".calendar-hour");
calendar_hours.forEach((hours, index) => {
  hours.addEventListener("click", () => {
    for (let i = 0; i < calendar_hours.length; i++) {
      calendar_hours[i].classList.remove("hour-selected");
    }
    calendar_hours[index].classList.add("hour-selected");

    Cliente.selections.hour_select = calendar_hours[index].dataset.horaText;
    hour_selected = calendar_hours[index].dataset.horaNumero;
    console.log("Hora Selecionada = " + Cliente.selections.hour_select);
    console.log("Hora Selecionada = " + hour_selected);

    allow_btn_check(index_selected, form_allow_btn);
  });
});
// ______________________________________________

// ______________________________________________
// ______________________________________________
//  FORM LÓGIC
// ______________________________________________
// ______________________________________________
const data_inputs = document.querySelectorAll(
  ".LDF-form-fields > input, .LDF-form-fields > textarea",
);

data_inputs.forEach((inputs, index) => {
  inputs.addEventListener("blur", () => {
    const field = event.target;
    const field_name = field.name;
    const field_value = field.value;
    form_allow_btn = false;

    if (field_value.trim() === "") return;
    console.log(
      `Salvando automaticamente o campo [${field_name}]: ${field_value}`,
    );
    switch (field_name) {
      case "name":
        Cliente.name = field_value;
        break;
      case "surname":
        Cliente.surname = field_value;
        break;
      case "phone-number":
        Cliente.contato.phone_number = field_value;
        break;
      case "email":
        Cliente.contato.email = field_value;
        break;
      case "observations":
        Cliente.observation = field_value;
        break;
    }
    console.log(Cliente);
    if (
      Cliente.name != "" &&
      Cliente.surname != "" &&
      Cliente.contato.phone_number != undefined
    ) {
      form_allow_btn = true;
    }

    allow_btn_check(index_selected, form_allow_btn);
  });
});

// ______________________________________________
// ______________________________________________
//  RESUME LÓGIC
// ______________________________________________
// ______________________________________________
