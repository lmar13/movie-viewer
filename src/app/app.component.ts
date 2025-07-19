import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { ListApiService } from './services/list-api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'movie-viewer-viabill';
  movies$: Observable<any>;

  constructor(private listApiService: ListApiService) {
    this.movies$ = this.listApiService.getMovies();
  }
}
