/*
 * Step 100: CourseCardComponent — NgRx-connected
 * ================================================
 * Instead of calling EnrollmentService directly, this component:
 *   1. Accepts the full course object via @Input
 *   2. Accepts the enrolledIds array via @Input (passed from CourseListComponent)
 *   3. Dispatches enrollInCourse / unenrollFromCourse actions on button click
 *
 * WHY pass enrolledIds as @Input instead of selecting in the card:
 *   CourseList already holds the store subscription for the whole list.
 *   Passing IDs down avoids each card opening its own store subscription
 *   for the same Observable — keeps the number of subscriptions minimal.
 */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Course } from '../../models/course.model';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard {
  @Input() course!: Course;

  /** The enrolled IDs array from the parent — used to decide button label. */
  @Input() enrolledIds: number[] = [];

  constructor(private store: Store) {}

  /** Convenience getter used in the template */
  get isEnrolled(): boolean {
    return this.enrolledIds.includes(this.course.id);
  }

  /**
   * Step 100: Toggle enrollment by dispatching the correct NgRx action.
   * Redux DevTools will show:
   *   [Enrollment] Enroll In Course   { courseId: X }
   *   [Enrollment] Unenroll From Course { courseId: X }
   */
  toggleEnrollment(): void {
    if (this.isEnrolled) {
      this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
    }
  }
}
