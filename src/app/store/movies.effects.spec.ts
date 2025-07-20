import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';

import { Movie } from '../models/movie.model';
import { ListApiService } from '../services/list-api.service';
import { MoviesState } from './movie.state';
import * as MoviesActions from './movies.actions';
import { MoviesEffects } from './movies.effects';

describe('MoviesEffects', () => {
  let actions$: Observable<any>;
  let effects: MoviesEffects;
  let store: MockStore<{ movies: MoviesState }>;
  let listApiService: jasmine.SpyObj<ListApiService>;

  const initialState: MoviesState = {
    currentPage: 1,
    moviesByPage: {},
  };

  beforeEach(() => {
    const listApiSpy = jasmine.createSpyObj('ListApiService', ['getMovies']);

    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: { movies: initialState },
        }),
        provideMockActions(() => actions$),
        MoviesEffects,
        { provide: ListApiService, useValue: listApiSpy },
      ],
    });

    store = TestBed.inject(MockStore);
    effects = TestBed.inject(MoviesEffects);

    listApiService = TestBed.inject(ListApiService) as jasmine.SpyObj<ListApiService>;
  });

  describe('loadMoviesFromApi$', () => {
    it('should dispatch loadMovies on success', done => {
      const page = 1;
      const movies: Movie[] = [{ id: 1, title: 'Movie 1', overview: 'desc', poster_path: 'path' }];

      listApiService.getMovies.and.returnValue(of(movies));

      const action = MoviesActions.loadMoviesFromApi({ page });
      actions$ = of(action);

      effects.loadMoviesFromApi$.subscribe(result => {
        expect(result).toEqual(MoviesActions.loadMovies({ movies, page }));
        done();
      });
    });
  });

  describe('getMoviesState$', () => {
    it('should dispatch loadMovies if movies exist in store', done => {
      const page = 1;
      const stateWithMovies: MoviesState = {
        currentPage: 1,
        moviesByPage: {
          1: [{ id: 1, title: 'Movie 1', overview: 'desc', poster_path: 'path' }],
        },
      };

      store.setState({ movies: stateWithMovies });

      const action = MoviesActions.getMoviesPerPage({ page });
      actions$ = of(action);

      effects.getMoviesState$.subscribe(result => {
        expect(result).toEqual(
          MoviesActions.loadMovies({
            page,
            movies: stateWithMovies.moviesByPage[page],
          })
        );
        done();
      });
    });

    it('should dispatch loadMoviesFromApi if movies are missing', done => {
      const page = 2;

      const stateWithoutMovies: MoviesState = {
        currentPage: 1,
        moviesByPage: {},
      };

      store.setState({ movies: stateWithoutMovies });

      const action = MoviesActions.getMoviesPerPage({ page });
      actions$ = of(action);

      effects.getMoviesState$.subscribe(result => {
        expect(result).toEqual(MoviesActions.loadMoviesFromApi({ page }));
        done();
      });
    });
  });

  describe('changePage$', () => {
    it('should dispatch getMoviesPerPage when setCurrentPage is dispatched', done => {
      const page = 3;

      const action = MoviesActions.setCurrentPage({ page });
      actions$ = of(action);

      effects.changePage$.subscribe(result => {
        expect(result).toEqual(MoviesActions.getMoviesPerPage({ page }));
        done();
      });
    });
  });
});
