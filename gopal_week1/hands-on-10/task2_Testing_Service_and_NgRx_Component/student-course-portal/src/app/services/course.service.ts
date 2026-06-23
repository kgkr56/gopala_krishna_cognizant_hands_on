/*
 * CourseService — HTTP-based
 * ==========================
 * Uses HttpClient to call a REST API at http://localhost:3000/courses.
 * In tests this is replaced by HttpClientTestingModule + HttpTestingController,
 * which intercepts HTTP calls without a real backend.
 *
 * Error handling:
 *   catchError re-maps any HTTP error response to a user-readable string and
 *   re-throws as an Observable error — tested in Step 108.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../models/course.model';

export const COURSES_URL = 'http://localhost:3000/courses';

@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private http: HttpClient) {}

  /**
   * Step 107: GET all courses.
   * Test intercepts the exact URL with httpMock.expectOne(COURSES_URL).
   */
  getCourses(): Observable<Course[]> {
    return this.http
      .get<Course[]>(COURSES_URL)
      .pipe(catchError(this.handleError));
  }

  getCourseById(id: number): Observable<Course> {
    return this.http
      .get<Course>(`${COURSES_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Step 108: Error handler — converts HttpErrorResponse to a thrown Observable.
   * Test flushes a 500 and asserts the error message matches.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    const message =
      error.error instanceof ErrorEvent
        ? error.error.message                    // client-side / network error
        : `Server error ${error.status}: ${error.message}`; // server-side error
    return throwError(() => new Error(message));
  }
}
