export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._fondo = document.querySelector(".overlay");
  }

  //método público para abrir popup
  open() {
    this._fondo.classList.add("visible");
    document.addEventListener("keydown", this._handleEscClose);
  }

  //método público para cerrar popup
  close() {
    this._fondo.classList.remove("visible");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //método privado para cerrar popup con Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //detector de eventos de click
  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        // evt.target.classList.contains("active") ||
        evt.target.closest(".popup__close") ||
        evt.target.closest(".image-modal__close-button")
      ) {
        this.close();
      }
    });
  }
}
