import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, RouterOutlet],
  template: '<app-header></app-header><main><router-outlet></router-outlet></main>',
})
export class App {
  title = 'student-course-portal';
}
