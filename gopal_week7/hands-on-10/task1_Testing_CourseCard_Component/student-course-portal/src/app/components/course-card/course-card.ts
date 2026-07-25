/*
 * CourseCardComponent
 * ====================
 * Standalone component displaying a single course.
 *
 * Inputs:
 *   course      — the Course object to display
 *   isEnrolled  — boolean driven by the parent (from NgRx enrollment state)
 *
 * Output:
 *   enrollRequested — emits course.id when the Enroll/Unenroll button is clicked.
 *                     The parent (CourseList) listens and dispatches the NgRx action.
 *                     Using an @Output makes this component fully testable in isolation
 *                     without needing a real Store — the test just checks the emitted value.
 *
 * ngOnChanges:
 *   Logs a diagnostic message whenever the course input changes.
 *   Tested in Step 105 by spying on console.log.
 */
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  /** Step 103: @Input — the course to render */
  @Input() course!: Course;

  /** Whether the student is enrolled (passed from parent via NgRx selector) */
  @Input() isEnrolled = false;

  /**
   * Step 104: @Output — emits course.id when the button is clicked.
   * The parent dispatches enrollInCourse({ courseId }) or unenrollFromCourse.
   *
   * WHY @Output instead of direct store.dispatch:
   *   Decouples the card from NgRx — it becomes a "dumb" presentational component.
   *   The test can simply spy on enrollRequested.emit and click the button,
   *   without needing to configure a MockStore.
   */
  @Output() enrollRequested = new EventEmitter<number>();

  /**
   * Step 105: ngOnChanges — called whenever an @Input value changes.
   * console.log is spied on in the test to verify it fires with the right message.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course'] && changes['course'].currentValue) {
      console.log(`CourseCard: course changed to "${changes['course'].currentValue.name}"`);
    }
  }

  /** Emits the course id — parent decides whether to enroll or unenroll */
  onEnrollClick(): void {
    this.enrollRequested.emit(this.course.id);
  }
}
