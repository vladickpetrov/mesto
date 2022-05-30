const cardTamplate = document.querySelector('#element').content;

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popUp = document.querySelector('.popup');

const userNameOnPage = document.querySelector('.profile__name');
const userProfessionOnPage = document.querySelector('.profile__profession');
const allElements = document.querySelector('.element__grid');

const closePopupButton = popUp.querySelector('.popup__close-button');

const imagePopup = document.querySelector('.popup__full-image');
const closeImageButton = imagePopup.querySelector('.popup__close-button');

let imagePopupTitle = document.querySelector('.popup__picture-title');
let imagePopupImage = document.querySelector('.popup__image');

const linkOnForm = popUp.querySelector('.popup__profession');
const nameOnForm = popUp.querySelector('.popup__name');
const form = popUp.querySelector('.popup__form');

const popUpTitle = popUp.querySelector('.popup__title');

function createCard(name, link) {
  const cardElement = cardTamplate.querySelector('.element__item').cloneNode(true);

  cardElement.querySelector('.element__photo').src = link;
  cardElement.querySelector('.element__title').textContent = name;

  const deleteButton = cardElement.querySelector('.element__delete-button');
  const likeButton = cardElement.querySelector('.element__like-button');
  const imageButton = cardElement.querySelector('.element__photo')

  deleteButton.addEventListener('click', function () {
    deleteCard(cardElement);
  }); 
  likeButton.addEventListener('click', function () {
    likeCard(likeButton);
  });
  imageButton.addEventListener('click', function () {
    openImagePopup(name, link);
  });

  return cardElement
 } 

function deleteCard(card) {
  card.remove(); 
}

function likeCard(like) {
  like.classList.toggle('element__like-button_active');
}

function addStartItemAction() { 
  initialCards.forEach(item => { 
    allElements.prepend(createCard(item.name, item.link))
  }); 
} 

function openImagePopup(name, link) {
  imagePopupTitle.textContent = name;
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  openPopup(imagePopup);

  closeImageButton.addEventListener('click', function () {
    closePopup(imagePopup);
  }); 
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPicturePopup() {
  openPopup(popUp);

  const pictureForm = popUp.querySelector('.popup__form');

  popUp.querySelector('.popup__title').textContent = 'Новое место';
  nameOnForm.placeholder = 'Название'
  linkOnForm.placeholder = 'Ссылка на картинку'

  pictureForm.addEventListener('submit', formSubmitHandlerPicture);
}

function openNamePopup() {
  openPopup(popUp);

  popUp.querySelector('.popup__title').textContent = 'Редактировать профиль';
  nameOnForm.placeholder = 'Введите имя';
  linkOnForm.placeholder = 'Введите название профессии';
  nameOnForm.value = userNameOnPage.textContent
  linkOnForm.value = userProfessionOnPage.textContent

  form.addEventListener('submit', formSubmitHandlerName);
}

function formSubmitHandlerName(evt) {
  evt.preventDefault();

  const nameForm = popUp.querySelector('.popup__form');

  userNameOnPage.textContent = nameOnForm.value;
  userProfessionOnPage.textContent = linkOnForm.value;
  closePopup(popUp);
  linkOnForm.value = '';
  nameOnForm.value = '';
  nameForm.removeEventListener('submit', formSubmitHandlerName);
}

function formSubmitHandlerPicture(evt) {
    evt.preventDefault();

    const pictureForm = popUp.querySelector('.popup__form');

    initialCardsArray.push({name: nameOnForm.value, link: linkOnForm.value});
    if ((nameOnForm.value === '') || (linkOnForm.value === '')) {
        closePopup(popUp);
        return
    }
    console.log(initialCardsArray);
    allElements.prepend(createCard(initialCardsArray[initialCardsArray.length - 1].name, initialCardsArray[initialCardsArray.length - 1].link));
    linkOnForm.value = '';
    nameOnForm.value = '';
    closePopup(popUp);
    pictureForm.removeEventListener('submit', formSubmitHandlerPicture);
  }

addStartItemAction();

addButton.addEventListener('click', openPicturePopup);
editButton.addEventListener('click', openNamePopup);
closePopupButton.addEventListener('click', function () {
    closePopup(popUp);
  });

closePopupButton.addEventListener('click', function () {
  closePopup(imagePopup);
});


