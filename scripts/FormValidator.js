class FormValidator {
  constructor(form) {
    this._form = form;
    const buttonSubmit = form.querySelector(".popup__save-button");
    this._setupValidation(this._form, buttonSubmit);
  }

  _validateInput(input, errorMessage, regex = null) {
    const errorElement = input.nextElementSibling;
    const trimmedValue = input.value.trim();

    // Modificado mensaje de error aparece si hay 0 o 1 caracteres
    if (trimmedValue.length < 2) {
      input.classList.add("error");
      errorElement.textContent = errorMessage;
      return false;
    } else if (regex && !regex.test(trimmedValue)) {
      input.classList.add("error");
      errorElement.textContent =
        "Por favor, introduce una dirección web válida.";
      return false;
    } else {
      input.classList.remove("error");
      errorElement.textContent = "";
      return true;
    }
  }

  _checkFormValidity(form, button) {
    const inputs = form.querySelectorAll(".popup__input");
    let isValid = true;
    inputs.forEach((input) => {
      if (input.classList.contains("error") || input.value.trim().length < 2) {
        isValid = false;
      }
    });
    button.disabled = !isValid;
    button.classList.toggle("active", isValid);
  }

  _setupValidation(form, button) {
    const inputs = form.querySelectorAll(".popup__input");

    inputs.forEach((input) => {
      const errorElement = document.createElement("p");
      errorElement.classList.add("error-message");
      input.after(errorElement);

      input.addEventListener("input", () => {
        const isUrlField = input.id === "LinkNew";
        const regex = isUrlField
          ? /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i
          : null;
        this._validateInput(input, "Por favor, rellena este campo.", regex);
        this._checkFormValidity(form, button);
      });
      this._checkFormValidity(form, button);
    });
  }
}

export default FormValidator;
