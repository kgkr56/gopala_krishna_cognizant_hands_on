/*
 * Step 93: Course Actions
 * ========================
 * Three actions cover the async lifecycle of loading courses:
 *   loadCourses        — fired by the component on ngOnInit (triggers the Effect)
 *   loadCoursesSuccess — fired by the Effect on HTTP success, carries the payload
 *   loadCoursesFailure — fired by the Effect on HTTP error, carries the error message
 *
 * The '[Course]' prefix is a NgRx convention — it groups related actions so the
 * Redux DevTools timeline is easy to filter (type '[Course]' to see only this feature).
 */
import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

// Trigger: component dispatches this to kick off the loading Effect
export const loadCourses = createAction('[Course] Load Courses');

// Success: Effect dispatches this with the fetched course array
export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>()
);

// Failure: Effect dispatches this with an error string
export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>()
);
