import { Popup } from '../components/Popup'
export class PopupWithForm extends Popup {
  constructor(popupSelector, { renderer }){
      super(popupSelector);
      this._renderer = renderer;
      this._inputs = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const inputs = {};
    this._inputs.forEach((inputElement, id) => {
      inputs[`string${id}`] = inputElement;
    });
    return inputs
  }

  setEventListeners() {
      super.setEventListeners();
      this._renderer(this._getInputValues());
  }
}