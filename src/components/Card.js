export class Card {
    constructor(name, link, template, { handleCardClick }) {
      this._name = name;
      this._link = link;
      this._template = document.querySelector(template).content;
      this._handleCardClick = handleCardClick;
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

      this._element.querySelector('.element__title').textContent = this._name;

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
  
    _likeCard() {
      this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }
  
    _openImagePopup() {
      this._handleCardClick();
    }
  
    _deleteCard() {
      this._element.remove(); 
      this._element = null;
    }
}