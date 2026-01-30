/**
 * Inngest Functions Registry
 *
 * Export all Inngest functions from this file.
 * These are imported by the API route that serves Inngest.
 *
 * When adding new functions:
 * 1. Create the function in a new file (e.g., `notifications.ts`)
 * 2. Export it from that file
 * 3. Import and add it to the `functions` array below
 */

import { helloWorld, userOnboarding, dailyCleanup } from "./example";

/**
 * All Inngest functions to be served.
 * Add new functions to this array as you create them.
 */
export const functions = [
  // Example functions - remove or modify as needed
  helloWorld,
  userOnboarding,
  dailyCleanup,

  // Add your functions here:
  // myCustomFunction,
  // anotherFunction,
];
