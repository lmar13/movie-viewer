import { Movie } from '../models/movie.model';

export interface MoviesState {
  currentPage: number;
  moviesByPage: Record<number, Movie[]>;
}

export const initialState: MoviesState = {
  currentPage: 1,
  moviesByPage: [],
};
