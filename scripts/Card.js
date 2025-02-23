import { openImageModal } from "./utils.js";
export default class Card {
  constructor(titulo, link, template) {
    this._titulo = titulo;

    this._link = link;

    this._template = template;
  }

  generarCard() {
    const templatePrueba = this._template;
    templatePrueba.querySelector(".gallery__title").textContent = this._titulo;

    const imgElement = templatePrueba.querySelector(".gallery__image");

    imgElement.src = this._link;

    imgElement.alt = this._titulo;

    this._agregarEventos();

    return templatePrueba;
  }

  _agregarEventos() {
    const removeElement = this._template.querySelector(
      ".gallery__remove-button"
    );
    removeElement.addEventListener("click", () => {
      this._template.remove();
    });

    const likeButton = this._template.querySelector(".gallery__like-button");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("activa");
    });
    const imgElement = this._template.querySelector(".gallery__image");
    const imgModal = this._template.querySelector(".gallery__image");
    imgModal.addEventListener("click", () => {
      openImageModal(imgElement, this._titulo);
    });
  }
}
