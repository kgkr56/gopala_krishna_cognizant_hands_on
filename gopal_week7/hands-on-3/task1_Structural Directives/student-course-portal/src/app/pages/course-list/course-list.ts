import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  // Step 25: isLoading controls the loading state shown via *ngIf.
  // Initially true — the loading message is rendered; the course grid is not.
  isLoading = true;

  constructor(private cdr: ChangeDetectorRef) {}

  selectedCourseId: number | null = null;

  // Step 27: Each course now includes gradeStatus for the *ngSwitch badge.
  // Step 28: Starts as a populated array; set to [] to test the empty template.
  courses: Course[] = [
    { id: 1, name: 'Angular Basics',         code: 'ANG-101', credits: 3, enrolled: true,  gradeStatus: 'passed'  },
    { id: 2, name: 'TypeScript Fundamentals', code: 'TS-202',  credits: 4, enrolled: false, gradeStatus: 'failed'  },
    { id: 3, name: 'Web Development',         code: 'WEB-303', credits: 3, enrolled: true,  gradeStatus: 'pending' },
    { id: 4, name: 'UX Design',               code: 'UX-404',  credits: 2, enrolled: false, gradeStatus: 'passed'  },
    { id: 5, name: 'Backend APIs',            code: 'API-505', credits: 3, enrolled: true,  gradeStatus: 'pending' },
  ];

  ngOnInit(): void {
    // Step 25: Simulate an async data fetch.
    // After 1.5 s, isLoading flips to false — Angular's *ngIf then removes the
    // loading message from the DOM and adds the course grid in its place.
    setTimeout(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 1500);
  }

  onEnroll(courseId: number): void {
    this.selectedCourseId = courseId;
    console.log('Enrolling in course:', courseId);
  }

  /**
   * Step 26: trackBy function for *ngFor.
   *
   * WHY trackBy IMPROVES PERFORMANCE:
   * Without trackBy, Angular has no stable identity for list items.
   * On every change detection cycle where the array reference changes,
   * Angular destroys and recreates every DOM node in the list — even if
   * only one item changed.  trackBy gives Angular a unique key (course.id)
   * so it can diff the list and only update the items that actually changed.
   * For large lists this can eliminate hundreds of unnecessary DOM operations.
   */
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }
}
