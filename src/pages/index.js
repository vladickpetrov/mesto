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
  renderer: (formInputs) => {
    cardList.setItem(createCard(formInputs.string0, formInputs.string1));
    newCardPopup.inputs[0].value = '';
    newCardPopup.inputs[1].value = '';
    newCardPopup.close();
  }
});
newCardPopup.setEventListeners();

const newNamePopup = new PopupWithForm('.popup_profile', {
  renderer: (formInputs) => {
    userInfo.setUserInfo(formInputs.string0, formInputs.string1);
    const pageInfo = userInfo.getUserInfo();
    newNamePopup.inputs[0].value = pageInfo.userName;
    newNamePopup.inputs[1].value = pageInfo.userProfession;
    newNamePopup.close();
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

console.log('посхалочка');