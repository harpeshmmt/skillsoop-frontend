import {
  COUNTRY_ABBREVIATION,
  COUNTRY_TOKEN,
  EMAIL_VERIFICATION,
  FORM_REGISTER,
  GET_CITIES,
  GET_COUNTRIES,
  GET_STATES,
  ZIP_CODE,
} from "./APIs";
import { GET, POST } from "./axios_instance";

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

export const registerForm = (payload?: any) => {
  return POST(FORM_REGISTER, payload);
};

export const emailVerification = (payload: any) => {
  return POST(EMAIL_VERIFICATION, payload);
};
