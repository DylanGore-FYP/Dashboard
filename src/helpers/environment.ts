/**
 * Helper module to get and parse variables from environment variables
 */

/** Boolean value to state if user registration should be allowed */
const enableUserRegistration = String(import.meta.env.VITE_ENABLE_USER_REGISTRATION).toLowerCase() === 'true';

/** The API location as defined by the environment variable (default: 'http://localhost:5000') */
let apiLocation = 'http://localhost:5000';
if (import.meta.env.VITE_API_LOCATION != undefined) {
  apiLocation = String(import.meta.env.VITE_API_LOCATION);
}

/** The names of the login providers to be enabled in a comma-seperated string (e.g. 'google,github,microsoft') */
let enabledLoginProviders = [] as Array<string>;
if (import.meta.env.VITE_LOGIN_PROVIDERS != undefined && String(import.meta.env.VITE_LOGIN_PROVIDERS).length > 0) {
  // prettier-ignore
  enabledLoginProviders = String(import.meta.env.VITE_LOGIN_PROVIDERS).split(',')
}

export { enableUserRegistration, apiLocation, enabledLoginProviders };
