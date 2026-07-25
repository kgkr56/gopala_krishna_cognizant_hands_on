import { Component } from '@angular/core';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
  enrolledCourses = this.enrollmentService.getEnrolledCourses();

  constructor(private enrollmentService: EnrollmentService) {}
}
