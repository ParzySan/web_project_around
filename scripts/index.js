// Busquemos el formulario en el DOM
let formElement = document.querySelector("#formEdit"); // Formulario de la ventana emergente
let formElement2 = document.querySelector("#formAdd");

const cardList = document.getElementById("card-list");
const creatButton = document.getElementById("creatButton");

// Busquemos los campos del formulario en el DOM
let nameInput = document.querySelector("#InputName"); // Campo de nombre
let jobInput = document.querySelector("#InputRole"); // Campo de rol
let TitleInput = document.querySelector("#TituloNew"); // Campo de titulo
let ImgInput = document.querySelector("#LinkNew"); // Campo de link de la imagen

// Seleccionemos los elementos donde se mostrarán los valores actualizados
let profileName = document.querySelector(".profile__name"); // Nombre en el perfil
let profileRole = document.querySelector(".profile__role"); // Rol en el perfil

// Botón de editar perfil y elementos de la ventana emergente
let editButton = document.querySelector(".profile__edit"); // Botón "Editar perfil"
let overlay = document.querySelector(".overlay"); // Fondo oscuro
let popupEdit = document.querySelector("#editButton"); // Ventana emergente
let popupAdd = document.querySelector("#addImg"); // Ventana emergente

let closeButtonEdit = document.querySelector("#EditClose"); // Botón para cerrar el popup
let closeButtonAdd = document.querySelector("#AddClose"); // Botón para cerrar el popup
let closeButtonImg = document.querySelector("#ImgClose"); // Botón para cerrar el popup
let addButton = document.querySelector("#addButton");

// Función para abrir la ventana emergente
function openPopupEdit() {
  overlay.classList.add("visible");
  popupEdit.classList.add("visible");

  // Precargar valores actuales en los campos del formulario
  nameInput.value = profileName.textContent;
  jobInput.value = profileRole.textContent;
}

function openPopupAdd() {
  overlay.classList.add("visible");
  popupAdd.classList.add("visible");
}
// Función para cerrar la ventana emergente
function closePopupEdit() {
  overlay.classList.remove("visible");
  popupEdit.classList.remove("visible");
}
function closePopupAdd() {
  overlay.classList.remove("visible");
  popupAdd.classList.remove("visible");
}
// Manejador (handler) para guardar los datos del formulario
function handleProfileFormSubmit(evt) {
  // Esta línea impide que el navegador entregue el formulario en su forma predeterminada.
  evt.preventDefault();

  // Obtén los valores de cada campo desde la propiedad de valor correspondiente
  const newName = nameInput.value; // Valor del campo de nombre
  const newJob = jobInput.value; // Valor del campo de rol

  // Inserta los nuevos valores en el perfil
  profileName.textContent = newName;
  profileRole.textContent = newJob;

  // Cierra la ventana emergente después de guardar los cambios
  closePopupEdit();
}

function handleCardNew(evt) {
  evt.preventDefault();

  const newTitle = TitleInput.value;
  const newImg = ImgInput.value;

  creatCardNew(newTitle, newImg);

  closePopupAdd();
}

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

//creatButton.addEventListener("click", crear);

function creatCardNew(name, link) {
  cardList.prepend(estructurCard(name, link));
}

function removeCard(cardElement) {
  cardElement.remove(); // Elimina la tarjeta del DOM
}

function mostrarList() {
  initialCards.forEach((card) => {
    cardList.append(estructurCard(card.name, card.link));
  });
}
function closePopupImg() {
  popupAdd.classList.remove("visible");
}

function openImageModal(imgElement, title) {
  // Crear el modal
  const modal = document.createElement("div");
  modal.classList.add("image-modal");

  // Crear el contenedor del contenido
  const modalContent = document.createElement("div");
  modalContent.classList.add("image-modal__content");

  const closeButton = document.createElement("button");
  closeButton.textContent = "+";
  closeButton.classList.add("image-modal__close-button");
  closeButton.addEventListener("click", () => modal.remove());

  // Agregar la imagen al modal
  const img = document.createElement("img");
  img.src = imgElement.src; // Usar la misma imagen que se presionó
  img.alt = title;
  img.classList.add("image-modal__image");

  // Agregar el título al modal
  const modalTitle = document.createElement("h3");
  modalTitle.textContent = title;
  modalTitle.classList.add("image-modal__title");

  modalContent.classList.add("active");
  // Botón para cerrar el modal

  // Agregar elementos al modal
  modalContent.appendChild(img);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);

  // Agregar el modal al body
  document.body.appendChild(modal);

  modal.addEventListener("click", (e) => {
    if (!modalContent.contains(e.target)) {
      modal.remove();
    }
  });
}

function estructurCard(name, link) {
  const CardContainer = document.createElement("div");
  CardContainer.classList.add("gallery__card");

  const ImgCard = document.createElement("img");
  ImgCard.src = link;
  ImgCard.addEventListener("click", () => openImageModal(ImgCard, name));

  const CardContainerInfo = document.createElement("div");
  CardContainerInfo.classList.add("gallery__card-info");

  const removebuttonCard = document.createElement("button");
  removebuttonCard.classList.add("gallery__remove-button");
  removebuttonCard.addEventListener("click", () => removeCard(CardContainer));

  const titleCard = document.createElement("h3");
  titleCard.classList.add("gallery__title");
  titleCard.textContent = name;

  const likebuttonCard = document.createElement("button");
  likebuttonCard.classList.add("gallery__like-button");

  likebuttonCard.addEventListener("click", () => {
    likebuttonCard.classList.toggle("activa");
  });

  CardContainerInfo.append(titleCard, likebuttonCard);

  CardContainer.append(removebuttonCard, ImgCard, CardContainerInfo);
  return CardContainer;
}

mostrarList();

// Conecta los manejadores (handlers) a los eventos correspondientes
editButton.addEventListener("click", openPopupEdit); // Abrir ventana emergente al hacer clic en el botón de editar
addButton.addEventListener("click", openPopupAdd); // Abrir ventana emergente al hacer clic en el botón de editar

closeButtonEdit.addEventListener("click", closePopupEdit); // Cerrar ventana emergente al hacer clic en el botón de cerrar
closeButtonAdd.addEventListener("click", closePopupAdd); // Cerrar ventana emergente al hacer clic en el botón de cerrar

overlay.addEventListener("click", closePopupAdd); // Cerrar ventana emergente al hacer clic en el fondo oscuro
overlay.addEventListener("click", closePopupEdit); // Cerrar ventana emergente al hacer clic en el fondo oscuro

formElement.addEventListener("submit", handleProfileFormSubmit);
formElement2.addEventListener("submit", handleCardNew);
