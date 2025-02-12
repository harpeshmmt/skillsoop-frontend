import {
  COUNTRY_ABBREVIATION,
  COUNTRY_TOKEN,
  EMAIL_VERIFICATION,
  EMAIL_VERIFY,
  FORGOT_PASSWORD,
  FORM_REGISTER,
  GET_CITIES,
  GET_COUNTRIES,
  GET_STATES,
  ID,
  RESET_PASSWORD,
  TOKEN,
  USER_LOGIN,
  USER_LOGOUT,
  ZIP_CODE,
} from "./APIs";
import { GET, POST, PUT } from "./axios_instance";

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

export const login = (payload?: any) => {
  return POST(USER_LOGIN, payload);
};

export const logout = (refreshToken?: any) => {
  return POST(USER_LOGOUT, refreshToken);
};

export const getEmailVerify = (token?: any, id?: any) => {
  return PUT(EMAIL_VERIFY.replace(TOKEN, token).replace(ID, id));
};

export const forgotPassword = (payload?: any) => {
  return POST(FORGOT_PASSWORD, payload);
};

export const resetPassword = (token?: any, id?: any, payload?: any) => {
  return PUT(RESET_PASSWORD.replace(TOKEN, token).replace(ID, id), payload);
};
