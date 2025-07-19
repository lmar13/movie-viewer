import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
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
  imports: [NgIf, AsyncPipe, RouterOutlet, RouterLink, MatTableModule, MatPaginatorModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  movies$: Observable<Movie[]>;
  listApi = inject(ListApiService);
  store = inject(Store<MoviesState>);
  displayedColumns = ['index', 'title'];
  currentPage$ = this.store.select(selectCurrentPage);

  readonly MAX_PAGE = 10;
  readonly PAGE_SIZE = 20;

  constructor() {
    this.movies$ = this.listApi.getMovies();
  }

  getDetails(id: string) {
    this.store.dispatch(getMovieById({ id }));
  }

  handlePageEvent(e: PageEvent) {
    this.store.dispatch(setCurrentPage({ page: e.pageIndex + 1 }));
    this.movies$ = this.listApi.getMovies(e.pageIndex + 1);
  }
}
