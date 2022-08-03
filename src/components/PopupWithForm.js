import { Popup } from '../components/Popup'
export class PopupWithForm extends Popup {
  constructor(popupSelector, { renderer }){
      super(popupSelector);
      this._renderer = renderer;
  }

  _getInputValues() {
    const inputs = {};
    const inputsArray = Array.from(this._popup.querySelectorAll('.popup__input'));
    inputsArray.forEach((inputElement, id) => {
      inputs[`string${id}`] = inputElement;
    });
    console.log(inputs)
    return inputs
  }

  setEventListeners() {
      super.setEventListeners();
      this._renderer();
  }
}