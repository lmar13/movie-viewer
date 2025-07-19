import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListApiService {
  private http = inject(HttpClient);
  private baseApiUrl: string;

  constructor() {
    this.baseApiUrl = environment.apiUrl;
  }

  getMovies(page: number = 1) {
    return this.http.get(`${this.baseApiUrl}/movie/top_rated?language=en-US&page=${page}`).pipe(
      map((response: any) => response.results),
      catchError((error) => {
        console.error('Error fetching movies:', error);
        return of([]); // Return an empty array on error
      })
    );
  }
}
