import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses: Course[] = [
    { id: 1, name: 'Introduction to Angular', code: 'ANG101', credits: 3, gradeStatus: 'passed' },
    { id: 2, name: 'Reactive Programming', code: 'RXJ202', credits: 4, gradeStatus: 'pending' },
    { id: 3, name: 'TypeScript Fundamentals', code: 'TS301', credits: 3, gradeStatus: 'passed' },
    { id: 4, name: 'Component Architecture', code: 'COMP404', credits: 2, gradeStatus: 'failed' },
    { id: 5, name: 'Web Security Basics', code: 'SEC505', credits: 2, gradeStatus: 'pending' },
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find((course) => course.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}
