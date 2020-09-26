import MenuView from "./view/menu.js";
import FiltersView from "./view/filter.js";
import TripInfoView from "./view/route-info.js";
import PriceInfoView from "./view/price-info.js";
import {generateEvents} from "./mock/events.js";
import {getEventOffers} from "./mock/offers.js";
import {EVENT_COUNT} from "./const.js";
import {getTripDates} from "./utils/date.js";
import {render, RenderPosition} from "./utils/render.js";
import TripPresenter from "./presenter/trip.js";

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
console.log(events);
const offers = getEventOffers();
const tripDates = getTripDates(events);

const tripMainElement = document.querySelector(`.trip-main`);
render(tripMainElement, new TripInfoView(events), RenderPosition.AFTERBEGIN);
const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, new PriceInfoView(events));

const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripMainMenuElement = tripControlsElement.querySelector(`.visually-hidden:first-of-type`);
const tripEventsBoardElement = document.querySelector(`.trip-events`);

render(tripMainMenuElement, new MenuView(), RenderPosition.AFTEREND);
render(tripControlsElement, new FiltersView());

const tripPresenter = new TripPresenter(tripEventsBoardElement);
tripPresenter.init(events, offers, tripDates);
