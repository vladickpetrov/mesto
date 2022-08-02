export class PopupWithForm extends Popup {
  constructor(popupSelector, { renderer }){
      super(popupSelector);
      this._renderer = renderer;
  }

  _getInputValues() {
    this.inputName = this._popup.querySelector('.popup__name');
    this.inputLink = this._popup.querySelector('.popup__profession');
  }

  setEventListeners() {
      super.setEventListeners();
      this._renderer();
  }

  close() {
    super.close();
    this._popup = null;
  }
}

import { Popup } from '../components/Popup'