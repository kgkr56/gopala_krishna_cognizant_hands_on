/*
 * StudentProfileComponent — uses the cross-slice selectEnrolledCourses selector
 * ==============================================================================
 * selectEnrolledCourses combines the course slice and enrollment slice to derive
 * a Course[] without duplicating state — demonstrating the cross-slice selector
 * pattern from Step 99.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
  // Step 99: cross-slice selector — joins course + enrollment state
  enrolledCourses$: Observable<Course[]>;

  constructor(private store: Store) {
    this.enrolledCourses$ = this.store.select(selectEnrolledCourses);
  }
}
