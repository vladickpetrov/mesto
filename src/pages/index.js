import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section }  from "../components/Section.js";
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage }  from "../components/PopupWithImage.js";
import { 
  avatarForm, 
  cardForm, 
  configValid, 
  nameForm, 
  buttonEdit, 
  buttonAdd, 
  buttonEditAvatar, 
  userAvatar,
  avatarButton,
  nameButton,
  cardButton } from '../utils/constants.js'
import { UserInfo } from "../components/UserInfo.js";
import { Api } from '../components/Api.js';
import '../pages/index.css';

export let myId;
export let currentId;

function createCard(name, link, likes, ownId, id) {
  const card = new Card(name, link, '#element', likes, ownId, id, {
    handleCardClick: () => {
      image.open(name, link)
    },
    handleDeleteClick: () => {
      currentId = id;
      newSurePopup.open()
    },
    handleLikeClick: (id) => {
      api.handleLike(id, card._element);
    }
  });
  const cardElement = card.generateCard();
  return cardElement
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49', 
  headers: {
    authorization: '6de437f0-1a5d-4f78-bdcc-42fde5db78f6',
    'Content-Type': 'application/json'
  },
  fullHandler: function (info) {
    userInfo.setUserInfo(info.name, info.about);
    myId = info._id;
    userAvatar.src = info.avatar;
    // to be sure that myId will load on-time
    // then we will use myId in another promise
    api.setAllPictures();
  },
  cardsHandler: function (info) {
    let cardList = null;
    cardList = new Section({
      data: info,
      renderer: (item) => {
        cardList.setItem(createCard(item.name, item.link, item.likes, item.owner._id, item._id));
        }
    }, '.element__grid');
    cardList.renderItems();
  }
});
api.setUserInfo();

const image = new PopupWithImage('.popup_image');
image.setEventListeners();

const validCardForm = new FormValidator(configValid, cardForm);
validCardForm.enableValidation();

const validNameForm = new FormValidator(configValid, nameForm);
validNameForm.enableValidation();

const validAvatarForm = new FormValidator(configValid, avatarForm)
validAvatarForm.enableValidation();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  professionSelector: '.profile__profession' 
});

export const newCardPopup = new PopupWithForm('.popup_add-card', {
  renderer: (formInputs) => {
    api.sendPicture(formInputs.string1, formInputs.string2);
    newCardPopup.inputs[0].value = '';
    newCardPopup.inputs[1].value = '';
  }
});
newCardPopup.setEventListeners();

export const newNamePopup = new PopupWithForm('.popup_profile', {
  renderer: (formInputs) => {
    userInfo.setUserInfo(formInputs.string1, formInputs.string2);
    api.sendUserInfo(formInputs.string1, formInputs.string2);
    const pageInfo = userInfo.getUserInfo();
    newNamePopup.inputs[0].value = pageInfo.userName;
    newNamePopup.inputs[1].value = pageInfo.userProfession;
  }
});
newNamePopup.setEventListeners();

const newSurePopup = new PopupWithForm('.popup_sure', {
  renderer: (currentId) => {
    api.deleteCard(currentId);
    newSurePopup.close();
  }
});
newSurePopup.setEventListenersSure();

export const newAvatarPopup = new PopupWithForm('.popup_avatar', {
  renderer: (formInputs) => {
    userAvatar.src = formInputs.string1;
    api.sendAvatarPicture(formInputs.string1);
  }
});
newAvatarPopup.setEventListeners();

buttonAdd.addEventListener('click', () => {
  newCardPopup.open();
  validCardForm.toggleButtonState();
});

buttonEditAvatar.addEventListener('click', () => {
  newAvatarPopup.open();
  validAvatarForm.toggleButtonState();
});

buttonEdit.addEventListener('click', () => {
  newNamePopup.open();
  validNameForm.toggleButtonState();
});