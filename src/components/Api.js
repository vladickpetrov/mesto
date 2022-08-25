import { avatarButton,
    nameButton,
    cardButton } from '../utils/constants.js'

import { newNamePopup,
    newCardPopup,
    newAvatarPopup } from '../pages/index.js'

export class Api {
    constructor(options) {
        this.link = options.baseUrl;
        this.headers = options.headers;
        this.fullHandler = options.fullHandler;
        this.cardsHandler = options.cardsHandler;
    }

    setUserInfo() {
        return fetch(`${this.link}/users/me`, {
            method: "GET",
            headers: this.headers,
        })
            .then(response => response.json())
            .then(userInfo => {
                console.log('Информация о пользователе загружена');
                this.fullHandler(userInfo)})
    }

    setAllPictures() {
        return fetch(`${this.link}/cards`, {
            method: "GET",
            headers: this.headers,
        })
            .then(response => response.json())
            .then(cardsInfo => {
                console.log('Информация о карточках загружена');
                this.cardsHandler(cardsInfo);
            })
    }

    sendUserInfo(name, prof) {
        nameButton.classList.add('popup__save-button_loading');
        return fetch(`${this.link}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: prof
            })
        })
            .then(result => result.json())
            .then(() => {
                newNamePopup.close();
                console.log('Данные о пользователе отправлены')
                nameButton.classList.remove('popup__save-button_loading');
            })
    }

    sendPicture(name, link) {
        cardButton.classList.add('popup__save-button_loading');
        return fetch(`${this.link}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(response => {
                response.json();
            })
            .then(() => {
                newCardPopup.close();
                cardButton.classList.remove('popup__save-button_loading');
                this.setAllPictures();
            })
    }

    sendAvatarPicture(link) {
        avatarButton.classList.add('popup__save-button_loading');
        return fetch(`${this.link}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(response => response.json())
            .then(() => {
                newAvatarPopup.close();
                console.log('Аватар успешно загружен');
                avatarButton.classList.remove('popup__save-button_loading');
            })
    }

    deleteCard(cardId) {
        return fetch(`${this.link}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        })
            .then(response => response.json())
            .then((results) => {
                console.log(results);
                this.setAllPictures();
            })
    }

    handleLike(cardId, card) {
        let check = card.querySelector('.element__like-button_active');
        if (check) {
            return fetch(`${this.link}/cards/${cardId}/likes`, {
                method: "DELETE",
                headers: this.headers,
            })
                .then(response => response.json())
                .then((result) => {
                    console.log('лайк убран');
                    card.querySelector('.element__like-button').classList.remove('element__like-button_active');
                    card.querySelector('.element__like-counter').textContent = result.likes.length;
                })
        } else {
            return fetch(`${this.link}/cards/${cardId}/likes`, {
                method: "PUT",
                headers: this.headers,
            })
                .then(response => response.json())
                .then((result) => {
                    console.log('лайк поставлен');
                    card.querySelector('.element__like-button').classList.add('element__like-button_active');
                    card.querySelector('.element__like-counter').textContent = result.likes.length;
                })
        }
    }

}

