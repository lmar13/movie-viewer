import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieDtoPage } from '../dto/movie-dto.model';
import { mapMovieDtoToMovie } from '../mappers/movie.mapper';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class ListApiService {
  private http = inject(HttpClient);
  private baseApiUrl: string;

  constructor() {
    this.baseApiUrl = environment.apiUrl;
  }

  getMovies(page = 1): Observable<Movie[]> {
    return this.http.get<MovieDtoPage>(`${this.baseApiUrl}/movie/top_rated?language=en-US&page=${page}`).pipe(
      map(response => response.results),
      map(movies => movies.map(movie => mapMovieDtoToMovie(movie))),
      catchError(error => {
        console.error('Error fetching movies:', error); // this can be send for example to ErrorHandler and than to Sentry
        return of([]);
      })
    );
  }
}
