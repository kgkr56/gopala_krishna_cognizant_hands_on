/*
 * Step 96: CourseListComponent — NgRx-connected
 * ===============================================
 * Instead of injecting CourseService and calling getCourses() directly,
 * this component:
 *   1. Dispatches loadCourses() on ngOnInit  → triggers the Effect
 *   2. Selects courses$ / loading$ / error$ from the Store via selectors
 *   3. Renders the list via the async pipe  → no manual subscribe/unsubscribe
 *
 * WHY the async pipe:
 *   - Automatically subscribes and unsubscribes (no memory leaks)
 *   - Triggers change detection only when the Observable emits
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

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  // Observables from the store — rendered with async pipe in the template
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);
  }

  ngOnInit(): void {
    // Step 96: Dispatch triggers the loadCourses$ Effect in course.effects.ts
    this.store.dispatch(loadCourses());
  }
}
