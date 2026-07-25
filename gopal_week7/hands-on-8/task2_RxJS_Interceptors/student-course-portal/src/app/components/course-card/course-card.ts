import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [],
  template: `
    <article class="course-card">
      <h3>{{ course.name }}</h3>
      <p><strong>Code:</strong> {{ course.code }}</p>
      <p><strong>Credits:</strong> {{ course.credits }}</p>
      <p><strong>Status:</strong> {{ course.gradeStatus }}</p>
      <button type="button" (click)="toggleEnrollment()">
        {{ enrollmentService.isEnrolled(course.id) ? 'Unenroll' : 'Enroll' }}
      </button>
    </article>
  `,
})
export class CourseCard {
  @Input() course!: Course;

  constructor(public enrollmentService: EnrollmentService) {}

  toggleEnrollment(): void {
    if (this.enrollmentService.isEnrolled(this.course.id)) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }
  }
}
