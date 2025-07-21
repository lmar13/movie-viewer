import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { fadeSlideIn } from '../../shared/animations';
import { MoviesState } from '../../store/movie.state';
import { selectMovieById } from './../../store/movies.selectors';

@Component({
  selector: 'app-details',
  imports: [MatCardModule, AsyncPipe, NgIf, MatIconModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  animations: [fadeSlideIn],
})
export class DetailsComponent {
  store = inject(Store<MoviesState>);
  movieId$ = new BehaviorSubject(0);
  movie$: Observable<Movie | undefined> = this.movieId$.pipe(switchMap(id => this.store.select(selectMovieById(id))));

  @Input()
  set movieId(movieId: string) {
    this.movieId$.next(Number(movieId));
  }
}
