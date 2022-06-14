function showInputError(formObject, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}` + formObject.errorClass);
    inputElement.classList.add(formObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formObject.errorClassVisible);
}

function hideInputError(formObject, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}` + formObject.errorClass);
    inputElement.classList.remove(formObject.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(formObject.errorClassVisible);
}

function checkInputValidity(formObject, formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formObject, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formObject, formElement, inputElement);
    }
}

function setEventListeners(formObject, formElement) {
    const inputList = formElement.querySelectorAll(formObject.inputSelector);
    const inputListArray = Array.from(inputList);
    const buttonElement = formElement.querySelector(formObject.submitButtonSelector);
    toggleButtonState(formObject, inputListArray, buttonElement);
    inputListArray.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formObject, formElement, inputElement);
            toggleButtonState(formObject, inputListArray, buttonElement);
        });
    });
}

function enableValidation(formObject) {
    const formList = document.querySelectorAll(formObject.formSelector);
    const formListArray = Array.from(formList);
    formListArray.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formObject, formElement);
    });
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(formObject, inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(formObject.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(formObject.inactiveButtonClass);
    }
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '-error',
    errorClassVisible: 'popup__error_visible'
});