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

export { enableUserRegistration, apiLocation };
