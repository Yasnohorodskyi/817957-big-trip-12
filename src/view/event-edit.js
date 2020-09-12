import {EVENT_TYPES_IN_POINT, EVENT_TYPES_TO_POINT, CITIES, EMPTY_EVENT} from "../const.js";
import {getUpCasePhrase, createElement} from "../utils.js";
import {humanizeTime, humanizeDate} from "../date.js";

const EVENT_GROUP_TO_NAME = `Transfer`;
const EVENT_GROUP_IN_NAME = `Activity`;

const createEventTypeListTemplate = (eventTypeLyst, groupType, eventCounter) => {
  return `<legend class="visually-hidden">${groupType}</legend>
    ${eventTypeLyst.map((eventType) =>
    `<div class="event__type-item">
     <input id="event-type-${eventType}-${eventCounter}" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${eventType}>
     <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-${eventCounter}">${getUpCasePhrase(eventType)}</label>
     </div>`).join(``)}`;
};

const createCityListTemplate = (cityList) => {
  return cityList.map((city) => `<option value="${city}"></option>`).join(``);
};

const createPhotosListTemplate = (photosList) => {
  return photosList.map((photos) => `<img class="event__photo" src="${photos}" alt="Event photo"></img>`).join(``);
};

const createOffersEventTemplate = (offers, eventCounter) => {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offers.map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.name}-${eventCounter}" type="checkbox" name="event-offer-${offer.name}" ${offer.isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${offer.name}-${eventCounter}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join(``)}

      </div>
    </section>`
  );
};

const createEventEditTemplate = (event = EMPTY_EVENT, offersMap) => {
  const {typeEvent, destination, description, photos, price, date, eventCounter} = event;

  const action = EVENT_TYPES_IN_POINT.includes(typeEvent) ? `in` : `to`;
  const startTime = humanizeTime(date.startEvent);
  const startDate = humanizeDate(date.startEvent);
  const endTime = humanizeTime(date.endEvent);
  const endDate = humanizeDate(date.endEvent);
  const eventTypeToList = createEventTypeListTemplate(EVENT_TYPES_TO_POINT, EVENT_GROUP_TO_NAME, eventCounter);
  const eventTypeInList = createEventTypeListTemplate(EVENT_TYPES_IN_POINT, EVENT_GROUP_IN_NAME, eventCounter);
  const cityList = createCityListTemplate(CITIES);
  const typeEventUp = getUpCasePhrase(typeEvent);
  const photosList = createPhotosListTemplate(photos);
  const offers = offersMap.get(typeEvent);
  const offersEventTemplate = createOffersEventTemplate(offers, eventCounter);

  const cityDescription = destination === `` ? `` :
    `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photosList}
      </div>
    </div>
  </section>`;


  return (
    `<form class="event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${eventCounter}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${typeEvent}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${eventCounter}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            ${eventTypeToList}
          </fieldset>

          <fieldset class="event__type-group">
            ${eventTypeInList}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${eventCounter}">
        ${typeEventUp} ${action}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${eventCounter}" type="text" name="event-destination" value="${destination}" list="destination-list-${eventCounter}">
        <datalist id="destination-list-${eventCounter}">
          ${cityList}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${eventCounter}">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-${eventCounter}" type="text" name="event-start-time" value="${startDate} ${startTime}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${eventCounter}">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-${eventCounter}" type="text" name="event-end-time" value="${endDate} ${endTime}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${eventCounter}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${eventCounter}" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>

      <input id="event-favorite-${eventCounter}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${event.isFavorite ? `checked` : ``}>
      <label class="event__favorite-btn" for="event-favorite-${eventCounter}">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${offersEventTemplate}
      ${cityDescription}
    </section>
  </form>`
  );
};

export default class EventEdit {
  constructor(event, offersMap) {
    this._event = event;
    this._offersMap = offersMap;

    this._element = null;
  }

  getTemplate() {
    return createEventEditTemplate(this._event, this._offersMap);
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
