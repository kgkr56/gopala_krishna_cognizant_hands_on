import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { enrollmentRoutes } from './enrollment-routing.module';

@NgModule({
  imports: [RouterModule.forChild(enrollmentRoutes)],
  exports: [RouterModule]
})
export class EnrollmentModule {}
