import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, of, withLatestFrom } from 'rxjs';
import { ListApiService } from '../services/list-api.service';
import * as MoviesActions from './movies.actions';
import { MoviesState } from './movies.reducers';

@Injectable()
export class MoviesEffects {
  private actions$: Actions = inject(Actions);
  private apiService: ListApiService = inject(ListApiService);
  private store: Store<{ movies: MoviesState }> = inject(Store<{ movies: MoviesState }>);

  loadMovieFromApiById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMovieFromApiById),
      mergeMap(({ id }) => this.apiService.getMovieById(id).pipe(map(movie => MoviesActions.loadMovieById({ movie }))))
    )
  );

  getMovieState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.getMovieById),
      withLatestFrom(this.store),
      mergeMap(([{ id }, state]) => {
        const movie = state.movies.savedMovies[id];
        return movie ? of(MoviesActions.loadMovieById({ movie })) : of(MoviesActions.loadMovieFromApiById({ id }));
      })
    )
  );

  changePage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.setCurrentPage),
      withLatestFrom(this.store),
      mergeMap(() => of(MoviesActions.clearSavedMovies()))
    )
  );
}
