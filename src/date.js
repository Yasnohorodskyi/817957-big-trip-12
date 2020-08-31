export const getTripDates = (events) => {
  const dateSet = new Set();
  for (let event of events) {
    dateSet.add(event.date.startEvent.toISOString().slice(0, 10));
    dateSet.add(event.date.endEvent.toISOString().slice(0, 10));
  }

  return Array.from(dateSet);
};

export const humanizeDateDay = (tripDate) => {
  let dateDay = new Date(tripDate);
  return dateDay.toLocaleString(`en-US`, {day: `numeric`, month: `short`}).toUpperCase();
};

export const humanizeDate = (tripDate) => {
  let dateDay = new Date(tripDate);
  return dateDay.toLocaleString(`en-US`, {day: `numeric`, month: `numeric`, year: `2-digit`});
};

export const humanizeTime = (eventDate) => {
  return eventDate.toLocaleString(`en-GB`, {hour: `2-digit`, minute: `2-digit`});
};

export const getEventDuration = (startDate, endDate) => {
  const delta = (endDate.getTime() - startDate.getTime()) / 60000;
  let timeEvent = delta / 60;
  let hourEvent = Math.trunc(timeEvent);
  let minutesEvent = delta % 60;

  if (timeEvent < 1) {
    return minutesEvent + `M`;
  } else {
    return hourEvent + `H ` + minutesEvent + `M`;
  }
};
