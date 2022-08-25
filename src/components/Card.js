import { myId } from '../pages/index.js'

export class Card {
    constructor(name, link, template, likes, ownId, id, { handleCardClick, handleDeleteClick, handleLikeClick }) {
      this._name = name;
      this._link = link;
      this._template = document.querySelector(template).content;
      this._handleCardClick = handleCardClick;
      this._handleDeleteClick = handleDeleteClick;
      this._handleLikeClick = handleLikeClick
      this._likes = likes;
      this._ownId = ownId;
      this.id = id;
    }
  
    _getTemplate() {
      const cardElement = this._template
      .querySelector('.element__item')
      .cloneNode(true); 
  
      return cardElement
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();

      if (this._ownId !== myId) {
        this._element.querySelector('.element__delete-button').remove();
      }

      this._element.querySelector('.element__title').textContent = this._name;

      this._checkLikes();

      this._image = this._element.querySelector('.element__photo');
      this._image.src = this._link;
      this._image.alt = this._name;

  
      return this._element
    }
    
    _setEventListeners() {
      this._element.querySelector('.element__delete-button').addEventListener('click', () => {
        this._deleteCard();
      }); 
      this._element.querySelector('.element__like-button').addEventListener('click', () => {
        this._likeCard();
      });
      this._element.querySelector('.element__photo').addEventListener('click', () => {
        this._openImagePopup();
      });
    }

    _checkLikes() {
      this._element.querySelector('.element__like-counter').textContent = this._likes.length;
      let check = this._likes.find(item => item._id == myId);
        if (check) {
          this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
          check = null;
        } else {
          this._element.querySelector('.element__like-button').classList.remove('element__like-button_active');
          check = null;
        }
    }
  
    _likeCard() {
      this._handleLikeClick(this.id);
    }
  
    _openImagePopup() {
      this._handleCardClick();
    }
  
    _deleteCard() {
      this._handleDeleteClick();
    }
}