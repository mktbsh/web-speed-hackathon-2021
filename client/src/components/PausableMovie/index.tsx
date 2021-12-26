import { useCallback, useRef, useState } from 'react';
import { getMoviePath, getPrefersReducedMotion } from '../../utils';
import { AspectRatio } from '../AspectRatio';

import { FontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIcon';

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
    <AspectRatio aspectHeight={1} aspectWidth={1}>
      <button
        type="button"
        aria-label="video play/pause"
        className="group relative block w-full h-full"
        onClick={handleClick}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          disablePictureInPicture
          loop
          muted
          playsInline
          autoPlay={!prefersReducedMotion}
          preload="metadata"
        >
          <source src={getMoviePath(id, 'webm')} type="video/webm" />
        </video>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 text-white text-3xl bg-black bg-opacity-50 rounded-full transform opacity-0 group-hover:opacity-100">
          <FontAwesomeIcon iconType={isPlaying ? 'pause' : 'play'} styleType="solid" />
        </div>
      </button>
    </AspectRatio>
  );
};
