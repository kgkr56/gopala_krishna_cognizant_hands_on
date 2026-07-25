/*
 * Step 99: Enrollment Reducer
 * ============================
 * Manages enrolledCourseIds: number[] — a simple array of enrolled course IDs.
 *
 * Immutability pattern:
 *   enrollInCourse    → spread existing IDs + new ID (only if not already included)
 *   unenrollFromCourse → filter out the removed ID
 *   setEnrolledCourses → replace the entire array (for initialisation)
 */
import { createReducer, on } from '@ngrx/store';
import { enrollInCourse, unenrollFromCourse, setEnrolledCourses } from './enrollment.actions';

export interface EnrollmentState {
  enrolledCourseIds: number[];
}

export const initialEnrollmentState: EnrollmentState = {
  enrolledCourseIds: [],
};

export const enrollmentReducer = createReducer(
  initialEnrollmentState,

  on(enrollInCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.includes(courseId)
      ? state.enrolledCourseIds                          // already enrolled — no-op
      : [...state.enrolledCourseIds, courseId],          // add the new ID
  })),

  on(unenrollFromCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.filter((id) => id !== courseId),
  })),

  on(setEnrolledCourses, (state, { courseIds }) => ({
    ...state,
    enrolledCourseIds: [...courseIds],
  }))
);
