import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { ListApiService } from '../../services/list-api.service';

@Component({
  selector: 'app-list',
  imports: [AsyncPipe, RouterOutlet, RouterLink, MatTableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  movies$: Observable<Movie[]>;
  listApi = inject(ListApiService);
  displayedColumns = ['index', 'title', 'actions'];

  constructor() {
    this.movies$ = this.listApi.getMovies();
  }
}
