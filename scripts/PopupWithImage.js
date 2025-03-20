import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgModal = this._popup.querySelector(".image-modal__image");
    this._titleModal = this._popup.querySelector(".image-modal__title");
  }

  open({ link, name }) {
    super.open();
    this._popup.classList.add("active");
    this._imgModal.src = link;
    this._imgModal.alt = name;
    this._titleModal.textContent = name;
  }

  close() {
    super.close();
    this._popup.classList.remove("active");
    // this._botonCrear = false;
  }
}
