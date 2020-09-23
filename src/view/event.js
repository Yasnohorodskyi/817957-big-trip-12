import {EVENT_TYPES_IN_POINT} from "../const.js";
import {humanizeTime, getEventDuration} from "../utils/date.js";
import {getUpCasePhrase} from "../utils/common.js";
import AbstractView from "./abstract.js";

const createOffersEventTemplate = (offers) => {

  let counter = 0;
  offers.forEach((offer) => offer.isChecked ? counter++ : counter);
  if (counter === 0) {
    return ``;
  }

  const offersList = offers.filter((offer) => offer.isChecked);
  let offersVisibleList = [];

  if (offersList.length > 3) {
    offersVisibleList = offersList.slice(0, 2);
  } else {
    offersVisibleList = offersList.slice();
  }

  return (`<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offersVisibleList.map((offer) => offer.isChecked ?
      `<li class="event__offer">
            <span class="event__offer-title">${offer.title.length < 17 ? offer.title : offer.title.slice(0, 16)}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </li>` : ``).join(``)}
     </ul>`);
};

const createEventTemplate = (event, offersMap) => {
  const {typeEvent, destination, price, date} = event;
  const action = EVENT_TYPES_IN_POINT.includes(typeEvent) ? `in` : `to`;
  const startTime = humanizeTime(date.startEvent);
  const endTime = humanizeTime(date.endEvent);
  const eventDuration = getEventDuration(date.startEvent, date.endEvent);
  const offers = offersMap.get(typeEvent);
  const offersEventTemplate = createOffersEventTemplate(offers);
  const typeEventUp = getUpCasePhrase(typeEvent);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${typeEvent}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${typeEventUp} ${action} ${destination}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${endTime}</time>
        </p>
        <p class="event__duration">${eventDuration}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      ${offersEventTemplate}
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};

export default class Event extends AbstractView {
  constructor(event, offersMap) {
    super();
    this._event = event;
    this._offersMap = offersMap;
    this._eventClickHandler = this._eventClickHandler.bind(this);
  }

  getTemplate() {
    return createEventTemplate(this._event, this._offersMap);
  }

  _eventClickHandler(evt) {
    evt.preventDefault();
    this._callback.eventClick();
  }

  setEventClickHandler(callback) {
    this._callback.eventClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._eventClickHandler);
  }
}
