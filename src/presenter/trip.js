import SorterView from "../view/sorter.js";
import EventBoardView from "../view/event-board.js";
import EventView from "../view/event.js";
import EventEditView from "../view/event-edit.js";
import DayView from "../view/day.js";
import EventDateView from "../view/event-date.js";
import NoEventsView from "../view/no-events.js";
import {render, replace} from "../utils/render.js";
import {SorterType} from "../const.js";
import {sorterByField, sorterByDate} from "../utils/common.js";

export default class Trip {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._eventBoardView = new EventBoardView();
    this._sorterView = new SorterView();
    this._noEventsView = new NoEventsView();
    this._currentSorterType = SorterType.EVENT;

    this._handleSorterTypeChange = this._handleSorterTypeChange.bind(this);

  }

  init(eventsList, offersMap, tripDatesList) {
    this._eventsList = eventsList.slice();
    this._sourcedEventsList = eventsList.slice();
    this._tripDatesList = tripDatesList;
    this._offersMap = offersMap;

    this._renderBoard();
  }

  _sorterEvents(sorterType) {
    switch (sorterType) {
      case SorterType.TIME:
        this._eventsList.sort(sorterByDate(`date`));
        break;
      case SorterType.PRICE:
        this._eventsList.sort(sorterByField(`price`));
        break;
      default:
        this._eventsList = this._sourcedEventsList.slice();
    }

    this._currentSorterType = sorterType;
  }


  _handleSorterTypeChange(sorterType) {
    if (this._currentSorterType === sorterType) {
      return;
    }

    this._sorterEvents(sorterType);
    this._clearEventsList();
    this._renderEventsList();
  }

  _renderSorter() {
    render(this._boardContainer, this._sorterView);
    this._sorterView.setSorterTypeChangeHandler(this._handleSorterTypeChange);
  }

  _clearEventsList() {
    this._eventBoardView.getElement().innerHTML = ``;
  }

  _renderEvent(eventsListElement, event, offersMap) {
    const eventView = new EventView(event, offersMap);
    const eventEditView = new EventEditView(event, offersMap);

    const replaceEventToForm = () => {
      replace(eventEditView, eventView);
    };

    const replaceFormToEvent = () => {
      replace(eventView, eventEditView);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventView.setEventClickHandler(() => {
      replaceEventToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditView.setEventEditClickHandler(() => {
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    eventEditView.setEventSubmitHandler(() => {
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(eventsListElement, eventView);
  }

  _renderNoEvents() {
    render(this._boardContainer, this._noEventsView);
  }

  _renderEventsList() {
    if (this._currentSorterType === SorterType.EVENT) {
      let counter = 1;
      for (const tripDate of this._tripDatesList) {
        const dayView = new DayView(tripDate, counter);
        counter += 1;
        const eventsListView = new EventDateView();
        const eventsFiltered = this._eventsList.filter((eventList) => eventList.date.startEvent.toISOString().slice(0, 10) === tripDate);
        render(this._eventBoardView, dayView);
        render(dayView, eventsListView);
        for (let eventFiltered of eventsFiltered) {
          this._renderEvent(eventsListView, eventFiltered, this._offersMap);
        }
      }
    } else {
      let counter = 0;
      const dayView = new DayView(this._tripDatesList[0], counter);
      const eventsListView = new EventDateView();
      render(this._eventBoardView, dayView);
      render(dayView, eventsListView);
      for (let eventSortered of this._eventsList) {
        this._renderEvent(eventsListView, eventSortered, this._offersMap);
      }
    }
  }

  _renderBoard() {
    if (this._eventsList.length === 0) {
      this._renderNoEvents();
    } else {
      this._renderSorter();
      render(this._boardContainer, this._eventBoardView);
      this._renderEventsList();
    }
  }
}

