import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  template: `
    <section *ngIf="course">
      <h2>{{ course.name }} ({{ course.code }})</h2>
      <p>Credits: {{ course.credits }}</p>
      <p>Status: {{ course.gradeStatus }}</p>
    </section>
    <section *ngIf="!course">
      <p>Course not found.</p>
    </section>
  `,
})
export class CourseDetail implements OnInit {
  course: Course | undefined;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.course = this.courseService.getCourseById(id);
  }
}
