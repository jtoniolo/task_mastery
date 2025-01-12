import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppFacade } from '../+state/app.facade';
import { AppState } from '../+state/app.reducer';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore;
  const initialState: AppState = {
    apiBaseUrl: '',
    title: 'Email Sweeperr',
    loaded: false,
    profile: {
      email: 'jeff@example.com',
      firstName: 'Jeff',
      lastName: 'Anderson',
      username: 'jeff',
      picture: 'https://example.com/jeff.jpg',
      accessToken: 'abc123',
      refreshToken: 'def456',
      lastLogin: new Date().toISOString(),
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [AppFacade, provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    store.setState(initialState);
    expect(component).toBeTruthy();
  });
});
