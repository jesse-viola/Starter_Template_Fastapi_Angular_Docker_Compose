import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header class="container">
      <h1>Mini Shop Test</h1>
      <nav>
        <a routerLink="/">Items</a>
      </nav>
    </header>
    <main class="container">
      <router-outlet />
    </main>
  `,
  styles: [`
    .container { padding: 16px; }
    nav a { margin-right: 12px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent { }
