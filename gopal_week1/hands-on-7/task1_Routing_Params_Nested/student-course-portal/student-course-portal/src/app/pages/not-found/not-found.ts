import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <section>
      <h2>404 — Page Not Found</h2>
      <p>The requested page does not exist.</p>
    </section>
  `,
})
export class NotFound {}
