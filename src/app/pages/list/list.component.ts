import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { ListApiService } from '../../services/list-api.service';
import { getMovieById, setCurrentPage } from '../../store/movies.actions';
import { MoviesState } from '../../store/movies.reducers';
import { selectCurrentPage } from '../../store/movies.selectors';

@Component({
  selector: 'app-list',
  imports: [NgIf, AsyncPipe, RouterOutlet, RouterLink, MatTableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  movies$: Observable<Movie[]>;
  listApi = inject(ListApiService);
  store = inject(Store<MoviesState>);
  displayedColumns = ['index', 'title'];
  currentPage$ = this.store.select(selectCurrentPage);

  private readonly MAX_PAGE = 10;

  constructor() {
    this.movies$ = this.listApi.getMovies();
  }

  getDetails(id: string) {
    this.store.dispatch(getMovieById({ id }));
  }

  nextPage(page: number) {
    const nPage = Math.min(page + 1, this.MAX_PAGE);
    this.store.dispatch(setCurrentPage({ page: nPage }));
    this.movies$ = this.listApi.getMovies(nPage);
  }

  prevPage(page: number) {
    const pPage = Math.max(page - 1, 1);
    this.store.dispatch(setCurrentPage({ page: pPage }));
    this.movies$ = this.listApi.getMovies(pPage);
  }
}
