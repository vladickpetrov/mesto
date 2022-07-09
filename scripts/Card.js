export class Card {
    constructor(name, link, template) {
      this._name = name;
      this._link = link;
      this._template = document.querySelector(template).content;;
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
  
      this._element.querySelector('.element__photo').src = this._link;
      this._element.querySelector('.element__title').textContent = this._name;
  
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
      imagePopUpTitle.textContent = this._name;
      imagePopupPicture.src = this._link;
      imagePopupPicture.alt = this._name;
      openPopup(imagePopUp);
    }
  
    _deleteCard() {
      this._element.remove(); 
    }
  }

  import { imagePopUp, imagePopupPicture, imagePopUpTitle, openPopup} from "./index.js";