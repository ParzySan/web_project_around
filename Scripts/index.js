// Busquemos el formulario en el DOM
let formElement = document.querySelector(".popup__form"); // Formulario de la ventana emergente

// Busquemos los campos del formulario en el DOM
let nameInput = document.querySelector(".popup__input_name"); // Campo de nombre
let jobInput = document.querySelector(".popup__input_role"); // Campo de rol

// Seleccionemos los elementos donde se mostrarán los valores actualizados
let profileName = document.querySelector(".profile__name"); // Nombre en el perfil
let profileRole = document.querySelector(".profile__role"); // Rol en el perfil

// Botón de editar perfil y elementos de la ventana emergente
let editButton = document.querySelector(".edit__button"); // Botón "Editar perfil"
let overlay = document.querySelector(".overlay"); // Fondo oscuro
let popup = document.querySelector(".popup"); // Ventana emergente
let closeButton = document.querySelector(".popup__close"); // Botón para cerrar el popup

// Función para abrir la ventana emergente
function openPopup() {
  overlay.classList.add("visible");
  popup.classList.add("visible");

  // Precargar valores actuales en los campos del formulario
  nameInput.value = profileName.textContent;
  jobInput.value = profileRole.textContent;
}

// Función para cerrar la ventana emergente
function closePopup() {
  overlay.classList.remove("visible");
  popup.classList.remove("visible");
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
  closePopup();
}

// Conecta los manejadores (handlers) a los eventos correspondientes
editButton.addEventListener("click", openPopup); // Abrir ventana emergente al hacer clic en el botón de editar
closeButton.addEventListener("click", closePopup); // Cerrar ventana emergente al hacer clic en el botón de cerrar
overlay.addEventListener("click", closePopup); // Cerrar ventana emergente al hacer clic en el fondo oscuro
formElement.addEventListener("submit", handleProfileFormSubmit);
