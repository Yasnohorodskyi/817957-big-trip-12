import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSorterTemplate} from "./view/sorter.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createEventDayTemplate} from "./view/event-day.js";
import {createEventTemplate} from "./view/event.js";
import {createTripRouteInfoTemplate} from "./view/route-info.js";
import {createTripPriceInfoTemplate} from "./view/price-info.js";

const EVENT_COUNT = 3;

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
render(tripEventsBoardElement, createEventEditTemplate());

render(tripEventsBoardElement, createEventDayTemplate());

const tripEventsListElement = tripEventsBoardElement.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(tripEventsListElement, createEventTemplate());
}

render(tripMainElement, createTripRouteInfoTemplate(), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);

render(tripInfoElement, createTripPriceInfoTemplate());
