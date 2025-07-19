import { createAction, props } from '@ngrx/store';
import { Movie } from '../models/movie.model';

export const setCurrentPage = createAction('[Movies] Set Current Page', props<{ page: number }>());

export const loadMovieFromApiById = createAction('[Movie] Load Movie From Api By Id', props<{ id: string }>());

export const loadMovieById = createAction('[Movie] Load Movie By Id', props<{ movie: Movie }>());

export const getMovieById = createAction('[Movie] Get Movie By Id', props<{ id: string }>());

export const clearSavedMovies = createAction('[Movie] Clear saved movies');
