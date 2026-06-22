/*
 * Step 92 + 97: App Configuration with NgRx Effects
 * ====================================================
 * provideStore({})             — root store
 * provideState(...)            — feature slices: 'course' and 'enrollment'
 * provideEffects([...])        — Step 97: registers CourseEffects
 * provideStoreDevtools(...)    — enables Redux DevTools (install browser extension)
 *
 * NOTE: Two feature states are registered:
 *   'course'     → courseReducer     (courses, loading, error)
 *   'enrollment' → enrollmentReducer (enrolledCourseIds)
 */
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { courseReducer } from './store/course/course.reducer';
import { enrollmentReducer } from './store/enrollment/enrollment.reducer';
import { CourseEffects } from './store/course/course.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    // Root store — feature slices registered below
    provideStore({}),

    // Course feature slice: { courses, loading, error }
    provideState('course', courseReducer),

    // Enrollment feature slice: { enrolledCourseIds }
    provideState('enrollment', enrollmentReducer),

    // Step 97: Effects — handles async HTTP calls for courses
    provideEffects([CourseEffects]),

    // Redux DevTools — maxAge: 25 keeps last 25 actions
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
  ],
};
