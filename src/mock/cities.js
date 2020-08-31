import {getRandomInteger} from "../utils.js";
import {CITIES} from "../const.js";

const DESCRIPTION_PARTS = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const getDescription = (description) => {
  const randomParts = getRandomInteger(1, description.length - 1);
  return description.slice(0, randomParts).join(` `);
};

const getRandomPhoto = () => {
  return (
    `img/photos/${getRandomInteger(1, 5)}.jpg`
  );
};

const getRandomPhotos = () => {
  let photos = [];
  const length = getRandomInteger(1, 5);
  for (let i = 0; i < length; i++) {
    photos.push(getRandomPhoto());
  }
  return photos;
};

const getCityDescription = () => {
  return {
    description: getDescription(DESCRIPTION_PARTS),
    photos: getRandomPhotos(),
  };
};

export const getCitiesMap = () => {

  const citiesMap = new Map();
  let cityDescript = {};
  for (let city of CITIES) {
    cityDescript = getCityDescription();
    citiesMap.set(city, cityDescript);
  }

  return citiesMap;
};
