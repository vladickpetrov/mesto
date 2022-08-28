export class Card {
    constructor(name, link, template, likes, ownId, id, myId, { handleCardClick, handleDeleteClick, handleLikeClick }) {
      this._name = name;
      this._link = link;
      this._template = document.querySelector(template).content;
      this._handleCardClick = handleCardClick;
      this._handleDeleteClick = handleDeleteClick;
      this._handleLikeClick = handleLikeClick
      this._likes = likes;
      this._ownId = ownId;
      this.id = id;
      this._userId = myId;
    }
  
    _getTemplate() {
      const cardElement = this._template
      .querySelector('.element__item')
      .cloneNode(true); 
  
      return cardElement
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._likeButton = this._element.querySelector('.element__like-button');
      this._likeCounter = this._element.querySelector('.element__like-counter');

      this._setEventListeners();

      if (this._ownId !== this._userId) {
        this._element.querySelector('.element__delete-button').remove();
      }

      this._element.querySelector('.element__title').textContent = this._name;

      this._checkLikesAtStart();

      this._image = this._element.querySelector('.element__photo');
      this._image.src = this._link;
      this._image.alt = this._name;

  
      return this._element
    }
    
    _setEventListeners() {
      this._element.querySelector('.element__delete-button').addEventListener('click', () => {
        this._deleteCard();
      }); 
      this._likeButton.addEventListener('click', () => {
        this._likeCard();
      });
      this._element.querySelector('.element__photo').addEventListener('click', () => {
        this._openImagePopup();
      });
    }

    _checkLikesAtStart() {
      const check = this._likes.find(item => item._id == this._userId);
        if (check) {
          this._likeButton.classList.add('element__like-button_active');
        } else {
          this._likeButton.classList.remove('element__like-button_active');
        }
        this._likeCounter.textContent = this._likes.length;
    }

    checkLikes(res) {
      if (this._likeButton.className.includes('element__like-button_active')) {
        this._likeButton.classList.remove('element__like-button_active');
      } else {
        this._likeButton.classList.add('element__like-button_active');
      }
      this._likeCounter.textContent = res.likes.length;
    }
  
    _likeCard() {
      this._handleLikeClick();
    }
  
    _openImagePopup() {
      this._handleCardClick();
    }
  
    _deleteCard() {
      this._handleDeleteClick(this.id);
    }
}