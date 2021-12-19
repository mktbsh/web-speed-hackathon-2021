import { Movie } from '../../types';
import { PausableMovie } from '../PausableMovie';

type Props = {
  movie: Movie;
};

export const MovieArea = ({ movie }: Props) => {
  return (
    <div className="h-full bg-gray-300 border boder-gray-300 rounded-lg overflow-hidden">
      <PausableMovie id={movie.id} />
    </div>
  );
};
