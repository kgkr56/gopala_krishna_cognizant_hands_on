import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard {
  // @Input receives the course data from the parent CourseListComponent
  @Input() course: Course = {
    id: 0,
    name: '',
    code: '',
    credits: 0,
    enrolled: false,
    gradeStatus: 'pending',
  };

  @Output() enrollRequested = new EventEmitter<number>();

  onEnroll(): void {
    this.enrollRequested.emit(this.course.id);
  }
}
