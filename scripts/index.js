const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popUp = document.querySelector('.popup');
const likeButton = document.querySelector('.element__like-button');
const userNameOnPage = document.querySelector('.profile__name');
const userProfessionOnPage = document.querySelector('.profile__profession');
const userNameOnForm = document.querySelector('.popup__name');
const userProfessionOnForm = document.querySelector('.popup__profession');
const form = document.querySelector('.popup__form');

function openPopup() {
    popUp.classList.add('popup_opened');
    userNameOnForm.value = userNameOnPage.textContent;
    userProfessionOnForm.value = userProfessionOnPage.textContent
}

function closePopup() {
    popUp.classList.remove('popup_opened');
} 

function formSubmitHandler(evt) {
    evt.preventDefault();
    userNameOnPage.textContent = userNameOnForm.value;
    userProfessionOnPage.textContent = userProfessionOnForm.value;
    closePopup();
}

function checkEmptyForm() {
    if (userNameOnForm.value == 0) {
        userNameOnForm.style.borderBottom = red;
    } else {
        formSubmitHandler(evt);
    }
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', checkEmptyForm);