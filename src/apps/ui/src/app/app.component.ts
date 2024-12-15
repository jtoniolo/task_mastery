import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppFacade } from './+state/app.facade';
import { ApiService } from './services/api.service';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  #facade = inject(AppFacade);
  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.#facade.init();
    this.apiService.get('/api/data').subscribe((data) => {
      console.log(data);
    });
  }

  title = 'ui';
}
