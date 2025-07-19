import { MovieDto } from '../dto/movie-dto.model';
import { Movie } from '../models/movie.model';

export function mapMovieDtoToMovie(dto: MovieDto): Movie {
  return {
    id: dto.id,
    overview: dto.overview,
    poster_path: dto.poster_path,
    title: dto.title,
  };
}
