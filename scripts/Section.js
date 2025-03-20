export default class Section {
  constructor({ items, renderer }, galleryContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(galleryContainer);
  }

  // _crear() {
  //   this._renderedItems.forEach((carta) => {
  //     this.renderer(carta, this._templateCard());
  //   });
  // }

  // _templateCard() {
  //   const cardElement = document
  //     .querySelector(".template__card")
  //     .content.querySelector(".gallery__card")
  //     .cloneNode(true);

  //   return cardElement;
  // }

  // renderItems() {
  //   this._items.forEach((item) => this._renderer(item));
  // }

  renderItems(items) {
    this._items.forEach((item) => this._renderer(item));
  }

  addItems(element) {
    this._container.prepend(element);
  }
}
