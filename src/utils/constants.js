export const configValid = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '-error',
    errorClassVisible: 'popup__error_visible'
}
  
  export const buttonEdit = document.querySelector('.profile__edit-button');
  export const buttonAdd = document.querySelector('.profile__add-button');
  export const buttonEditAvatar = document.querySelector('.profile__avatar');
  
  const namePopUp = document.querySelector('.popup_profile');
  const cardPopUp = document.querySelector('.popup_add-card');
  const avatarPopup = document.querySelector('.popup_avatar');
  
  export const nameForm = namePopUp.querySelector('.popup__form');
  export const cardForm = cardPopUp.querySelector('.popup__form');
  export const avatarForm = avatarPopup.querySelector('.popup__form');

  export const avatarButton = avatarForm.querySelector('.popup__save-button');
  export const cardButton = cardForm.querySelector('.popup__save-button');
  export const nameButton = nameForm.querySelector('.popup__save-button');