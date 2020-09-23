import AbstractView from "./abstract.js";

const createEventBoardTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class EventBoard extends AbstractView {
  getTemplate() {
    return createEventBoardTemplate();
  }
}
