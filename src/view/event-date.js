import AbstractView from "./abstract.js";

const getEventsByDateList = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export default class EventsListByDate extends AbstractView {
  getTemplate() {
    return getEventsByDateList();
  }
}
