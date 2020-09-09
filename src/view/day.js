import {humanizeDateDay} from "../date.js";
import {createElement} from "../utils.js";

const createDayTemplate = (tripDate, tripDayNumber) => {
  const dateDay = humanizeDateDay(tripDate);
  return (
    `<li class="trip-days__item  day" data-time = "${tripDate}">
       <div class="day__info">
         <span class="day__counter">${tripDayNumber}</span>
         <time class="day__date" datetime=${tripDate}>${dateDay}</time>
       </div>
    </li>`
  );
};

export default class Day {
  constructor(tripDate, tripDayNumber) {
    this._tripDate = tripDate;
    this._tripDayNumber = tripDayNumber;

    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._tripDate, this._tripDayNumber);
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
