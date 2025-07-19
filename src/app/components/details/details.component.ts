import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { MoviesState } from '../../store/movies.reducers';
import { selectMovieById } from '../../store/movies.selectors';

@Component({
  selector: 'app-details',
  imports: [MatCardModule, AsyncPipe, NgIf],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  store = inject(Store<MoviesState>);
  movie$: Observable<Movie> = of({} as Movie);

  @Input()
  set movieId(movieId: string) {
    this.movie$ = this.store.select(selectMovieById(movieId));
  }
}
