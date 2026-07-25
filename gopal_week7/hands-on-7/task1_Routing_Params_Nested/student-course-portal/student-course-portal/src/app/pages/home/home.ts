import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  courseCount = this.courseService.getCourses().length;

  constructor(private courseService: CourseService) {}
}
