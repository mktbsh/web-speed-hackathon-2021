import { useCallback, useRef, useState } from 'react';
import { classNames, getMoviePath, getPrefersReducedMotion } from '../../utils';
import { AspectRatio } from '../AspectRatio';

import { FontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIcon';

import styles from './index.module.css';

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
      <button type="button" aria-label="video play/pause" className={`group ${styles.button}`} onClick={handleClick}>
        <video
          ref={videoRef}
          disablePictureInPicture
          loop
          muted
          playsInline
          autoPlay={!prefersReducedMotion}
          poster={getMoviePath(id, 'webp')}
          preload="metadata"
        >
          <source src={getMoviePath(id, 'webm')} type="video/webm" />
        </video>
        <div className={isPlaying ? styles.playing : ''}>
          <FontAwesomeIcon iconType={isPlaying ? 'pause' : 'play'} styleType="solid" />
        </div>
      </button>
    </AspectRatio>
  );
};
