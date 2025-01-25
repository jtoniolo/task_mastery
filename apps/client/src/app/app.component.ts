import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppFacade } from './+state/app.facade';

@Component({
  selector: 'tsm-root',
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly #facade = inject(AppFacade);
  title = 'Task Mastery';
  ngOnInit(): void {
    // Initialize the app state!
    this.#facade.init();
  }

  links = [
    {
      route: 'dashboard',
      isActive: true,
      label: 'Dashboard',
      icon: 'dashboard',
    },
    { route: 'tasks', isActive: false, label: 'Tasks', icon: 'list' },
    { route: 'projects', isActive: false, label: 'Projects', icon: 'work' },
    { route: 'profile', isActive: false, label: 'Profile', icon: 'person' },
  ];

  showInfo(link: any): void {}
}
