import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSorterTemplate} from "./view/sorter.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createEventDayTemplate} from "./view/event-day.js";
import {createTripRouteInfoTemplate} from "./view/route-info.js";
import {createTripPriceInfoTemplate} from "./view/price-info.js";
import {generateEvents} from "./mock/events.js";
import {EVENT_COUNT} from "./const.js";
import {getTripDates} from "./date.js";

const getEvents = (eventsCounter) => {
  const eventsList = generateEvents(eventsCounter);
  let eventCounter = 0;
  eventsList.forEach((event) => {
    eventCounter += 1;
    event.eventCounter = event.eventCounter + eventCounter;
  });
  return eventsList;
};

const events = getEvents(EVENT_COUNT);

const tripDates = getTripDates(events);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripMainMenuElement = tripControlsElement.querySelector(`.visually-hidden:first-of-type`);
const tripEventsBoardElement = document.querySelector(`.trip-events`);

render(tripMainMenuElement, createMenuTemplate(), `afterend`);
render(tripControlsElement, createFilterTemplate());
render(tripEventsBoardElement, createSorterTemplate());
render(tripEventsBoardElement, createEventEditTemplate(events[0]));

let counter = 0;
for (let i = 0; i < tripDates.length; i++) {
  counter += 1;
  render(tripEventsBoardElement, createEventDayTemplate(tripDates[i], counter, events.slice(1, events.length)));
}

render(tripMainElement, createTripRouteInfoTemplate(events), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);

render(tripInfoElement, createTripPriceInfoTemplate(events));
