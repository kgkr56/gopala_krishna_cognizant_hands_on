import { Component } from '@angular/core';

@Component({
  selector: 'app-courses-layout',
  standalone: true,
  template: `
    <h1>Courses</h1>
    <router-outlet></router-outlet>
  `,
})
export class CoursesLayout {}
