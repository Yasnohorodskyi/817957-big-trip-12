import {createElement} from "../utils.js";

const createEventBoardTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class EventBoard {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventBoardTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
