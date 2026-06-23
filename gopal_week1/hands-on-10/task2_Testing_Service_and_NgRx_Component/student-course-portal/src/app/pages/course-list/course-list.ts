/*
 * CourseListComponent — NgRx-connected
 * ======================================
 * Tested in Steps 109–110 using MockStore.
 * - Dispatches loadCourses() on ngOnInit
 * - Renders course cards when courses are in the store
 * - Shows the loading indicator when loading = true
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
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';

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
  enrolledIds$: Observable<number[]>;

  constructor(private store: Store) {
    this.courses$    = this.store.select(selectAllCourses);
    this.loading$    = this.store.select(selectCoursesLoading);
    this.error$      = this.store.select(selectCoursesError);
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
  }

  onEnrollRequested(courseId: number, enrolledIds: number[]): void {
    if (enrolledIds.includes(courseId)) {
      this.store.dispatch(unenrollFromCourse({ courseId }));
    } else {
      this.store.dispatch(enrollInCourse({ courseId }));
    }
  }
}
