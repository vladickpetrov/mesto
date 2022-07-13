const initialCards = [
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

const configValid = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '-error',
  errorClassVisible: 'popup__error_visible'
}

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const imagePopUp = document.querySelector('.popup_image');
const imagePopUpTitle = imagePopUp.querySelector('.popup__image-title');
const imagePopupPicture = imagePopUp.querySelector('.popup__image');

const namePopUp = document.querySelector('.popup_profile');
const cardPopUp = document.querySelector('.popup_add-card');

const userNameOnPage = document.querySelector('.profile__name');
const userProfessionOnPage = document.querySelector('.profile__profession');
const allElements = document.querySelector('.element__grid');

const nameForm = namePopUp.querySelector('.popup__form');
const nameProfileForm = namePopUp.querySelector('.popup__name');
const professionProfileForm = namePopUp.querySelector('.popup__profession');

const cardForm = cardPopUp.querySelector('.popup__form');
const nameCardForm = cardPopUp.querySelector('.popup__name');
const linkCardForm = cardPopUp.querySelector('.popup__profession');

const validNameForm = new FormValidator(configValid, nameForm)
validNameForm.enableValidation();
const validCardForm = new FormValidator(configValid, cardForm)
validCardForm.enableValidation();

function closeWithEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeWithEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeWithEscape);
}

function openPicturePopup() {
  linkCardForm.value = '';
  nameCardForm.value = '';
  openPopup(cardPopUp);
}

function openNamePopup() {
  openPopup(namePopUp);

  nameProfileForm.value = userNameOnPage.textContent;
  professionProfileForm.value = userProfessionOnPage.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  userNameOnPage.textContent = nameProfileForm.value;
  userProfessionOnPage.textContent = professionProfileForm.value;
  closePopup(namePopUp);
}

function handlePictureFormSubmit(evt) {
  evt.preventDefault();
  
  createCard(nameCardForm.value, linkCardForm.value)
  closePopup(cardPopUp);
  validCardForm.toggleButtonState();
}

buttonAdd.addEventListener('click', openPicturePopup);
buttonEdit.addEventListener('click', openNamePopup);

nameForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handlePictureFormSubmit);

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if ((evt.target.classList.contains('popup__close-button')) || (evt.target.classList.contains('popup__background'))) {
      closePopup(popup);
    }
  });
});

function addStartItemAction() { 
  initialCards.forEach(item => { 
    createCard(item.name, item.link);
  }); 
} 

function createCard(name, link) {
  const card = new Card(name, link, '#element');
  const cardElement = card.generateCard();
  allElements.prepend(cardElement);
}

addStartItemAction();

import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

export { imagePopUp, imagePopUpTitle, imagePopupPicture, openPopup}