import Card from "./Card.js";
// import { setupCardManager } from "./utils.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./Userinfo.js";

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
// const tituloInput = document.querySelector("#TituloNew");
// const linkInput = document.querySelector("#LinkNew");

nameInput.value = profileName.textContent;
jobInput.value = profileRole.textContent;

//function handleCardClick abre image size up
function handleCardClick(name, link) {
  popupWithImage.open({ link, name });
}

//PopupWithImage para visualizar card size up
const popupWithImage = new PopupWithImage("#popup-size-card");

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card-template", handleCardClick);
      const cardElement = card.generarCard();
      cardSection.addItems(cardElement);
    },
  },
  "#card-list"
);

//instancia de UserInfo clase
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__role",
});

const popupProfileForm = new PopupWithForm("#editButton", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    about: formData.job,
  });
  popupProfileForm.close();
});

botonEditar.addEventListener("click", () => {
  popupProfileForm.open();
});

const popupAddCardForm = new PopupWithForm("#addImg", (formData) => {
  const cardData = {
    name: formData.title,
    link: formData.link,
  };

  const card = new Card(cardData, "#card-template", handleCardClick);

  const cardElement = card.generarCard();
  const popup = document.getElementById("CrearButton");
  cardSection.addItems(cardElement);
  popup.disabled = true;
  popup.classList.remove("active");
  popupAddCardForm._form.reset();

  popupAddCardForm.close();
});

addButton.addEventListener("click", () => {
  popupAddCardForm.open();
});

// const popupAdd = document.querySelector("#AddClose");
// popupAdd.addEventListener("click", () => cerrarModal(modalAdd));

// Aplicando la validación a los formularios
const editForm = document.querySelector("#formEdit");

const addForm = document.querySelector("#formAdd");

// editForm.addEventListener("submit", handleProfileFormSubmit(evt));
cardSection.renderItems();
// popupWithImage.setEventListeners();
// profileFormValidator.setupProfileEditor(formEdit, profileName, profileRole);
// setupCardManager(formAdd, cardList);

popupWithImage.setEventListeners();
popupProfileForm.setEventListeners();
popupAddCardForm.setEventListeners();

new FormValidator(editForm);

new FormValidator(addForm);
