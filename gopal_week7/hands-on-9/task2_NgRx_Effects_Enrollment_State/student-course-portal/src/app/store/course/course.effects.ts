/*
 * Step 97: CourseEffects
 * =======================
 * Effects are the ONLY place in NgRx where side effects (HTTP calls, navigation,
 * localStorage access) should happen.  Reducers must remain pure functions.
 *
 * The loadCourses$ effect:
 *   1. Listens on the Actions stream for [Course] Load Courses
 *   2. Switches to CourseService.getCourses() Observable (HTTP/simulated)
 *   3. On success → dispatches loadCoursesSuccess({ courses })
 *   4. On error   → dispatches loadCoursesFailure({ error: message })
 *
 * switchMap is used because we want to CANCEL any in-flight HTTP call if a new
 * loadCourses action arrives before the previous call completes.
 *
 * catchError MUST be inside the inner observable (the switchMap callback), not
 * outside — otherwise the outer stream would complete on the first error and
 * subsequent dispatches of loadCourses would be ignored.
 *
 * Step 98 — Full flow to verify in Redux DevTools:
 *   dispatch loadCourses()
 *     → Effect fires HTTP (simulated delay)
 *       → loadCoursesSuccess dispatched
 *         → reducer updates state
 *           → selector emits new value
 *             → component re-renders via async pipe
 */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { loadCourses, loadCoursesSuccess, loadCoursesFailure } from './course.actions';

@Injectable()
export class CourseEffects {
  private actions$: Actions;

  constructor(
    actions$: Actions,
    private courseService: CourseService
  ) {
    this.actions$ = actions$;
  }

  /*
   * createEffect(() => ...) wraps the effect so NgRx can subscribe to it.
   * The factory function returns an Observable of actions.
   */
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      // ofType filters the stream to only [Course] Load Courses actions
      ofType(loadCourses),

      // switchMap: cancel previous, subscribe to new inner Observable
      switchMap(() =>
        this.courseService.getCourses().pipe(
          // success: wrap courses array in the success action
          map((courses) => loadCoursesSuccess({ courses })),

          // error: catch and emit the failure action (keeps outer stream alive)
          catchError((error: Error) =>
            of(loadCoursesFailure({ error: error.message ?? 'Unknown error' }))
          )
        )
      )
    )
  );
}
