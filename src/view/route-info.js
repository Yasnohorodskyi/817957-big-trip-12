import {humanizeDateDay} from "../date.js";

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

  const startDate = humanizeDateDay(events[0].date.startEvent);
  const endDate = new Date(events[events.length - 1].date.endEvent);
  return `<p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate.getDate()}</p>`;
};

export const createTripRouteInfoTemplate = (events) => {
  const tripChain = getTripChain(events);
  const tripRange = getTriRange(events);

  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      ${tripChain}
      ${tripRange}
      </div>
  </section>`
  );
};
