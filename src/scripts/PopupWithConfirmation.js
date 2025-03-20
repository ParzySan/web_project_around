import { Popup } from "./Popup.js";
import Card from "./Card.js";
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // this._DeleteModal = document.querySelector("#deleteImg");
    this._deletebutton = document.querySelector("#deleteButton");
    // this._id = data._id;
  }

  setId(Id) {
    this._id = Id;
  }

  open() {
    super.open();
    this._popup.classList.add("visible");
    this._deletebutton.classList.add("active");
  }

  close() {
    super.close();
    this._popup.classList.remove("visible");
  }

  _deleteCard() {
    fetch(`https://around-api.es.tripleten-services.com/v1/cards/${this._id}`, {
      method: "DELETE",
      headers: {
        Authorization: "f42c585d-cc5f-427e-b862-3b4799acc436",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Tarjeta eliminada exitosamente");
        } else {
          console.log("Error al eliminar la tarjeta");
        }
      })
      .catch((error) => console.error("Error en la solicitud:", error))

      .finally(() => {
        this.close();
        location.reload();
      });

    // console.log(this._id);
  }

  setEventListeners() {
    super.setEventListeners();
    this._deletebutton.addEventListener("click", () => {
      this._deleteCard();
    });
  }
}
