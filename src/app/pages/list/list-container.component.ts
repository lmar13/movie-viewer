import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { ListApiService } from '../../services/list-api.service';
import { MoviesState } from '../../store/movie.state';
import { setCurrentPage } from '../../store/movies.actions';
import { selectCurrentPage, selectMovies } from '../../store/movies.selectors';

@Component({
  selector: 'app-list',
  imports: [NgIf, AsyncPipe, RouterOutlet, RouterLink, MatTableModule, MatPaginatorModule],
  templateUrl: './list-container.component.html',
  styleUrl: './list-container.component.scss',
})
export class ListContainerComponent implements OnInit {
  listApi = inject(ListApiService);
  store = inject(Store<MoviesState>);
  displayedColumns = ['index', 'title'];
  currentPage$ = this.store.select(selectCurrentPage);
  movies$ = this.currentPage$.pipe(switchMap(page => this.store.select(selectMovies(page))));

  readonly MAX_PAGE = 10;
  readonly PAGE_SIZE = 20;

  ngOnInit(): void {
    this.store.dispatch(setCurrentPage({ page: 1 }));
  }

  handlePageEvent(e: PageEvent) {
    this.store.dispatch(setCurrentPage({ page: e.pageIndex + 1 }));
  }
}
