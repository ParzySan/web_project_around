// import { open } from "./Popup";

export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick) {
    this._name = data.name;
    this._isLiked = data.isLiked;
    this._link = data.link;
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._containerElement = this._element.querySelector("#card-list");
    this._imageElement = this._element.querySelector(".gallery__image");
    this._titleElement = this._element.querySelector(".gallery__title");
    this._likeButton = this._element.querySelector(".gallery__like-button");
    this._trashButton = this._element.querySelector(".gallery__remove-button");

    this._deleteModal = this._element.querySelector("#deleteImg");

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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

    if (this._trashButton) {
      this._trashButton.addEventListener("click", () => {
        this._handleDeleteClick();
      });
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
  _toggleLike() {
    const method = this._isLiked ? "DELETE" : "PUT"; // Si está liked, se hace DELETE; si no, PUT

    fetch(
      `https://around-api.es.tripleten-services.com/v1/cards/${this._id}/likes`,

      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          authorization: "f42c585d-cc5f-427e-b862-3b4799acc436",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((updatedCard) => {
        this._isLiked = !false; // Actualiza el estado con la respuesta de la API
        this._updateLikeStatus(); // Refleja el nuevo estado en la UI
      })
      .catch((err) => console.error("Error al actualizar el like:", err));
  }

  // 🔹 Función para reflejar el estado de "me gusta" en la UI
  _updateLikeStatus() {
    if (this._isLiked) {
      this._likeButton.classList.add("activa");
    } else {
      this._likeButton.classList.remove("activa");
    }
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
      .catch((error) => console.error("Error en la solicitud:", error));
  }
  //funcion para eliminar card

  generarCard() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners();
    this._updateLikeStatus();
    return this._element;
  }
}
