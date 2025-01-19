import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { gmailApiActions, gmailPageActions } from './gmail.actions';
import { gmailFeature } from './gmail.reducer';

@Injectable()
export class GmailFacade {
  private readonly store = inject(Store);

  gmailOpen() {
    this.store.dispatch(gmailPageActions.open());
  }

  loadLabels(force: boolean = false) {
    this.store
      .select(gmailFeature.selectLabelsIsLoaded)
      .subscribe((isLoaded) => {
        if (!isLoaded || force) {
          this.store.dispatch(gmailApiActions.loadLabels());
        }
      });
  }

  state$ = this.store.pipe(select(gmailFeature.selectGmailState));
  labels$ = this.store.pipe(select(gmailFeature.selectLabels));
}
