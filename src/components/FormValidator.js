export class FormValidator {
    constructor(object, form) {
        this._formSelector = object.formSelector;
        this._inputSelector = object.inputSelector;
        this._submitButtonSelector = object.submitButtonSelector;
        this._inactiveButtonClass = object.inactiveButtonClass;
        this._inputErrorClass = object.inputErrorClass;
        this._errorClass = object.errorClass;
        this._errorClassVisible = object.errorClassVisible;
        this._form = form;
    }

    enableValidation() {
        this._form.addEventListener('submit', function (evt) {
               evt.preventDefault();
        });
        this._setEventListeners();
    }

    _setEventListeners() {
        const inputList = this._form.querySelectorAll(this._inputSelector);
        this.inputListArray = Array.from(inputList);
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
        this.toggleButtonState();
        this.inputListArray.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._inputElement = inputElement;
                this._checkInputValidity();
                this.toggleButtonState();
            });
        });
    }

    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled')
        }
    }

    _showInputError() {
        const errorElement = this._form.querySelector(`.${this._inputElement.id}` + this._errorClass);
        this._inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = this._inputElement.validationMessage;
        errorElement.classList.add(this._errorClassVisible);
    }

    _hideInputError() {
        const errorElement = this._form.querySelector(`.${this._inputElement.id}` + this._errorClass);
        this._inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClassVisible);
    }

    _checkInputValidity() {
        if (!this._inputElement.validity.valid) {
            this._showInputError();
        } else {
            this._hideInputError();
        }
    }

    _hasInvalidInput() {
        return this.inputListArray.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
}