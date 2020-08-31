import {getRandomInteger} from "../utils.js";
import {EVENT_TYPES} from "../const.js";

const OFFERS_TITLE = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`, `Travel by train`];
const OFFERS_NAME = [`luggage`, `comfort`, `meal`, `seats`, `train`];

const MIN_OFFER_PRICE = 5;
const MAX_OFFER_PRICE = 50;

const getOffers = () => {
  const offfersList = [];
  let offerItem = {};
  for (let i = 0; i < OFFERS_TITLE.length; i++) {
    offerItem = {
      title: OFFERS_TITLE[i],
      name: OFFERS_NAME[i],
      price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE),
      isChecked: Boolean(getRandomInteger(0, 1)),
    };
    offfersList.push(offerItem);
  }
  return offfersList;
};

export const getEventOffers = () => {
  const offers = getOffers();
  const eventOffersMap = new Map();

  for (let eventType of EVENT_TYPES) {
    eventOffersMap.set(eventType, offers.slice(getRandomInteger(0, offers.length - 1)));
  }

  return eventOffersMap;
};
