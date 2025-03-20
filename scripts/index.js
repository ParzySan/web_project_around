import Card from "./Card.js";
import { Api } from "./API.js";
// import { setupCardManager } from "./utils.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithAvatar } from "./PopupWithAvatar.js";
import { UserInfo } from "./Userinfo.js";

const botonEditar = document.querySelector(".profile__edit"); // boton edit
const modalEdit = document.querySelector("#editButton");

let modalAdd = document.querySelector("#addImg"); // Ventana emergente
let addButton = document.querySelector("#addButton");

const cardList = document.querySelector("#card-list");

// const initialCards = [
//   {
//     name: "Valle de Yosemite",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
//   },
//   {
//     name: "Lago Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
//   },
//   {
//     name: "Montañas Calvas",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
//   },
//   {
//     name: "Parque Nacional de la Vanoise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
//   },
// ];

const nameInput = document.querySelector("#InputName"); // Campo de nombre
const jobInput = document.querySelector("#InputRole");
const profileName = document.querySelector(".profile__name"); // Nombre en el perfil
const profileRole = document.querySelector(".profile__role");
const modalDelete = document.querySelector("#DeleteImng");
const avatarButton = document.querySelector("#button__profile");

// const tituloInput = document.querySelector("#TituloNew");
// const linkInput = document.querySelector("#LinkNew");

nameInput.value = profileName.textContent;
jobInput.value = profileRole.textContent;

//function handleCardClick abre image size up
function handleCardClick(name, link) {
  popupWithImage.open({ link, name });
}
const popupTrash = new PopupWithConfirmation("#deleteImg");

function handleDeleteClick() {
  popupTrash.open();
  popupTrash.setId(this._id);
}
popupTrash.setEventListeners();

// const botonEliminar = document.querySelector(".gallery__remove-button");
// const popupwithdelete = new PopupWithConfirmation("#deteleImg");

// botonEliminar.addEventListener("click", () => {
//   popupwithdelete.open();
// });

//PopupWithImage para visualizar card size up
const popupWithImage = new PopupWithImage("#popup-size-card");
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "f42c585d-cc5f-427e-b862-3b4799acc436",
    "Content-Type": "application/json",
  },
});
// const cardSection = new Section(
//   {
//     items: initialCards,
//     renderer: (cardData) => {
//       const card = new Card(cardData, "#card-template", handleCardClick);
//       const cardElement = card.generarCard();
//       cardSection.addItems(cardElement);
//     },
//   },
//   "#card-list"
// );
const cardSection = new Section(
  {
    items: [], // Se llenará después de la solicitud GET
    renderer: (cardData) => {
      const card = new Card(
        cardData,
        "#card-template",
        handleCardClick,
        handleDeleteClick
      );
      const cardElement = card.generarCard();
      cardSection.addItems(cardElement);
    },
  },
  "#card-list"
);

api.fetchCards().then((cards) => {
  console.log("Tarjetas recibidas del servidor:", cards);
  if (Array.isArray(cards) && cards.length > 0) {
    cards.reverse();
    cards.forEach((cardData) => {
      const card = new Card(
        cardData,
        "#card-template",
        handleCardClick,

        handleDeleteClick
      );
      const cardElement = card.generarCard();
      cardSection.addItems(cardElement);
    });
  } else {
    console.warn("No se encontraron tarjetas en el servidor.");
  }
});

//instancia de UserInfo clase
const userInfo = new UserInfo(
  {
    nameSelector: ".profile__name",
    aboutSelector: ".profile__role",
    avatarSelector: ".profile__image",
  },
  api
);

userInfo.fetchUserInfo();

botonEditar.addEventListener("click", () => {
  popupProfileForm.open();
});

