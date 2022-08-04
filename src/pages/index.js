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
  return cardElement
}

const image = new PopupWithImage('.popup_image');
image.setEventListeners();

const validCardForm = new FormValidator(configValid, cardForm);
validCardForm.enableValidation();

const validNameForm = new FormValidator(configValid, nameForm);
validNameForm.enableValidation();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  professionSelector: '.profile__profession' 
});

const newCardPopup = new PopupWithForm('.popup_add-card', {
  renderer: (inputs) => {
    newCardPopup.nameInput = inputs.string0;
    newCardPopup.linkInput = inputs.string1;
  }
});
newCardPopup.setEventListeners();

const newNamePopup = new PopupWithForm('.popup_profile', {
  renderer: (inputs) => {
    newNamePopup.nameInput = inputs.string0;
    newNamePopup.linkInput = inputs.string1;
    const pageInfo = userInfo.getUserInfo()
    newNamePopup.nameInput.value = pageInfo.userName;
    newNamePopup.linkInput.value = pageInfo.userProfession;
  }
});
newNamePopup.setEventListeners();

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    cardList.setItem(createCard(item.name, item.link));
    }
}, '.element__grid');
cardList.renderItems();

buttonAdd.addEventListener('click', () => {
  newCardPopup.open();
  validCardForm.toggleButtonState();
});

buttonEdit.addEventListener('click', () => {
  newNamePopup.open();
  validNameForm.toggleButtonState();
});

cardForm.addEventListener('submit', () => {
  cardList.setItem(createCard(newCardPopup.nameInput.value, newCardPopup.linkInput.value));
  newCardPopup.nameInput.value = ''; 
  newCardPopup.linkInput.value = '';
  newCardPopup.close();
});

nameForm.addEventListener('submit', () => {
  userInfo.setUserInfo(newNamePopup.nameInput.value, newNamePopup.nameInput.value);
  newNamePopup.close()
})