const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '#element', {
      handleCardClick: () => {
        const image = new PopupWithImage('.popup_image');
        image.open(item.name, item.link)
      }
    });
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
    }
}, '.element__grid');

cardList.renderItems();

buttonAdd.addEventListener('click', () => {
  const newCardPopup = new PopupWithForm('.popup_add-card', {
    renderer: () => {
      const validCardForm = new FormValidator(configValid, cardForm);
      validCardForm.enableValidation();
      validCardForm.toggleButtonState();
      cardForm.addEventListener('submit', () => {
        newCardPopup._getInputValues();
        const card = new Card(newCardPopup.inputName.value, newCardPopup.inputLink.value, '#element', {
          handleCardClick: () => {
            const image = new PopupWithImage('.popup_image');
            image.open(card._name,card._link);
          }
        });
        const cardElement = card.generateCard();
        cardList.setItem(cardElement);
        newCardPopup.inputName.value = ''; 
        newCardPopup.inputLink.value = '';
        newCardPopup.close();
      });
    }
  });
  newCardPopup.open();
});

buttonEdit.addEventListener('click', () => {
  const newNamePopup = new PopupWithForm('.popup_profile', {
    renderer: () => {
      const validNameForm = new FormValidator(configValid, nameForm);
      const userInfo = new UserInfo({
        nameSelector: '.profile__name',
        professionSelector: '.profile__profession' 
      });
      validNameForm.enableValidation();
      newNamePopup._getInputValues();
      newNamePopup.inputName.value = userInfo.getUserInfo().userName;
      newNamePopup.inputLink.value = userInfo.getUserInfo().userProfession;
      nameForm.addEventListener('submit', () => {
        userInfo.setUserInfo(newNamePopup.inputName.value, newNamePopup.inputLink.value);
        validNameForm.toggleButtonState();
        newNamePopup.close()
      })
    }
  });
  newNamePopup.open();
});

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section }  from "../components/Section.js";
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage }  from "../components/PopupWithImage.js";
import { initialCards, cardForm, configValid, nameForm, buttonEdit, buttonAdd,} from '../utils/constants.js'
import { UserInfo } from "../components/UserInfo.js";
import '../pages/index.css';

