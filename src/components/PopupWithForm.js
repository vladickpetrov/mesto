import { Popup } from '../components/Popup';
import { currentId } from '../pages/index.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { renderer }){
      super(popupSelector);
      this._renderer = renderer;
      this._form = this._popup.querySelector('.popup__form');
      this.inputs = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const formInputs = {};
    this.inputs.forEach((inputElement, id) => {
      formInputs[`string${id + 1}`] = inputElement.value;
    });
    return formInputs
  }

  setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', () => {
        this._renderer(this._getInputValues());
      })
  }

  setEventListenersSure() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._renderer(currentId)
    })
  }
}