export const EVENT_COUNT = 22;
export const EVENT_TYPES = [`taxi`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
export const EVENT_TYPES_IN_POINT = [`check-in`, `sightseeing`, `restaurant`];
export const EVENT_TYPES_TO_POINT = [`taxi`, `train`, `ship`, `transport`, `drive`, `flight`];
export const CITIES = [`Lisbon`, `Sintra`, `Vila Nova de Gaia`, `Porto`, `Loures`, `Cascais`, `Braga`];

export const EMPTY_EVENT = {
  typeEvent: ``,
  destination: ``,
  description: ``,
  photos: [],
  price: 0,
  date: {
    startEvent: null,
    endEvent: null,
    eventDuration: null,
  },
  isFavorite: false,
  eventCounter: 0,
};

export const SorterType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};
