import { createAction, props } from '@ngrx/store';
import { Movie } from '../models/movie.model';

export const setCurrentPage = createAction('[Movies] Set Current Page', props<{ page: number }>());

export const loadMoviesFromApi = createAction('[Movie] Load Movies From Api', props<{ page: number }>());

export const loadMovies = createAction('[Movie] Load Movies Per Page', props<{ movies: Movie[]; page: number }>());

export const getMoviesPerPage = createAction('[Movie] Get Movies Per Page', props<{ page: number }>());
