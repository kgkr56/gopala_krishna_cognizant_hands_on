import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CourseCard } from '../../components/course-card/course-card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard, FormsModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {
  courses = this.courseService.getCourses();
  searchTerm: string | null = null;

  constructor(private courseService: CourseService, private router: Router, private route: ActivatedRoute) {
    this.searchTerm = this.route.snapshot.queryParamMap.get('search');
  }

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

  onSearchChange(): void {
    this.router.navigate(['courses'], { queryParams: { search: this.searchTerm } });
  }

  goToCourse(id: number): void {
    this.router.navigate(['courses', id]);
  }
}
