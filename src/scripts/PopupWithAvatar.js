import { Popup } from "./Popup.js";

export class PopupWithAvatar extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // this._imgModal = this._popup.querySelector("#editAvatar");
    this._formAvatar = document.querySelector(".popup__input_profile");
    this._buttonFormAvatar = document.querySelector("#AvatarButton");
    this._buttonFormAvatar.addEventListener("click", (e) => {
      e.preventDefault();
      this.actualizarAvatar(this._formAvatar.value);
      // console.log(this._formAvatar);
    });
  }

  open() {
    super.open();
    this._popup.classList.add("visible");
    // this._imgModal.classList.add("active");
  }

  close() {
    super.close();
    this._popup.classList.remove("visible");
  }

  actualizarAvatar(nuevoAvatarUrl) {
    this._buttonFormAvatar.textContent = "Guardando...";

    fetch("https://around-api.es.tripleten-services.com/v1/users/me/avatar", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "f42c585d-cc5f-427e-b862-3b4799acc436",
      },
      body: JSON.stringify({ avatar: nuevoAvatarUrl }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar el avatar");
        }
        return response.json();
      })
      .then((data) => {
        document.querySelector(".profile__image").src = data.avatar; // Actualiza la imagen en el HTML
        console.log("Avatar actualizado con éxito:", data);
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        // Restaurar el botón
        this._buttonFormAvatar.textContent = "Guardar";
        this._buttonFormAvatar.disabled = false;
        this.close();
      });
  }
}
