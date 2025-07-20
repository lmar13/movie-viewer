import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Movie } from '../../models/movie.model';
import { fadeSlideIn } from '../../shared/animations';

@Component({
  selector: 'app-list',
  imports: [MatTableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  animations: [fadeSlideIn],
})
export class ListComponent {
  @Input() movies: Movie[] = [];
  @Input() currentPage = 1;
  @Output() rowClick = new EventEmitter<Movie>();

  displayedColumns: string[] = ['index', 'title'];

  onRowClick(movie: Movie) {
    this.rowClick.emit(movie);
  }
}
