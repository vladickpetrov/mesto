import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section }  from "../components/Section.js";
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage }  from "../components/PopupWithImage.js";
import { PopupSure } from "../components/PopupSure.js";
import { 
  avatarForm, 
  cardForm, 
  configValid, 
  nameForm, 
  buttonEdit, 
  buttonAdd, 
  buttonEditAvatar
} from '../utils/constants.js'
import { UserInfo } from "../components/UserInfo.js";
import { Api } from '../components/Api.js';
import '../pages/index.css';

export let myId;
const currentId = {};
let cardList = null;

function createCard(name, link, likes, ownId, id, myId) {
  const card = new Card(name, link, '#element', likes, ownId, id, myId, {
    handleCardClick: () => {
      image.open(name, link)
    },
    handleDeleteClick: () => {
      currentId.id = id;
      newSurePopup.open()
    },
    handleLikeClick: () => {
      let check = card._element.querySelector('.element__like-button_active');
        if (check) {
          api.deleteLike(id)
                .then((res) => {
                    console.log('лайк убран');
                    card.checkLikes(res);
                })
                .catch(err => {
                  console.log(err);
                })
        } else {
          api.putLike(id)
                .then((res) => {
                    console.log('лайк поставлен');
                    card.checkLikes(res);
                })
                .catch(err => {
                  console.log(err);
                })
        }
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
  }
});

api.getUserInfo()
  .then(nameInfo => {
    console.log('Информация о пользователе загружена');
    userInfo.setUserInfo(nameInfo.name, nameInfo.about);
    myId = nameInfo._id;
    userInfo.setUserAvatar(nameInfo.avatar);
  })
    .catch(err => {
      console.log(err);
    });

api.getAllPictures()
  .then(cardsInfo => {
    console.log('Информация о карточках загружена');
    cardList = new Section({
      data: cardsInfo,
      renderer: (item) => {
        cardList.setItemToEnd(createCard(item.name, item.link, item.likes, item.owner._id, item._id, myId));
        }
      }, '.element__grid');
    cardList.renderItems();;
  })
  .catch(err => {
    console.log(err);
  });

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
  professionSelector: '.profile__profession',
  avatarSelector: '.profile__avatar-picture'
});

export const newCardPopup = new PopupWithForm('.popup_add-card', {
  renderer: (formInputs) => {
    newCardPopup.changeButtonStatus('Сохранение...');
    api.sendPicture(formInputs.string1, formInputs.string2)
      .then((res) => {
      cardList.setItemToStart(createCard(formInputs.string1, formInputs.string2, res.likes, res.owner._id, res._id, myId));
      newCardPopup.close();
      })
     .catch(err => {
      console.log(err);
      })
    .finally(() => {
      newCardPopup.changeButtonStatus('');
    })
  }
});
newCardPopup.setEventListeners();

export const newNamePopup = new PopupWithForm('.popup_profile', {
  renderer: (formInputs) => {
    newNamePopup.changeButtonStatus('Сохранение...')
    userInfo.setUserInfo(formInputs.string1, formInputs.string2);
    api.sendUserInfo(formInputs.string1, formInputs.string2)
      .then(() => {
        newNamePopup.close();
        console.log('Данные о пользователе отправлены')
        const pageInfo = userInfo.getUserInfo();
        newNamePopup.inputs[0].value = pageInfo.userName;
        newNamePopup.inputs[1].value = pageInfo.userProfession;
      })
      .catch(err => {
        console.log(err);
        })
      .finally(() => {
        newNamePopup.changeButtonStatus('');
      })  
  }
});
newNamePopup.setEventListeners();

export const newAvatarPopup = new PopupWithForm('.popup_avatar', {
  renderer: (formInputs) => {
    newAvatarPopup.changeButtonStatus('Сохранение...');
    api.sendAvatarPicture(formInputs.string1)
      .then(() => {
      userInfo.setUserAvatar(formInputs.string1);
      console.log('Аватар успешно загружен');
      newAvatarPopup.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        newAvatarPopup.changeButtonStatus('');
      })
  }
});
newAvatarPopup.setEventListeners();

const newSurePopup = new PopupSure('.popup_sure', currentId, {
  renderer: (id) => {
    console.log(id);
    api.deleteCard(id)
      .then(res => {

      })
      .catch(err => {

      });
  }
});
newSurePopup.setEventListeners();

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