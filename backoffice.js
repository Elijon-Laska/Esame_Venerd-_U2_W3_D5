const form = document.getElementById("formMacchine");

const params = new URLSearchParams(window.location.search);
const carsId = params.get("productId");
const URL = carsId
  ? "https://striveschool-api.herokuapp.com/api/product/" + carsId
  : "https://striveschool-api.herokuapp.com/api/product/";
window.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submit-btn");
  const delBtn = document.getElementById("delete-btn");

  if (carsId) {
    submitBtn.innerText = "Modifica auto";
    submitBtn.classList.add("btn-success");
    subtitle.innerText = "La tua Auto";
    delBtn.classList.remove("d-none");
    delBtn.onclick = handleDelete;
    fetch(URL)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((appointment) => {
        console.log(appointment);
        form.elements.name.value = appointment.name;
        form.elements.description.value = appointment.description;
        form.elements.brand.value = appointment.brand;
        form.elements.imageUrl.value = appointment.imageUrl;
        form.elements.price.value = appointment.price;
      });
  } else {
    submitBtn.innerText = "Aggiungi auto";
    submitBtn.classList.add("btn-primary");
  }
});

form.onsubmit = function (event) {
  event.preventDefault();

  const newCars = {
    name: form.elements.name.value,
    description: form.elements.description.value,
    brand: form.elements.brand.value,
    imageUrl: form.elements.imageUrl.value,
    price: form.elements.price.value,
  };

  console.log(newCars);

  fetch(URL, {
    method: carsId ? "PUT" : "POST",
    body: JSON.stringify(newCars),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella creazione dell'appuntamento");
      }
    })
    .then((createdApp) => {
      if (!carsId) {
        alert("Appuntamento con id " + createdApp._id + " creato correttamente!");

        form.reset();
      } else {
        alert("Appuntamento con id " + createdApp._id + " modificato correttamente!");
      }
    });
};

const handleDelete = () => {
  const hasConfirmed = confirm("sei sicuro di voler eliminare la macchina?");

  if (hasConfirmed) {
    fetch(URL, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((deletedApp) => {
        alert("Abbiamo eliminato " + deletedApp.name + " con id " + deletedApp._id);
        window.location.assign("./index.html");
      })
      .catch((err) => console.log(err));
  }
};
