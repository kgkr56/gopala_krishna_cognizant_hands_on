import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {
  selectedCourseId: number | null = null;

  courses = [
    { id: 1, name: 'Angular Basics', code: 'ANG-101', credits: 3 },
    { id: 2, name: 'TypeScript Fundamentals', code: 'TS-202', credits: 4 },
    { id: 3, name: 'Web Development', code: 'WEB-303', credits: 3 },
    { id: 4, name: 'UX Design', code: 'UX-404', credits: 2 },
    { id: 5, name: 'Backend APIs', code: 'API-505', credits: 3 },
  ];

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}
