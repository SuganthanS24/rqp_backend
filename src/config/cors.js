import { config } from "./env.js";

/**
 * CORS Configuration Options
 * 
 * By using `origin: true`, the server dynamically mirrors the requesting client's
 * origin back in the 'Access-Control-Allow-Origin' header.
 * 
 * This fulfills two critical requirements for RoboQuote Pro:
 * 1. Supports Credentials: Allows authorization headers and cookies to be sent,
 *    which is forbidden when using a static wildcard '*'.
 * 2. Mobile APK Compatibility: Allows Android WebViews (which run on local hosts
 *    like 'http://localhost' or 'file://') to communicate with the hosted API without
 *    throwing CORS validation errors.
 */
export const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
