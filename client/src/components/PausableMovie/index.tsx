import { useCallback, useRef, useState } from 'react';
import { getGifPath, getMoviePath, getMoviePostarPath, getPrefersReducedMotion } from '../../utils';
import { AspectRatio } from '../AspectRatio';

import { FaPause, FaPlay } from 'react-icons/fa';

type Props = {
  id: string;
};

export const PausableMovie = ({ id }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const prefersReducedMotion = getPrefersReducedMotion();
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);

  const handleClick = useCallback(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    setIsPlaying((prev) => {
      prev ? video.pause() : video.play();
      return !prev;
    });
  }, []);

  return (
    <AspectRatio ratio={1}>
      <button type="button" className="group relative block w-full h-full" onClick={handleClick}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          disablePictureInPicture
          loop
          muted
          playsInline
          autoPlay={!prefersReducedMotion}
          preload="metadata"
          poster={getMoviePostarPath(id)}
        >
          <source src={getMoviePath(id)} type="video/webm" />
          <img src={getGifPath(id)} alt={`${id}.gif`} />
        </video>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 text-white text-3xl bg-black bg-opacity-50 rounded-full transform opacity-0 group-hover:opacity-100">
          {isPlaying ? (
            <FaPause className="inline-block leading-none fill-current" />
          ) : (
            <FaPlay className="inline-block leading-none fill-current" />
          )}
        </div>
      </button>
    </AspectRatio>
  );
};
