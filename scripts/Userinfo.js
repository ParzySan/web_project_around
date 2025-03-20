import {} from "./API.js";
export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }, api) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._api = api;
  }

  // Método para obtener información del usuario desde el servidor con autenticación
  fetchUserInfo() {
    this._api
      .getUserInfo()
      .then((data) => {
        this.setUserInfo({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
          id: data._id,
        });
      })
      .catch((error) => {
        console.error("Error al cargar la información del usuario:", error);
      });
  }
  //método público que devuelve un objeto con información sobre el usuario
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  //método público que toma los datos del nuevo usuario y los agrega en la página
  setUserInfo({ name, about, avatar }) {
    if (name) {
      this._nameElement.textContent = name;
    }
    if (about) {
      this._aboutElement.textContent = about;
    }
    if (avatar) {
      this._avatarElement.src = avatar;
    }
  }
}
