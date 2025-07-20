import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { MoviesState } from '../../store/movie.state';
import { selectMovieById } from './../../store/movies.selectors';

@Component({
  selector: 'app-details',
  imports: [MatCardModule, AsyncPipe, NgIf],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  store = inject(Store<MoviesState>);
  movieId$ = new BehaviorSubject(0);
  movie$: Observable<Movie> = this.movieId$.pipe(switchMap(id => this.store.select(selectMovieById(id))));

  @Input()
  set movieId(movieId: string) {
    this.movieId$.next(Number(movieId));
  }
}
