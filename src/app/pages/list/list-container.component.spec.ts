import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Movie } from '../../models/movie.model';
import { setCurrentPage } from '../../store/movies.actions';
import { ListContainerComponent } from './list-container.component';

describe('ListContainerComponent', () => {
  let component: ListContainerComponent;
  let fixture: ComponentFixture<ListContainerComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  const initialState = {
    movies: {
      currentPage: 1,
      moviesByPage: {},
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListContainerComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideMockStore({ initialState }),
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    router = TestBed.inject(Router);
    navigateSpy = router.navigate as jasmine.Spy;

    fixture = TestBed.createComponent(ListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch setCurrentPage with 1 on ngOnInit', () => {
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(setCurrentPage({ page: 1 }));
  });

  it('should dispatch setCurrentPage when handlePageEvent is called', () => {
    const event: PageEvent = { pageIndex: 2, pageSize: 20, length: 100 };
    component.handlePageEvent(event);
    expect(dispatchSpy).toHaveBeenCalledWith(setCurrentPage({ page: 3 }));

    const secondEvent: PageEvent = { pageIndex: 0, pageSize: 20, length: 100 };
    component.handlePageEvent(secondEvent);
    expect(dispatchSpy).toHaveBeenCalledWith(setCurrentPage({ page: 1 }));
  });

  it('should navigate to movie details on goToDetails', () => {
    const movie: Movie = { id: 42, title: 'Test Movie' } as Movie;
    component.goToDetails(movie);
    expect(navigateSpy).toHaveBeenCalledWith(['list', 42]);
  });
});
