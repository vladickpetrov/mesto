export class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
  
    setItem(elem) {
      this._container.prepend(elem);
    }
  
    renderItems() {
        this._clear();
  
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
  
    _clear() {
        this._container.innerHTML = '';
    }
  }
  