import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="header-nav">
      <div class="brand">Student Course Portal</div>
      <ul class="nav-links">
        <li><a routerLink="/courses">Courses</a></li>
      </ul>
    </nav>
  `,
  styles: [`
    .header-nav { display:flex; justify-content:space-between; align-items:center; padding:1rem 2rem; background:#1a237e; color:#fff; }
    .brand { font-size:1.25rem; font-weight:700; }
    .nav-links { list-style:none; display:flex; gap:1rem; margin:0; padding:0; }
    .nav-links a { color:#fff; text-decoration:none; }
  `],
})
export class Header {}
