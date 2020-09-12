import {getEventOffers} from "../mock/offers.js";
import {createElement} from "../utils.js";
import {EMPTY_EVENT} from "../const.js";

const getOffersPrice = (offersList) => {
  let offersPrice = 0;
  for (let offer of offersList) {
    if (offer.isChecked) {
      offersPrice += offer.price;
    }
  }
  return offersPrice;
};

const getEventsPrice = (events = EMPTY_EVENT) => {
  let offers = [];
  let eventsPrice = 0;
  let eventOffersPrice = 0;
  for (let event of events) {
    offers = getEventOffers().get(event.typeEvent);
    eventOffersPrice = getOffersPrice(offers);
    eventsPrice += event.price + eventOffersPrice;
  }
  return eventsPrice;
};

const createTripPriceInfoTemplate = (events) => {
  const tripPrice = getEventsPrice(events);
  return (
    `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripPrice}</span>
  </p>`
  );
};


export default class PriceInfo {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createTripPriceInfoTemplate(this._events);
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
