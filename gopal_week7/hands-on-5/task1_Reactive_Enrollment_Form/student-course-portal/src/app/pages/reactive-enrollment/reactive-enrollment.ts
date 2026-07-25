import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-enrollment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment.html',
  styleUrl: './reactive-enrollment.css',
})
export class ReactiveEnrollmentForm {
  enrollForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email]],
      courseId: [null, Validators.required],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
    });
  }

  get studentNameControl(): FormControl {
    return this.enrollForm.get('studentName') as FormControl;
  }

  get studentEmailControl(): FormControl {
    return this.enrollForm.get('studentEmail') as FormControl;
  }

  get courseIdControl(): FormControl {
    return this.enrollForm.get('courseId') as FormControl;
  }

  onSubmit(): void {
    console.log('Form value:', this.enrollForm.value);
    console.log('Form raw value:', this.enrollForm.getRawValue());
    // enrollForm.value excludes disabled controls; getRawValue() includes them.
  }
}
