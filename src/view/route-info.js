import {humanizeDateDay} from "../utils/date.js";
import AbstractView from "./abstract.js";


const getTripChain = (events) => {
  const tripSet = new Set();
  for (let event of events) {
    tripSet.add(event.destination);
  }

  const tripList = Array.from(tripSet);
  if (tripList.length <= 3) {
    return `<h1 class="trip-info__title">${tripList.map((city) => `${city} &mdash; `).join(``)}</h1>`;
  }
  return `<h1 class="trip-info__title">${tripList[0]} &mdash; ... &mdash; ${tripList[tripList.length - 1]}</h1>`;
};

const getTriRange = (events) => {
  if (events.length !== 0) {
    const startDate = humanizeDateDay(events[0].date.startEvent);
    const endDate = new Date(events[events.length - 1].date.endEvent);
    return `<p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate.getDate()}</p>`;
  }
  return ``;
};

const createTripRouteInfoTemplate = (events) => {
  const tripChain = getTripChain(events);
  const tripRange = getTriRange(events);
  const isEventsEmpty = events.length === 0;

  return (
    `<section class="trip-main__trip-info  trip-info">
     <div class="trip-info__main">
       ${!isEventsEmpty ? tripChain : ``}
       ${!isEventsEmpty ? tripRange : ``}
      </div>
     </section>`
  );
};

export default class TripInfo extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripRouteInfoTemplate(this._events);
  }
}
