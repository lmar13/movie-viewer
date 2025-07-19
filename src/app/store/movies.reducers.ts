import { createReducer, on } from '@ngrx/store';
import { Movie } from '../models/movie.model';
import * as MoviesActions from './movies.actions';

export interface MoviesState {
  currentPage: number;
  savedMovies: Record<string, Movie>;
}

export const initialState: MoviesState = {
  currentPage: 1,
  savedMovies: {},
};

export const moviesReducer = createReducer(
  initialState,

  on(MoviesActions.setCurrentPage, (state, { page }) => ({
    ...state,
    currentPage: page,
  })),

  on(MoviesActions.loadMovieFromApiById, state => ({
    ...state,
  })),

  on(MoviesActions.loadMovieById, (state, { movie }) => ({
    ...state,
    savedMovies: {
      ...state.savedMovies,
      [movie.id]: movie,
    },
  })),

  on(MoviesActions.clearSavedMovies, state => ({
    ...state,
    savedMovies: {},
  }))
);
