/*
 * Step 99: Enrollment Selectors
 * ==============================
 * selectEnrolledIds       — simple selector for the ID array
 *
 * selectEnrolledCourses   — CROSS-SLICE selector combining course and enrollment state.
 *                           This is a powerful NgRx pattern: derive joined data from
 *                           two independent feature slices WITHOUT duplicating state.
 *
 * WHY cross-slice selectors are powerful:
 *   We never store Course objects inside enrollment state — only IDs.
 *   The selector joins them on the fly using memoisation, so the component
 *   gets a Course[] without us having to keep two copies in sync.
 */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';
import { selectAllCourses } from '../course/course.selectors';

export const selectEnrollmentState =
  createFeatureSelector<EnrollmentState>('enrollment');

// Enrolled IDs array
export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  (state) => state.enrolledCourseIds
);

// Step 99: Cross-slice selector — joins courses + enrollment IDs → Course[]
// Input selectors: selectAllCourses (from course slice) + selectEnrolledIds (enrollment slice)
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (courses, enrolledIds) => courses.filter((course) => enrolledIds.includes(course.id))
);
