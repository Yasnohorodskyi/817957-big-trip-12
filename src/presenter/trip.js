import SorterView from "../view/sorter.js";
import EventBoardView from "../view/event-board.js";
import EventView from "../view/event.js";
import EventEditView from "../view/event-edit.js";
import DayView from "../view/day.js";
import EventDateView from "../view/event-date.js";
import NoEventsView from "../view/no-events.js";
import {render, replace} from "../utils/render.js";

export default class Trip {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._eventBoardComponent = new EventBoardView();
    this._sorterComponent = new SorterView();
    this._noEventsComponent = new NoEventsView();

  }

  init(eventsList, offersMap, tripDatesList) {
    this._eventsList = eventsList.slice();
    this._tripDatesList = tripDatesList;
    this._offersMap = offersMap;

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardContainer, this._sorterComponent);
  }

  _renderEvent(eventsListElement, event, offersMap) {
    const eventComponent = new EventView(event, offersMap);
    const eventEditComponent = new EventEditView(event, offersMap);

    const replaceEventToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToEvent = () => {
      replace(eventComponent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventComponent.setEventClickHandler(() => {
      replaceEventToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setEventEditClickHandler(() => {
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setEventSubmitHandler(() => {
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(eventsListElement, eventComponent);
  }

  _renderNoEvents() {
    render(this._boardContainer, this._noEventsComponent);
  }

  _renderBoard() {

    if (this._eventsList.length === 0) {
      this._renderNoEvents();
    } else {
      this._renderSort();
      render(this._boardContainer, this._eventBoardComponent);

      let counter = 1;
      for (const tripDate of this._tripDatesList) {
        const dayComponent = new DayView(tripDate, counter);
        counter += 1;
        const eventsListComponent = new EventDateView();

        const eventsFiltered = this._eventsList.filter((eventList) => eventList.date.startEvent.toISOString().slice(0, 10) === tripDate);

        render(this._eventBoardComponent, dayComponent);
        render(dayComponent, eventsListComponent);

        for (let eventFiltered of eventsFiltered) {
          this._renderEvent(eventsListComponent, eventFiltered, this._offersMap);
        }
      }
    }
  }
}
