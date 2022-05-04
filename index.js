let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popUp = document.querySelector('.popup');
let likeButton = document.querySelector('.element__like-button');
let userNameOnPage = document.querySelector('.profile__name');
let userProfessionOnPage = document.querySelector('.profile__profession');
let userNameOnForm = document.querySelector('.popup__name');
let userProfessionOnForm = document.querySelector('.popup__profession');
let form = document.querySelector('.popup__form');

function changeWindow() {
    popUp.classList.toggle('popup_opened');
    userNameOnForm.value = userNameOnPage.textContent;
    userProfessionOnForm.value = userProfessionOnPage.textContent
} 

function setLike() {
    likeButton.classList.toggle('element__like-button_active');
} 

function saveChanges(evt) {
    evt.preventDefault();
    userNameOnPage.textContent = userNameOnForm.value;
    userProfessionOnPage.textContent = userProfessionOnForm.value;
    changeWindow();
    console.log(userNameOnPage.textContent);
}

editButton.addEventListener('click', changeWindow);
closeButton.addEventListener('click', changeWindow);
likeButton.addEventListener('click', setLike);
form.addEventListener('submit', saveChanges);