import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentForm {
  @ViewChild('enrollForm') enrollForm?: NgForm;

  // Step 39: Model properties bound via [(ngModel)]
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = '';
  agreeToTerms = false;

  /**
   * Step 46: submitted flag — toggled to true on a valid submit to show
   * the success banner via *ngIf.
   */
  submitted = false;

  /**
   * Step 40/46: onSubmit logs form.value and form.valid.
   * Sets submitted = true on a valid submission.
   */
  onSubmit(form: NgForm): void {
    console.log('Form value:', form.value);
    console.log('Form valid:', form.valid);

    if (form.valid) {
      this.submitted = true;
    }
  }

  /** Step 47: Reset clears all field values and all validation states. */
  onReset(form: NgForm): void {
    form.resetForm();
    this.submitted = false;
  }

  // Can be used by a CanDeactivate guard
  canDeactivate(): boolean {
    return !(this.enrollForm && this.enrollForm.dirty) || window.confirm('You have unsaved changes. Leave?');
  }
}
