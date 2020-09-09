import SiteMenuView from "./view/menu.js";
import FiltersView from "./view/filter.js";
import SorterView from "./view/sorter.js";
import EventBoardView from "./view/event-board.js";
import EventView from "./view/event.js";
import EventEditView from "./view/event-edit.js";
import DayView from "./view/day.js";
import EventsListByDate from "./view/event-date.js";
import TripInfoView from "./view/route-info.js";
import PriceInfoView from "./view/price-info.js";
import {generateEvents} from "./mock/events.js";
import {EVENT_COUNT} from "./const.js";
import {getTripDates} from "./date.js";
import {render, RenderPosition} from "./utils.js";

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

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripMainMenuElement = tripControlsElement.querySelector(`.visually-hidden:first-of-type`);
const tripEventsBoardElement = document.querySelector(`.trip-events`);

render(tripMainMenuElement, new SiteMenuView().getElement(), RenderPosition.AFTEREND);
render(tripControlsElement, new FiltersView().getElement());
render(tripEventsBoardElement, new SorterView().getElement());

const renderEvent = (eventsListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToForm = () => {
    eventsListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    eventsListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {

    replaceEventToForm();
  });

  eventEditComponent.getElement().querySelector(`.event__save-btn`).addEventListener(`submit`, (evt) =>{
    evt.preventDefault();
    replaceFormToEvent();
  });

  render(eventsListElement.getElement(), eventEditComponent.getElement());
};

const eventBoardComponent = new EventBoardView();
render(tripEventsBoardElement, eventBoardComponent.getElement());

let counter = 0;
let dayComponent = null;
let eventsListComponent = null;

for (let i = 0; i < tripDates.length; i++) {
  counter += 1;
  dayComponent = new DayView(tripDates[i], counter);
  eventsListComponent = new EventsListByDate();
  const eventsFiltered = events.filter((event) => event.date.startEvent.toISOString().slice(0, 10) === tripDates[i]);

  render(eventBoardComponent.getElement(), dayComponent.getElement());
  render(dayComponent.getElement(), eventsListComponent.getElement());

  for (let j = 0; j < eventsFiltered.length; j++) {
    renderEvent(eventsListComponent, eventsFiltered[j]);
  }
}

render(tripMainElement, new TripInfoView(events).getElement(), RenderPosition.AFTERBEGIN);

const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);

render(tripInfoElement, new PriceInfoView(events).getElement());
