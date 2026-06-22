/*
 * CourseService
 * =============
 * In a real application this would use HttpClient to call a REST API.
 * For the purposes of this hands-on we simulate an async HTTP call using
 * of() + delay() so that Effects can be demonstrated without a running backend.
 *
 * The service returns Observable<Course[]> — matching the signature that
 * Effects expect when they call this.courseService.getCourses().
 */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private courses: Course[] = [
    { id: 1, name: 'Introduction to Angular', code: 'ANG101', credits: 3, gradeStatus: 'passed' },
    { id: 2, name: 'Reactive Programming', code: 'RXJ202', credits: 4, gradeStatus: 'pending' },
    { id: 3, name: 'TypeScript Fundamentals', code: 'TS301', credits: 3, gradeStatus: 'passed' },
    { id: 4, name: 'Component Architecture', code: 'COMP404', credits: 2, gradeStatus: 'failed' },
    { id: 5, name: 'Web Security Basics', code: 'SEC505', credits: 2, gradeStatus: 'pending' },
  ];

  /**
   * Simulates an async HTTP GET — returns Observable<Course[]> with a 600ms delay.
   * In production: return this.http.get<Course[]>('/api/courses');
   */
  getCourses(): Observable<Course[]> {
    return of(this.courses).pipe(delay(600));
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find((c) => c.id === id);
  }
}
