import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from './movie.state';

export const selectMoviesState = createFeatureSelector<MoviesState>('movies');

export const selectCurrentPage = createSelector(selectMoviesState, state => state.currentPage);

export const selectMovies = (page: number) =>
  createSelector(selectMoviesState, state => state.moviesByPage[page] || []);

export const selectMovieById = (id: number) =>
  createSelector(selectMoviesState, state =>
    Object.values(state.moviesByPage)
      .flat()
      .find(movie => movie.id === id)
  );
