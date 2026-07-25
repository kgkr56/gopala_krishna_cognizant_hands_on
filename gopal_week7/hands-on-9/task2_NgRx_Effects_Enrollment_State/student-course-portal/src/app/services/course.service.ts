/*
 * CourseService — returns Observable<Course[]>
 * Simulates an async HTTP GET with a 600ms delay.
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

  getCourses(): Observable<Course[]> {
    // Simulates network latency — replace with:
    // return this.http.get<Course[]>('/api/courses');
    return of(this.courses).pipe(delay(600));
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find((c) => c.id === id);
  }
}
