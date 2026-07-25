/*
 * Step 92: NgRx Store Setup
 * ==========================
 * provideStore({})       — registers the NgRx root store with an empty root reducer map.
 *                          Feature reducers are registered separately via provideState().
 *
 * provideState(...)      — Step 95: registers the 'course' feature slice.
 *                          This is the standalone equivalent of StoreModule.forFeature().
 *
 * provideEffects(...)    — registers CourseEffects so NgRx wires up the Actions stream.
 *                          (Used in Task 2; pre-wired here for a clean progressive build.)
 *
 * provideStoreDevtools() — Step 92: enables the Redux DevTools browser extension.
 *                          maxAge: 25 keeps the last 25 actions in the timeline.
 *                          Install "Redux DevTools" Chrome/Firefox extension to use it.
 */
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { courseReducer } from './store/course/course.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    // Step 92: Root store (empty root reducer map — features register themselves)
    provideStore({}),

    // Step 95: Register the 'course' feature slice
    provideState('course', courseReducer),

    // Effects are registered in Task 2 (course.effects.ts)
    // Pre-wired with empty array here so the import path is ready
    provideEffects([]),

    // Step 92: Redux DevTools — maxAge keeps last 25 actions in the timeline
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false, // set true in production to disable time-travel
    }),
  ],
};
