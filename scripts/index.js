import Card from "./Card.js";
import {
  abrirModal,
  cerrarModal,
  setupProfileEditor,
  setupCardManager,
} from "./utils.js";
import FormValidator from "./FormValidator.js";

const botonEditar = document.querySelector(".profile__edit"); // boton edit
const modalEdit = document.querySelector("#editButton");

let modalAdd = document.querySelector("#addImg"); // Ventana emergente
let addButton = document.querySelector("#addButton");

const cardList = document.querySelector("#card-list");

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const nameInput = document.querySelector("#InputName"); // Campo de nombre
const jobInput = document.querySelector("#InputRole");
const profileName = document.querySelector(".profile__name"); // Nombre en el perfil
const profileRole = document.querySelector(".profile__role");

nameInput.value = profileName.textContent;
jobInput.value = profileRole.textContent;

function templateCard() {
  const cardElement = document
    .querySelector(".template__card")
    .content.querySelector(".gallery__card")
    .cloneNode(true);

  return cardElement;
}

const renderCard = () => {
  cardList.innerHTML = "";
  initialCards.forEach((carta) => {
    const tarjeta = new Card(carta.name, carta.link, templateCard());

    const elementocarta = tarjeta.generarCard();
    cardList.append(elementocarta);
  });
};

renderCard();

botonEditar.addEventListener("click", () => abrirModal(modalEdit));
addButton.addEventListener("click", () => abrirModal(modalAdd));

const popupEdit = document.querySelector("#EditClose");
popupEdit.addEventListener("click", () => cerrarModal(modalEdit));

const popupAdd = document.querySelector("#AddClose");
popupAdd.addEventListener("click", () => cerrarModal(modalAdd));

// Aplicando la validación a los formularios
const editForm = document.querySelector("#formEdit");

const addForm = document.querySelector("#formAdd");

new FormValidator(editForm);

new FormValidator(addForm);
//editForm.addEventListener("submit", handleProfileFormSubmit(evt));

setupProfileEditor(formEdit, profileName, profileRole);
setupCardManager(formAdd, cardList);
