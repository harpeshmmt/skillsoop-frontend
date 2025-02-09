import {
  COUNTRY_ABBREVIATION,
  COUNTRY_TOKEN,
  GET_CITIES,
  GET_COUNTRIES,
  GET_STATES,
  ZIP_CODE,
} from "./APIs";
import { GET } from "./axios_instance";

export const getAllCountries = (params?: any) => {
  return GET(GET_COUNTRIES, params);
};

export const getStates = (params?: any) => {
  return GET(GET_STATES.replace(COUNTRY_TOKEN, params));
};

export const getCities = (params?: any, postcode?: any) => {
  return GET(
    GET_CITIES.replace(ZIP_CODE, postcode).replace(COUNTRY_ABBREVIATION, params)
  );
};
