import { Popup } from '../components/Popup';

export class PopupSure extends Popup {
  constructor(popupSelector, { renderer }, ){
      super(popupSelector);
      this._renderer = renderer;
      this._button = this._popup.querySelector('.popup__save-button');
  }

  open(cardElem) {
    super.open()
    this.cardElement = cardElem;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => {
      this._renderer(this.cardElement);
    })
  }
}