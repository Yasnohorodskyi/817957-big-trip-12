import {humanizeDateDay} from "../date.js";
import {createEventTemplate} from "./event.js";

const getEventsByDateList = (tripDate, events) => {
  const eventsFiltered = events.filter((event) => event.date.startEvent.toISOString().slice(0, 10) === tripDate);
  return eventsFiltered.map((eventFiltered) => createEventTemplate(eventFiltered)).join(``);
};

export const createEventDayTemplate = (tripDate, tripDayNumber, events) => {
  const dateDay = humanizeDateDay(tripDate);
  const eventsByDateList = getEventsByDateList(tripDate, events);
  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${tripDayNumber}</span>
          <time class="day__date" datetime=${tripDate}>${dateDay}</time>
        </div>
        <ul class="trip-events__list">
          ${eventsByDateList}
        </ul>
      </li>
    </ul>`
  );
};


