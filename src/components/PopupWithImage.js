export class PopupWithImage extends Popup {
    open(name, link) {
        super.open();
        imagePopUpTitle.textContent = name;
        imagePopupPicture.src = link;
        imagePopupPicture.alt = name;
      }
  }

import { Popup } from '../components/Popup'
import { imagePopUpTitle, imagePopupPicture } from '../utils/constants.js'