import Card from "./Card.js";

// export function abrirModal(modalEdit) {
//   modalEdit.classList.add("visible");
//   const overlay = document.querySelector(".overlay");
//   overlay.classList.add("visible");
// }

// export function cerrarModal(modalEdit) {
//   const overlay = document.querySelector(".overlay");
//   overlay.classList.remove("visible");
//   modalEdit.classList.remove("visible");
// }

// export function setupProfileEditor(
//   form,
//   profileNameElement,
//   profileRoleElement
// ) {
//   const modalEdit = document.querySelector("#editButton");
//   const inputName = form.querySelector("#InputName");
//   const inputRole = form.querySelector("#InputRole");
//   const popup = document.getElementById("EditButton");

//   form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     profileNameElement.textContent = inputName.value;
//     profileRoleElement.textContent = inputRole.value;
//     popup.classList.add("hidden");
//   });

//   document.getElementById("EditClose").addEventListener("click", () => {
//     popup.classList.add("hidden");
//   });

//   document.querySelector(".profile__edit").addEventListener("click", () => {
//     inputName.value = profileNameElement.textContent;
//     inputRole.value = profileRoleElement.textContent;
//     popup.classList.remove("hidden");
//     popup.addEventListener("click", () => cerrarModal(modalEdit));
//   });
// }

// export function setupCardManager(form, galleryContainer) {
//   const modalAdd = document.querySelector("#addImg");
//   // const tituloInput = form.querySelector("#TituloNew");
//   // const linkInput = form.querySelector("#LinkNew");
//   const popup = document.getElementById("CrearButton");

//   form.addEventListener("submit", (event) => {
//     event.preventDefault();

//     const nuevaCard = new Card(
//       tituloInput.value,
//       linkInput.value,
//       getTemplate()
//     );
//     galleryContainer.prepend(nuevaCard.generarCard());

//     form.reset();
//     popup.disabled = true;
//     popup.classList.remove("active");
//     popup.classList.add("hidden");
//   });

//   document.getElementById("AddClose").addEventListener("click", () => {
//     popup.classList.add("hidden");
//   });

//   document.querySelector("#addButton").addEventListener("click", () => {
//     popup.classList.remove("hidden");
//   });
//   popup.addEventListener("click", () => cerrarModal(modalAdd));
// }

// function getTemplate() {
//   const cardElement = document
//     .querySelector(".template__card")
//     .content.querySelector(".gallery__card")
//     .cloneNode(true);

//   return cardElement;
// }

// export function openImageModal(imgElement, title) {
//   // Crear el modal
//   const modal = document.createElement("div");
//   modal.classList.add("image-modal");

//   // Crear el contenedor del contenido
//   const modalContent = document.createElement("div");
//   modalContent.classList.add("image-modal__content");

//   const closeButton = document.createElement("button");
//   closeButton.textContent = "+";
//   closeButton.classList.add("image-modal__close-button");
//   closeButton.addEventListener("click", () => modal.remove());

//   // Agregar la imagen al modal
//   const img = document.createElement("img");
//   img.src = imgElement.src; // Usar la misma imagen que se presionó
//   img.alt = title;
//   img.classList.add("image-modal__image");

//   // Agregar el título al modal
//   const modalTitle = document.createElement("h3");
//   modalTitle.textContent = title;
//   modalTitle.classList.add("image-modal__title");

//   modalContent.classList.add("active");
//   // Botón para cerrar el modal

//   // Agregar elementos al modal
//   modalContent.appendChild(img);
//   modalContent.appendChild(modalTitle);
//   modalContent.appendChild(closeButton);
//   modal.appendChild(modalContent);

//   // Agregar el modal al body
//   document.body.appendChild(modal);

//   modal.addEventListener("click", (e) => {
//     if (!modalContent.contains(e.target)) {
//       modal.remove();
//     }
//   });
// }

// export function openPopup(popup) {
//   popup.classList.add("visible");
//   document.addEventListener("keydown", closePopupWithEscape);
// }

// //cerrar cualquier popup
// export function closePopup(popup) {
//   popup.classList.remove("visible");
//   document.removeEventListener("keydown", closePopupWithEscape);
// }

// //submit formulario con enter key
// export function submitWithEnter(evt, form) {
//   if (evt.key === "Enter") {
//     evt.preventDefault();
//     form.requestSubmit();
//   }
// }

// //cerrar popup con esc key
// export function closePopupWithEscape(event) {
//   if (event.key === "Escape") {
//     const openPopup = document.querySelector("visible");
//     if (openPopup) {
//       closePopup(openPopup);
//     }
//   }
// }

// //cerrar popup con overlay click
// export function closePopupWithOverlayClick(event) {
//   if (event.target.classList.contains("active")) {
//     const openPopup = document.querySelector("visible");
//     if (openPopup) {
//       closePopup(openPopup);
//     }
//   }
// }
