import { Movie } from '../models/movie.model';
import { initialState } from './movie.state';
import * as MoviesActions from './movies.actions';
import { moviesReducer } from './movies.reducer';

describe('moviesReducer', () => {
  it('should return the initial state when an unknown action is passed', () => {
    const action = { type: 'UNKNOWN' } as any;
    const state = moviesReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should update currentPage on setCurrentPage action', () => {
    const action = MoviesActions.setCurrentPage({ page: 3 });
    const state = moviesReducer(initialState, action);

    expect(state.currentPage).toBe(3);
  });

  it('should add movies to the correct page on loadMovies action', () => {
    const movies: Movie[] = [{ id: 1, title: 'Movie 1' } as Movie, { id: 2, title: 'Movie 2' } as Movie];

    const page = 2;
    const action = MoviesActions.loadMovies({ movies, page });
    const state = moviesReducer(initialState, action);

    expect(state.moviesByPage[page]).toEqual(movies);
  });

  it('should preserve existing movies while adding new page in moviesByPage', () => {
    const stateWithMovies = {
      ...initialState,
      moviesByPage: {
        1: [{ id: 10, title: 'Old Movie' } as Movie],
      },
    };

    const newMovies = [{ id: 20, title: 'New Movie' } as Movie];
    const action = MoviesActions.loadMovies({ movies: newMovies, page: 2 });

    const state = moviesReducer(stateWithMovies, action);

    expect(state.moviesByPage[1]).toEqual([{ id: 10, title: 'Old Movie' } as Movie]);
    expect(state.moviesByPage[2]).toEqual(newMovies);
  });
});
