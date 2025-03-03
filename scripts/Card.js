export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;

    this._link = data.link;

    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._containerElement = this._element.querySelector("#card-list");
    this._imageElement = this._element.querySelector(".gallery__image");
    this._titleElement = this._element.querySelector(".gallery__title");
    this._likeButton = this._element.querySelector(".gallery__like-button");
    this._trashButton = this._element.querySelector(".gallery__remove-button");
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    if (this._likeButton) {
      this._likeButton.addEventListener("click", () => this._toggleLike());
    } else {
      console.error("Botón de me gusta no se encontró en la tarjeta.");
    }

    //trash button
    if (this._trashButton) {
      this._trashButton.addEventListener("click", () => this._deleteCard());
    } else {
      console.error("Botón de basura no se encontró en la tarjeta.");
    }

    //card size up
    if (this._imageElement) {
      //handleCardClick para card size up
      this._imageElement.addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
    } else {
      console.error("La imagen no se encontró en la tarjeta.");
    }
  }

  //funcion para estado de like button
  _toggleLike() {
    this._likeButton.classList.toggle("activa");
  }

  //funcion para eliminar card
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generarCard() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}
