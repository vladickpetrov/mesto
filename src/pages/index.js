import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section }  from "../components/Section.js";
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage }  from "../components/PopupWithImage.js";
import { initialCards, cardForm, configValid, nameForm, buttonEdit, buttonAdd,} from '../utils/constants.js'
import { UserInfo } from "../components/UserInfo.js";
import '../pages/index.css';

function createCard(name, link) {
  const card = new Card(name, link, '#element', {
    handleCardClick: () => {
      image.open(name, link)
    }
  });
  const cardElement = card.generateCard();
  cardList.setItem(cardElement);
}

const image = new PopupWithImage('.popup_image');
image.setEventListeners();

const validCardForm = new FormValidator(configValid, cardForm);

const validNameForm = new FormValidator(configValid, nameForm);

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  professionSelector: '.profile__profession' 
});

const newCardPopup = new PopupWithForm('.popup_add-card', {
  renderer: () => {
    validCardForm.enableValidation();
    validCardForm.toggleButtonState();
    newCardPopup._getInputValues()
  }
});
newCardPopup.setEventListeners();

const newNamePopup = new PopupWithForm('.popup_profile', {
  renderer: () => {
    validNameForm.enableValidation();
    newNamePopup._getInputValues();
    const pageInfo = userInfo.getUserInfo()
    newNamePopup.inputName.value = pageInfo.userName;
    newNamePopup.inputLink.value = pageInfo.userProfession;
  }
});
newNamePopup.setEventListeners();

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    createCard(item.name, item.link)
    }
}, '.element__grid');
cardList.renderItems();

buttonAdd.addEventListener('click', () => {
  newCardPopup.open();
});

buttonEdit.addEventListener('click', () => {
  newNamePopup.open();
});

cardForm.addEventListener('submit', () => {
  createCard(newCardPopup.inputName.value, newCardPopup.inputLink.value)
  newCardPopup.inputName.value = ''; 
  newCardPopup.inputLink.value = '';
  newCardPopup.close();
});

nameForm.addEventListener('submit', () => {
  userInfo.setUserInfo(newNamePopup.inputName.value, newNamePopup.inputLink.value);
  validNameForm.toggleButtonState();
  newNamePopup.close()
})