const cardTamplate = document.querySelector('#element').content;

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
const cardSaveButton = cardPopUp.querySelector('.popup__save-button');

function createCard(name, link) {
  const cardElement = cardTamplate.querySelector('.element__item').cloneNode(true);

  const deleteButton = cardElement.querySelector('.element__delete-button');
  const likeButton = cardElement.querySelector('.element__like-button');
  const imageElement = cardElement.querySelector('.element__photo');

  imageElement.src = link;
  cardElement.querySelector('.element__title').textContent = name;
  imageElement.alt = name;

  deleteButton.addEventListener('click', function () {
    deleteCard(cardElement);
  }); 
  likeButton.addEventListener('click', function () {
    likeCard(likeButton);
  });
  imageElement.addEventListener('click', function () {
    openImagePopup(name, link);
  });

  return cardElement
 }

function closeWithEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
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

  allElements.prepend(createCard(nameCardForm.value, linkCardForm.value));
  closePopup(cardPopUp);
  cardSaveButton.classList.add('popup__save-button_disabled');
  cardSaveButton.setAttribute('disabled', true);
}

addStartItemAction();

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
