import {humanizeDateDay} from "../utils/date.js";
import AbstractView from "./abstract.js";

const createDayTemplate = (tripDate, tripDayNumber) => {
  const dateDay = humanizeDateDay(tripDate);
  if (tripDayNumber !== 0) {
    return (
      `<li class="trip-days__item  day" data-time = "${tripDate}">
        <div class="day__info">
          <span class="day__counter">${tripDayNumber}</span>
          <time class="day__date" datetime=${tripDate}>${dateDay}</time>
        </div>
      </li>`
    );
  }
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
      </div>
    </li>`
  );
};

export default class Day extends AbstractView {
  constructor(tripDate, tripDayNumber) {
    super();
    this._tripDate = tripDate;
    this._tripDayNumber = tripDayNumber;
  }

  getTemplate() {
    return createDayTemplate(this._tripDate, this._tripDayNumber);
  }
}
