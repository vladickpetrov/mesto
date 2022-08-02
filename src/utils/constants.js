export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
  
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
  
  const imagePopUp = document.querySelector('.popup_image');
  const imagePopUpTitle = imagePopUp.querySelector('.popup__image-title');
  const imagePopupPicture = imagePopUp.querySelector('.popup__image');
  
  const namePopUp = document.querySelector('.popup_profile');
  const cardPopUp = document.querySelector('.popup_add-card');
  
  export const nameForm = namePopUp.querySelector('.popup__form');
  export const cardForm = cardPopUp.querySelector('.popup__form');
  export { 
    imagePopUpTitle, 
    imagePopupPicture,
 }