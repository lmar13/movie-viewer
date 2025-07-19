import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { ListApiService } from '../../services/list-api.service';

@Component({
  selector: 'app-list',
  imports: [NgFor, AsyncPipe, RouterOutlet, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  movies$: Observable<Movie[]>;
  listApi = inject(ListApiService);

  constructor() {
    this.movies$ = this.listApi.getMovies();
  }
}
