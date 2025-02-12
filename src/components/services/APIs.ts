export const COUNTRY_TOKEN = "{country_id}";
export const COUNTRY_ABBREVIATION = "{country_abbr}";
export const ZIP_CODE = "{postcode}";
export const TOKEN = "{token}";
export const ID = "{id}";

export const GET_COUNTRIES = "/common/all-countries/";
export const GET_STATES = `/common/country/${COUNTRY_TOKEN}/states/`;
export const GET_CITIES = `common/get-city/?zip_code=${ZIP_CODE}&country_code=${COUNTRY_ABBREVIATION}`;
export const FORM_REGISTER = "/accounts/register/";
export const EMAIL_VERIFICATION = "/accounts/resend-email/";
export const USER_LOGIN = "/accounts/login/";
export const USER_LOGOUT = "/accounts/logout/";
export const FORGOT_PASSWORD = "/accounts/forgot-password/";
export const EMAIL_VERIFY = `/accounts/verify-email/${TOKEN}/${ID}/`;
export const RESET_PASSWORD = `/accounts/reset-password/${TOKEN}/${ID}/`;
