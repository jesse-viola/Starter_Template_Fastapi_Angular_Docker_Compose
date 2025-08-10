import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, RouterLinkActive],
  template: `
  <nav>
    <a routerLink="" routerLinkActive="active">Home</a>
    <a routerLink="favorites" routerLinkActive="active">Favorites</a>
  </nav>
  <router-outlet></router-outlet>
`,
  styles: [`
    .container { padding: 16px; }
    nav a { margin-right: 12px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent { }
