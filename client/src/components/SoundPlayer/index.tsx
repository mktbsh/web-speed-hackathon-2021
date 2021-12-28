import { useState } from 'react';
import { useCallback, useRef } from 'react';

import { useQuery } from 'react-query';
import { Sound } from '../../types';
import { getSoundPath } from '../../utils';
import { AspectRatio } from '../AspectRatio';
import { FontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIcon';

import styles from './index.module.css';

type Props = {
  sound: Sound;
};

export const SoundPlayer = ({ sound }: Props) => {
  const soundPath = getSoundPath(sound.id);
  const soundSvgPath = soundPath.replace('.mp3', '.svg');

  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTimeRatio, setCurrentTimeRatio] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { data } = useQuery(soundSvgPath, async () => await fetch(soundSvgPath).then((res) => res.text()));

  const handleTimeUpdate: React.ReactEventHandler<HTMLAudioElement> = useCallback((ev) => {
    const el = ev.currentTarget;
    setCurrentTimeRatio(el.currentTime / el.duration);
  }, []);

  const handleTogglePlaying = useCallback(() => {
    setIsPlaying((prev) => {
      const audio = audioRef.current;
      prev ? audio?.pause() : audio?.play();
      return !prev;
    });
  }, []);

  return (
    <div className={styles.container}>
      <audio ref={audioRef} loop={true} onTimeUpdate={handleTimeUpdate} src={soundPath} />
      <div className={styles.toggle}>
        <button onClick={handleTogglePlaying} type="button" aria-label="sound play/pause">
          <FontAwesomeIcon iconType={isPlaying ? 'pause' : 'play'} styleType="solid" />
        </button>
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{sound.title}</p>
        <p className={styles.author}>{sound.artist}</p>
        <div className="pt-2">
          <AspectRatio aspectHeight={1} aspectWidth={10}>
            <div className={styles.wave_container}>
              <div className={styles.wave}>
                {data && (
                  <svg preserveAspectRatio="none" viewBox="0 0 100 1" dangerouslySetInnerHTML={{ __html: data }} />
                )}
              </div>
              <div className={styles.current} style={{ left: `${currentTimeRatio * 100}%` }}></div>
            </div>
          </AspectRatio>
        </div>
      </div>
    </div>
  );
};
