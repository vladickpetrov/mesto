const cardTamplate = document.querySelector('#element').content;

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const imagePopUp = document.querySelector('.popup_image');
const imagePopUpTitle = imagePopUp.querySelector('.popup__image-title');
const imagePopupPicture = imagePopUp.querySelector('.popup__image');

const namePopUp = document.querySelector('.popup_profile');
const cardPopUp = document.querySelector('.popup_add-card');

const buttonCloseImage = imagePopUp.querySelector('.popup__close-button');
const buttonCloseName = namePopUp.querySelector('.popup__close-button');
const buttonCloseCard = cardPopUp.querySelector('.popup__close-button');

const userNameOnPage = document.querySelector('.profile__name');
const userProfessionOnPage = document.querySelector('.profile__profession');
const allElements = document.querySelector('.element__grid');

const nameForm = namePopUp.querySelector('.popup__form');
const nameProfileForm = namePopUp.querySelector('.popup__name');
const professionProfileForm = namePopUp.querySelector('.popup__profession');

const cardForm = cardPopUp.querySelector('.popup__form');
const nameCardForm = cardPopUp.querySelector('.popup__name');
const linkCardForm = cardPopUp.querySelector('.popup__profession');

function createCard(name, link) {
  const cardElement = cardTamplate.querySelector('.element__item').cloneNode(true);

  const deleteButton = cardElement.querySelector('.element__delete-button');
  const likeButton = cardElement.querySelector('.element__like-button');
  const imageButton = cardElement.querySelector('.element__photo')

  cardElement.querySelector('.element__photo').src = link;
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__photo').alt = name;

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
  imagePopUpTitle.textContent = name;
  imagePopupPicture.src = link;
  imagePopupPicture.alt = name;
  openPopup(imagePopUp);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPicturePopup() {
  openPopup(cardPopUp);
}

function openNamePopup() {
  openPopup(namePopUp);

  nameProfileForm.value = userNameOnPage.textContent;
  professionProfileForm.value = userProfessionOnPage.textContent;
}

function formSubmitHandlerName(evt) {
  evt.preventDefault();

  userNameOnPage.textContent = nameProfileForm.value;
  userProfessionOnPage.textContent = professionProfileForm.value;
  closePopup(namePopUp);
  nameProfileForm.value = '';
  professionProfileForm.value = '';
}

function formSubmitHandlerPicture(evt) {
    evt.preventDefault();

    allElements.prepend(createCard(nameCardForm.value, linkCardForm.value));
    linkCardForm.value = '';
    nameCardForm.value = '';
    closePopup(cardPopUp);
  }

addStartItemAction();

buttonAdd.addEventListener('click', openPicturePopup);
buttonEdit.addEventListener('click', openNamePopup);

nameForm.addEventListener('submit', formSubmitHandlerName);
cardForm.addEventListener('submit', formSubmitHandlerPicture);

buttonCloseImage.addEventListener('click', function () {
  closePopup(imagePopUp);
});

buttonCloseName.addEventListener('click', function () {
  closePopup(namePopUp);
});

buttonCloseCard.addEventListener('click', function () {
  closePopup(cardPopUp);
  nameCardForm.value = '';
  linkCardForm.value = '';
});

