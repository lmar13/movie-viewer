import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { MovieDtoPage } from '../dto/movie-dto.model';
import { Movie } from '../models/movie.model';
import { ListApiService } from './list-api.service';

describe('ListApiService', () => {
  let service: ListApiService;
  let httpTestingController: HttpTestingController;
  const mockBaseUrl = 'https://api.test.com';

  const mockMovieDto = {
    id: 1,
    title: 'Test Movie',
    overview: 'Test movie description',
    poster_path: '/test-poster.jpg',
    release_date: '2023-01-15',
    vote_average: 8.5,
    genre_ids: [28, 12],
    adult: false,
    backdrop_path: '/test-backdrop.jpg',
    original_language: 'en',
    original_title: 'Test Movie Original',
    popularity: 1000.5,
    video: false,
    vote_count: 2500,
  };

  const mockMovieDtoPage: MovieDtoPage = {
    page: 1,
    results: [mockMovieDto],
    total_pages: 10,
    total_results: 200,
  };

  beforeEach(() => {
    environment.apiUrl = mockBaseUrl;

    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ListApiService],
    });
    service = TestBed.inject(ListApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getMovies', () => {
    it('should handle movies in response', () => {
      const multipleMoviesResponse: MovieDtoPage = {
        ...mockMovieDtoPage,
        results: [
          mockMovieDto,
          { ...mockMovieDto, id: 2, title: 'Second Movie' },
          { ...mockMovieDto, id: 3, title: 'Third Movie' },
        ],
      };

      service.getMovies().subscribe({
        next: (movies: Movie[]) => {
          expect(movies.length).toBe(3);
          expect(movies[0].title).toBe('Test Movie');
          expect(movies[1].title).toBe('Second Movie');
          expect(movies[2].title).toBe('Third Movie');
        },
        error: () => fail('Expected successful response'),
      });

      const req = httpTestingController.expectOne(`${mockBaseUrl}/movie/top_rated?language=en-US&page=1`);
      req.flush(multipleMoviesResponse);
    });

    it('should handle empty response', () => {
      const emptyResponse: MovieDtoPage = {
        ...mockMovieDtoPage,
        results: [],
      };

      service.getMovies().subscribe({
        next: (movies: Movie[]) => {
          expect(movies).toEqual([]);
        },
        error: () => fail('Expected successful response'),
      });

      const req = httpTestingController.expectOne(`${mockBaseUrl}/movie/top_rated?language=en-US&page=1`);
      req.flush(emptyResponse);
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      spyOn(console, 'error');
    });

    it('should handle HTTP error and return empty array', () => {
      service.getMovies().subscribe({
        next: (movies: Movie[]) => {
          expect(movies).toEqual([]);
        },
        error: () => fail('Should not emit error, should return empty array'),
      });

      const req = httpTestingController.expectOne(`${mockBaseUrl}/movie/top_rated?language=en-US&page=1`);

      req.error(new ProgressEvent('Network error'), {
        status: 500,
        statusText: 'Internal Server Error',
      });

      expect(console.error).toHaveBeenCalledWith('Error fetching movies:', jasmine.any(Object));
    });
  });

  describe('Data Mapping', () => {
    it('should properly map DTO to Movie model', () => {
      service.getMovies().subscribe({
        next: (movies: Movie[]) => {
          const movie = movies[0];
          expect(movie.id).toBe(mockMovieDto.id);
          expect(movie.title).toBe(mockMovieDto.title);
          expect(movie).toBeDefined();
        },
      });

      const req = httpTestingController.expectOne(`${mockBaseUrl}/movie/top_rated?language=en-US&page=1`);
      req.flush(mockMovieDtoPage);
    });

    it('should handle malformed response data', () => {
      const malformedResponse = {
        results: [{ ...mockMovieDto, title: null }, mockMovieDto],
      };

      service.getMovies().subscribe({
        next: (movies: Movie[]) => {
          expect(movies).toBeDefined();
          expect(movies.length).toBe(2);
        },
        error: () => fail('Should handle malformed data'),
      });

      const req = httpTestingController.expectOne(`${mockBaseUrl}/movie/top_rated?language=en-US&page=1`);
      req.flush(malformedResponse);
    });
  });
});
