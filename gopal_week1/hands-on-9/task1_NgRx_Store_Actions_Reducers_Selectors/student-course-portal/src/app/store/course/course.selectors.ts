/*
 * Step 95: Course Selectors
 * ==========================
 * Selectors are MEMOISED — they only recompute when their input selectors
 * return a different reference.  This is NgRx's key performance optimisation:
 * components only re-render when the relevant slice of state actually changes.
 *
 * createFeatureSelector<CourseState>('course') points at the 'course' key
 * registered via provideState('course', courseReducer) in app.config.ts.
 *
 * createSelector(base, projector) composes selectors:
 *   - base      → selects the feature slice
 *   - projector → derives the specific field from that slice
 */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

// Root selector for the 'course' feature slice
export const selectCourseState = createFeatureSelector<CourseState>('course');

// Derived selectors — each is independently memoised
export const selectAllCourses = createSelector(
  selectCourseState,
  (state) => state.courses
);

export const selectCoursesLoading = createSelector(
  selectCourseState,
  (state) => state.loading
);

export const selectCoursesError = createSelector(
  selectCourseState,
  (state) => state.error
);
