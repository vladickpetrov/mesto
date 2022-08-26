import { Popup } from '../components/Popup';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { renderer }){
      super(popupSelector);
      this._renderer = renderer;
      this._form = this._popup.querySelector('.popup__form');
      this.inputs = this._popup.querySelectorAll('.popup__input');
      this._button = this._form.querySelector('.popup__save-button');
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

  changeButtonStatus(str) {
    this._button.textContent = str;
  }

  close() {
    super.close();
    this.inputs.forEach(item => {
      item.value = '';
    })
  }
}