/*
 * Step 99: Enrollment Actions
 * ============================
 * Three actions cover the enrollment lifecycle:
 *
 *   enrollInCourse       — dispatched from CourseCardComponent when Enroll is clicked
 *   unenrollFromCourse   — dispatched when Unenroll is clicked
 *   setEnrolledCourses   — can pre-populate the list (e.g., from localStorage on boot)
 *
 * All actions carry a courseId so the reducer knows which ID to add/remove.
 */
import { createAction, props } from '@ngrx/store';

export const enrollInCourse = createAction(
  '[Enrollment] Enroll In Course',
  props<{ courseId: number }>()
);

export const unenrollFromCourse = createAction(
  '[Enrollment] Unenroll From Course',
  props<{ courseId: number }>()
);

export const setEnrolledCourses = createAction(
  '[Enrollment] Set Enrolled Courses',
  props<{ courseIds: number[] }>()
);
