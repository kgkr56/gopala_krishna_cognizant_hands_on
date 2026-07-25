import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  // FormsModule is required for template-driven forms — enables ngModel and ngForm
  imports: [FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentForm {
  // Step 39: Model properties bound via [(ngModel)] — each maps to a form.value key
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = '';
  agreeToTerms = false;

  /**
   * Step 40: onSubmit receives the NgForm instance via the template reference #enrollForm.
   * form.value  → plain object with each control's name as key.
   * form.valid  → true only when all validators pass.
   */
  onSubmit(form: NgForm): void {
    console.log('Form value:', form.value);
    console.log('Form valid:', form.valid);
  }
}
