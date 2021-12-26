import { useState } from 'react';
import { useCallback, useRef } from 'react';

import { FaPause, FaPlay } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { Sound } from '../../types';
import { getSoundPath } from '../../utils';
import { AspectRatio } from '../AspectRatio';

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
    <div className="flex items-center justify-center w-full h-full bg-gray-300">
      <audio ref={audioRef} loop={true} onTimeUpdate={handleTimeUpdate} src={soundPath} />
      <div className="p-2">
        <button
          className="flex items-center justify-center w-8 h-8 text-white text-sm bg-blue-600 rounded-full hover:opacity-75"
          onClick={handleTogglePlaying}
          type="button"
          aria-label="sound play/pause"
        >
          {isPlaying ? (
            <FaPause className="inline-block leading-none fill-current" style={{ verticalAlign: '-0.125rem' }} />
          ) : (
            <FaPlay className="inline-block leading-none fill-current" style={{ verticalAlign: '-0.125rem' }} />
          )}
        </button>
      </div>
      <div className="flex flex-col flex-grow flex-shrink pt-2 min-w-0 h-full">
        <p className="whitespace-nowrap text-sm font-bold overflow-hidden overflow-ellipsis">{sound.title}</p>
        <p className="text-[#565b67] whitespace-nowrap text-sm overflow-hidden overflow-ellipsis">{sound.artist}</p>
        <div className="pt-2">
          <AspectRatio ratio={10 / 1}>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 w-full h-full">
                {data ? (
                  <svg
                    className="w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 1"
                    dangerouslySetInnerHTML={{ __html: data }}
                  />
                ) : (
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1" />
                )}
              </div>
              <div
                className="absolute inset-0 w-full h-full bg-gray-300 opacity-75"
                style={{ left: `${currentTimeRatio * 100}%` }}
              ></div>
            </div>
          </AspectRatio>
        </div>
      </div>
    </div>
  );
};
