import { Routes } from '@angular/router';
import { EnrollmentForm } from '../../pages/enrollment-form/enrollment-form';
import { UnsavedChangesGuard } from '../../guards/unsaved-changes.guard';

export const enrollmentRoutes: Routes = [
  { path: '', component: EnrollmentForm, canDeactivate: [UnsavedChangesGuard] }
];
