import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, of, withLatestFrom } from 'rxjs';
import { ListApiService } from '../services/list-api.service';
import { MoviesState } from './movie.state';
import * as MoviesActions from './movies.actions';

@Injectable()
export class MoviesEffects {
  private actions$: Actions = inject(Actions);
  private listApiService: ListApiService = inject(ListApiService);
  private store: Store<{ movies: MoviesState }> = inject(Store<{ movies: MoviesState }>);

  loadMoviesFromApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMoviesFromApi),
      mergeMap(({ page }) =>
        this.listApiService.getMovies(page).pipe(map(movies => MoviesActions.loadMovies({ movies, page })))
      )
    )
  );

  getMoviesState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.getMoviesPerPage),
      withLatestFrom(this.store),
      mergeMap(([{ page }, state]) => {
        const movies = state.movies.moviesByPage[page];
        return movies && movies.length > 0
          ? of(MoviesActions.loadMovies({ page, movies }))
          : of(MoviesActions.loadMoviesFromApi({ page }));
      })
    )
  );

  changePage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.setCurrentPage),
      withLatestFrom(this.store),
      mergeMap(([{ page }]) => of(MoviesActions.getMoviesPerPage({ page })))
    )
  );
}
