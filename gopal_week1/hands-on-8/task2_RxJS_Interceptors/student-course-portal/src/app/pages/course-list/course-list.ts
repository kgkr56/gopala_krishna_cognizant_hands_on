import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {
  courses = this.courseService.getCourses();

  constructor(private courseService: CourseService) {}

  addCourse(): void {
    const newId = this.courses.length ? Math.max(...this.courses.map((course) => course.id)) + 1 : 1;
    this.courseService.addCourse({
      id: newId,
      name: `New Course ${newId}`,
      code: `NEW${newId}`,
      credits: 3,
      gradeStatus: 'pending',
    });
  }
}
