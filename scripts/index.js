const cardTamplate = document.querySelector('#element').content;
const popUpTamplate = document.querySelector('#popup').content;
const imagePopUpTamplate = document.querySelector('#popup__full-image').content;

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const userNameOnPage = document.querySelector('.profile__name');
const userProfessionOnPage = document.querySelector('.profile__profession');
const allElements = document.querySelector('.element__grid');
const footer = document.querySelector('.footer');

let pictureName;
let pictureLink;

let allCards;

function checkStartCards() {
  allCards = document.querySelectorAll('.element__item')
}

function addStartItemAction() {
  allCards.forEach(item => {
    const card = item;
    const deleteButton = card.querySelector('.element__delete-button');
    const likeButton = card.querySelector('.element__like-button');
    const imageButton = card.querySelector('.element__photo')

    function cardRemove() {
      card.classList.remove('popup_opened'); 
      card.remove(); 
    };

    function changeLike() {
      likeButton.classList.toggle('element__like-button_active');
    }

    function openImagePopUp() {
      const imagePopUp = imagePopUpTamplate.querySelector('.popup__full-image').cloneNode(true);

      footer.after(imagePopUp);
      imagePopUp.classList.add('openning-animation');


      const closeImageButton = imagePopUp.querySelector('.popup__close-button');

      imagePopUp.querySelector('.popup__picture-title').textContent = card.querySelector('.element__title').textContent;
      imagePopUp.querySelector('.popup__image').src = card.querySelector('.element__photo').src;

      function closeImagePopUp() {
        imagePopUp.classList.remove('openning-animation');
        imagePopUp.classList.add('closing-animation');
        imagePopUp.classList.add('popup_hidden');
        setTimeout(function () {
            imagePopUp.remove();
          }, 1000);
      }

      closeImageButton.addEventListener('click', closeImagePopUp);
    }

    likeButton.addEventListener('click', changeLike); 
    deleteButton.addEventListener('click', cardRemove);    
    imageButton.addEventListener('click', openImagePopUp);
  });
}

function addNewCard() {
  const cardElement = cardTamplate.querySelector('.element__item').cloneNode(true);
  cardElement.querySelector('.element__photo').src = pictureLink;
  cardElement.querySelector('.element__title').textContent = pictureName;
  allElements.prepend(cardElement);

  const deleteButton = cardElement.querySelector('.element__delete-button');
  const likeButton = cardElement.querySelector('.element__like-button');
  const imageButton = cardElement.querySelector('.element__photo')

  function cardRemove() {
    cardElement.remove();
  };
  
  function changeLike() {
    likeButton.classList.toggle('element__like-button_active');
  }

  function openImagePopUp() {
    const imagePopUp = imagePopUpTamplate.querySelector('.popup__full-image').cloneNode(true);
    const closeImageButton = imagePopUp.querySelector('.popup__close-button');

    imagePopUp.querySelector('.popup__picture-title').textContent = cardElement.querySelector('.element__title').textContent;
    imagePopUp.querySelector('.popup__image').src = cardElement.querySelector('.element__photo').src;
    footer.after(imagePopUp);
    imagePopUp.classList.add('openning-animation');

    function closeImagePopUp() {
      imagePopUp.classList.remove('openning-animation');
      imagePopUp.classList.add('closing-animation');
      imagePopUp.classList.add('popup_hidden');
      setTimeout(function () {
          imagePopUp.remove();
        }, 1000);
    }

    closeImageButton.addEventListener('click', closeImagePopUp);
  }

  deleteButton.addEventListener('click', cardRemove);
  likeButton.addEventListener('click', changeLike);    
  imageButton.addEventListener('click', openImagePopUp);
}

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

// add cards and make them functional

function addInitialCards() {
  for (let i = 0; i < initialCards.length; i++) {
      const cardElement = cardTamplate.querySelector('.element__item').cloneNode(true);
      cardElement.querySelector('.element__photo').src = initialCards[i].link;
      cardElement.querySelector('.element__title').textContent = initialCards[i].name;
      allElements.append(cardElement);
  }
  checkStartCards();
  addStartItemAction();
}

function controlNamePopup() {
    // fill information in the popup
    const popUpName = popUpTamplate.querySelector('.popup').cloneNode(true);
    const closeButtonName = popUpName.querySelector('.popup__close-button');
    const nameForm = popUpName.querySelector('.popup__form');
    const userProfessionOnForm = popUpName.querySelector('.popup__profession');
    const userNameOnForm = popUpName.querySelector('.popup__name');

    popUpName.querySelector('.popup__title').textContent = 'Редактировать профиль';
    userNameOnForm.placeholder = 'Введите имя'
    userProfessionOnForm.placeholder = 'Введите название профессии'
    userNameOnForm.value = userNameOnPage.textContent;
    userProfessionOnForm.value = userProfessionOnPage.textContent
    //show popup 
    footer.after(popUpName);
    popUpName.classList.add('openning-animation');

    function closePopupName() {
      popUpName.classList.remove('openning-animation');
      popUpName.classList.add('closing-animation');
      popUpName.classList.add('popup_hidden');
      setTimeout(function () {
        popUpName.remove();
      }, 1000);
  } 

  function formSubmitHandlerName(evt) {
    evt.preventDefault();
    userNameOnPage.textContent = userNameOnForm.value;
    userProfessionOnPage.textContent = userProfessionOnForm.value;
    closePopupName();
  }

  closeButtonName.addEventListener('click', closePopupName);
  nameForm.addEventListener('submit', formSubmitHandlerName);
}

function controlPicturePopup() {
  const popUpPicture = popUpTamplate.querySelector('.popup').cloneNode(true);
  const closeButtonPicture = popUpPicture.querySelector('.popup__close-button');
  const pictureForm = popUpPicture.querySelector('.popup__form');
  const pictureLinkOnForm = popUpPicture.querySelector('.popup__profession');
  const pictureNameOnForm = popUpPicture.querySelector('.popup__name');

  footer.after(popUpPicture);
  popUpPicture.classList.add('openning-animation');

  popUpPicture.querySelector('.popup__title').textContent = 'Новое место';
  pictureNameOnForm.placeholder = 'Название'
  pictureLinkOnForm.placeholder = 'Ссылка на картинку'

  function formSubmitHandlerPicture(evt) {
    evt.preventDefault();
    pictureName = pictureNameOnForm.value;
    pictureLink = pictureLinkOnForm.value;
    if ((pictureName === '') || (pictureLink === '')) {
        closePopupPicture();
        return
    }
    addNewCard();
    pictureNameOnForm.value = '';
    pictureLinkOnForm.value = '';
    closePopupPicture();
  }
  
  function closePopupPicture() {
      popUpPicture.classList.remove('openning-animation');
      popUpPicture.classList.add('closing-animation');
      popUpPicture.classList.add('popup_hidden');
      setTimeout(function () {
        popUpPicture.remove();
      }, 1000);
  } 

  closeButtonPicture.addEventListener('click', closePopupPicture);
  pictureForm.addEventListener('submit', formSubmitHandlerPicture);
}

addInitialCards();

addButton.addEventListener('click', controlPicturePopup);
editButton.addEventListener('click', controlNamePopup);



