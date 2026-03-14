import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-shell">
      <header class="app-navbar">
        <div class="navbar-brand">
          <span class="brand-icon">💳</span>
          <span class="brand-name">Payments<strong>Portal</strong></span>
        </div>
        <div class="navbar-meta">
          <span class="nav-badge">Live</span>
        </div>
      </header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrl: './app.css',
})
export class App {}

