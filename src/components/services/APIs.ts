export const COUNTRY_TOKEN = "{country_id}";
export const COUNTRY_ABBREVIATION = "{country_abbr}";
export const ZIP_CODE = "{postcode}";

export const GET_COUNTRIES = "/common/all-countries/";
export const GET_STATES = `/common/country/${COUNTRY_TOKEN}/states/`;
export const GET_CITIES = `common/get-city/?zip_code=${ZIP_CODE}&country_code=${COUNTRY_ABBREVIATION}`;
export const FORM_REGISTER = "/accounts/register/";
export const EMAIL_VERIFICATION = "/accounts/resend-email/";
