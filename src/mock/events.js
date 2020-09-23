import {getRandomInteger} from "../utils/common.js";
import {EVENT_TYPES, CITIES} from "../const.js";
import {getCitiesMap} from "./cities.js";

const MIN_PRICE = 10;
const MAX_PRICE = 200;

const MIN_TIME_EVENT = 30;
const MAX_TIME_EVENT = 150;

const MIN_TIME_BETWEEN_EVENT = 240;
const MAX_TIME_BETWEEN_EVENT = 720;

const getRandomElement = (element) => {
  const randomIndex = getRandomInteger(0, element.length - 1);

  return element[randomIndex];
};

const getTimePoints = (eventCounter) => {
  const timePoints = [];
  let startEndEvent = {};
  let timeGap = 0;
  let timeEventGap = 0;
  let initialDate = new Date();
  let startEventDate = new Date(initialDate.setDate(initialDate.getDate() - 1));
  let endEventDate = new Date(startEventDate);
  for (let i = 0; i < eventCounter; i++) {
    timeGap = getRandomInteger(MIN_TIME_EVENT, MAX_TIME_EVENT);
    timeEventGap = getRandomInteger(MIN_TIME_BETWEEN_EVENT, MAX_TIME_BETWEEN_EVENT);
    endEventDate = new Date(startEventDate);
    endEventDate = new Date(endEventDate.setMinutes(endEventDate.getMinutes() + timeGap));
    startEndEvent = {
      start: new Date(startEventDate),
      end: new Date(endEventDate),
    };
    timePoints.push(startEndEvent);
    startEventDate = new Date(endEventDate.setMinutes(endEventDate.getMinutes() + timeEventGap));
  }
  return timePoints;
};

const generateEvent = (eventScedule, counter) => {
  const city = getRandomElement(CITIES);
  const cityDescription = getCitiesMap();
  return {
    typeEvent: getRandomElement(EVENT_TYPES),
    destination: city,
    description: cityDescription.get(city).description,
    photos: cityDescription.get(city).photos,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    date: {
      startEvent: eventScedule[counter].start,
      endEvent: eventScedule[counter].end,
    },
    isFavorite: Boolean(getRandomInteger(0, 1)),
    eventCounter: 0,
  };
};

export const generateEvents = (eventCounter) => {
  const events = [];
  const dateList = getTimePoints(eventCounter);

  for (let i = 0; i < eventCounter; i++) {
    events.push(generateEvent(dateList, i));
  }
  return events;
};
