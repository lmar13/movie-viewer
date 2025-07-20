import { createReducer, on } from '@ngrx/store';
import { initialState } from './movie.state';
import * as MoviesActions from './movies.actions';

export const moviesReducer = createReducer(
  initialState,

  on(MoviesActions.setCurrentPage, (state, { page }) => ({
    ...state,
    currentPage: page,
  })),

  on(MoviesActions.loadMoviesFromApi, state => ({
    ...state,
  })),

  on(MoviesActions.loadMovies, (state, { movies, page }) => ({
    ...state,
    moviesByPage: {
      ...state.moviesByPage,
      [page]: movies,
    },
  }))
);
