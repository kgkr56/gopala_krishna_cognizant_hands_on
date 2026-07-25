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
  isLoading = true;
  selectedCourseId: number | null = null;

  courses: Course[] = [
    { id: 1, name: 'Angular Basics',         code: 'ANG-101', credits: 3, enrolled: true,  gradeStatus: 'passed'  },
    { id: 2, name: 'TypeScript Fundamentals', code: 'TS-202',  credits: 4, enrolled: false, gradeStatus: 'failed'  },
    { id: 3, name: 'Web Development',         code: 'WEB-303', credits: 3, enrolled: true,  gradeStatus: 'pending' },
    { id: 4, name: 'UX Design',               code: 'UX-404',  credits: 2, enrolled: false, gradeStatus: 'passed'  },
    { id: 5, name: 'Backend APIs',            code: 'API-505', credits: 3, enrolled: true,  gradeStatus: 'pending' },
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 1500);
  }

  onEnroll(courseId: number): void {
    this.selectedCourseId = courseId;
    console.log('Enrolling in course:', courseId);
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }
}
