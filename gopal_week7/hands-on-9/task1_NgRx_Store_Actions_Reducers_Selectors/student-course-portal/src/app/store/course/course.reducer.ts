/*
 * Step 94: Course Reducer
 * ========================
 * The reducer is a PURE function — given a state and an action, it returns the
 * NEXT state without mutating the original.  NgRx uses Immer-style produce
 * internally so you CAN mutate draft objects inside on() handlers — but the
 * pattern below uses object-spread to make immutability explicit for learning.
 *
 * State shape:
 *   courses  — array of Course objects (populated on success)
 *   loading  — true while the HTTP call is in-flight
 *   error    — null normally; set to the error message on failure
 */
import { createReducer, on } from '@ngrx/store';
import { Course } from '../../models/course.model';
import { loadCourses, loadCoursesSuccess, loadCoursesFailure } from './course.actions';

export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialCourseState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

export const courseReducer = createReducer(
  initialCourseState,

  // loadCourses — set loading flag; clear previous error
  on(loadCourses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // loadCoursesSuccess — store courses and clear loading flag
  on(loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
    error: null,
  })),

  // loadCoursesFailure — store error message and clear loading flag
  on(loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
