/*
 * Steps 96, 98, 100: CourseListComponent — full NgRx flow
 * =========================================================
 * This component is the orchestrator:
 *   - Dispatches loadCourses() on ngOnInit
 *   - Selects courses$, loading$, error$ from the course slice
 *   - Selects enrolledIds$ from the enrollment slice
 *   - Passes enrolledIds (via async pipe unwrap) to each CourseCard as @Input
 *
 * Step 98 — Full flow:
 *   dispatch loadCourses()
 *     → CourseEffects.loadCourses$ fires HTTP
 *       → loadCoursesSuccess dispatched
 *         → courseReducer updates state
 *           → selectAllCourses selector emits
 *             → async pipe triggers CD
 *               → component re-renders
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { loadCourses } from '../../store/course/course.actions';
import {
  selectAllCourses,
  selectCoursesLoading,
  selectCoursesError,
} from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  // Step 100: Used to pass enrolled IDs to each CourseCard
  enrolledIds$: Observable<number[]>;

  constructor(private store: Store) {
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
  }

  ngOnInit(): void {
    // Kicks off the CourseEffects.loadCourses$ Effect
    this.store.dispatch(loadCourses());
  }
}
