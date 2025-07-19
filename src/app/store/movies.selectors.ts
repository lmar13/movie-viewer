import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from './movies.reducers';

export const selectMoviesState = createFeatureSelector<MoviesState>('movies');

export const selectCurrentPage = createSelector(selectMoviesState, state => state.currentPage);

export const selectMovieById = (id: string) =>
  createSelector(selectMoviesState, state => state.savedMovies[id] || null);
