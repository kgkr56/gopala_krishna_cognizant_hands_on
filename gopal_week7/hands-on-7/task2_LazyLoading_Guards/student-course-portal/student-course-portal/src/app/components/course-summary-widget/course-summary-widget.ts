import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="summary-widget">
      <h2>Current Courses</h2>
      <p>Total courses: {{ courses.length }}</p>
      <ul>
        <li *ngFor="let course of courses">{{ course.code }} - {{ course.name }}</li>
      </ul>
    </section>
  `,
})
export class CourseSummaryWidget {
  courses = this.courseService.getCourses();

  constructor(private courseService: CourseService) {}
}
