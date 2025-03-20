export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Método para manejar respuestas y errores
  _handleResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Error: ${response.status}`);
    }
    return response.json();
  }

  // Obtener información del usuario
  async getUserInfo() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    // console.log(response);
    return this._handleResponse(response);
  }

  async fetchCards() {
    return fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
      method: "GET",
      headers: {
        authorization: "f42c585d-cc5f-427e-b862-3b4799acc436",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al obtener las tarjetas: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error al cargar las tarjetas:", error);
      });
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  // Método para quitar "me gusta"
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }
}
