import { Popup } from '../components/Popup'
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._image = document.querySelector('.popup__image');
      this._imageTitile = document.querySelector('.popup__image-title');
    }

    open(name, link) {
        this._imageTitile.textContent = name;
        this._image.src = link;
        this._image.alt = name;
        super.open();
      }
  }