//
// const popupProfileForm = new PopupWithForm("#editButton", async (formData) => {
//   try {
//     popupProfileForm.textContent = "Guardando...";
//     const response = await fetch(
//       "https://around-api.es.tripleten-services.com/v1/users/me",
//       {
//         method: "PATCH",
//         headers: {
//           authorization: "f42c585d-cc5f-427e-b862-3b4799acc436",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           about: formData.job,
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Error al actualizar los datos: ${response.status}`);
//     }

//     const updatedUserData = await response.json();

//     // Actualizar los datos en la interfaz
//     userInfo.setUserInfo({
//       name: updatedUserData.name,
//       about: updatedUserData.about,
//     });
//   } catch (error) {
//     console.error("Error al guardar la información del usuario:", error);
//   } finally {
//     () => {
//       // Rehabilitar el botón después de la solicitud
//       popupProfileForm.textContent = "Guardar";
//       popupProfileForm.disabled = true;
//       popupProfileForm.close();
//     };
//   }
// });
//
const textContent = document.querySelector("#EditButton");
const popupProfileForm = new PopupWithForm("#editButton", (formData) => {
  textContent.textContent = "Guardando...";

  fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
    method: "PATCH",
    headers: {
      authorization: "f42c585d-cc5f-427e-b862-3b4799acc436",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.name,
      about: formData.job,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error al actualizar los datos: ${response.status}`);
      }
      return response.json();
    })
    .then((updatedUserData) => {
      // Actualizar los datos en la interfaz
      userInfo.setUserInfo({
        name: updatedUserData.name,
        about: updatedUserData.about,
      });
    })
    .catch((error) => {
      console.error("Error al guardar la información del usuario:", error);
    })
    .finally(() => {
      // Rehabilitar el botón después de la solicitud
      textContent.textContent = "Guardar";
      textContent.disabled = false; // Corregí 'true' por 'false' para reactivar el botón
      popupProfileForm.close();
    });
});

//
const popupAvatar = new PopupWithAvatar("#editAvatar");
avatarButton.addEventListener("click", () => {
  popupAvatar.open();
  popupAvatar.setEventListeners();
});

const popupAddCardForm = new PopupWithForm("#addImg", (formData) => {
  const cardData = {
    name: formData.title,
    link: formData.link,
  };

  // Deshabilitar el botón para evitar múltiples envíos
  const popup = document.getElementById("CrearButton");
  popup.textContent = "Guardando...";
  popup.disabled = true;
  popup.classList.remove("active");

  // Enviar la tarjeta al servidor
  fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "f42c585d-cc5f-427e-b862-3b4799acc436",
    },
    body: JSON.stringify(cardData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error al guardar la tarjeta: ${response.status}`);
      }
      return response.json();
    })
    .then((savedCardData) => {
      // Crear y mostrar la nueva tarjeta solo si se guardó con éxito
      const card = new Card(savedCardData, "#card-template", handleCardClick);
      const cardElement = card.generarCard();
      cardSection.addItems(cardElement);

      // Resetear el formulario y cerrar el popup
      popupAddCardForm._form.reset();
    })
    .catch((error) => {
      console.error("Error al guardar la tarjeta:", error);
    })
    .finally(() => {
      // Rehabilitar el botón después de la solicitud
      popup.textContent = "Guardar";
      popup.disabled = true;
      popupAddCardForm.close();
    });
});

addButton.addEventListener("click", () => {
  popupAddCardForm.open();
});
// const bottonAvar = document.querySelector("#AvatarButton");
// const formAvatar = document.querySelector(".popup__input_profile");

// bottonAvar.addEventListener("click", () => {
//   formAvatar.actualizarAvatar(formAvatar);
// });
// botonEliminar.addEventListener("click", () => {
//   popupDelete.open();
// });
// const popupAdd = document.querySelector("#AddClose");
// popupAdd.addEventListener("click", () => cerrarModal(modalAdd));

// Aplicando la validación a los formularios
const editForm = document.querySelector("#formEdit");

const addForm = document.querySelector("#formAdd");

const profileForm = document.querySelector("#formdelete");

// editForm.addEventListener("submit", handleProfileFormSubmit(evt));
cardSection.renderItems();
// popupWithImage.setEventListeners();
// profileFormValidator.setupProfileEditor(formEdit, profileName, profileRole);
// setupCardManager(formAdd, cardList);

popupWithImage.setEventListeners();
popupProfileForm.setEventListeners();
popupAddCardForm.setEventListeners();

// popupwithdelete.setEventListeners();
// modalDelete.setEventListeners();

new FormValidator(editForm);
new FormValidator(profileForm);

new FormValidator(addForm);
