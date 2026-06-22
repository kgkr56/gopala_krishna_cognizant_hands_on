import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  return typeof value === 'string' && value.startsWith('XX')
    ? { noCourseCode: true }
    : null;
}

export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = (control.value as string) || '';
      resolve(email.includes('test@') ? { emailTaken: true } : null);
    }, 800);
  });
}

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
      studentEmail: this.fb.control('', [Validators.required, Validators.email], [simulateEmailCheck]),
      courseId: ['', [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([]),
    });
  }

  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
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

  addCourse(): void {
    this.additionalCourses.push(new FormControl('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    console.log('Form value:', this.enrollForm.value);
    console.log('Form raw value:', this.enrollForm.getRawValue());
  }
}
