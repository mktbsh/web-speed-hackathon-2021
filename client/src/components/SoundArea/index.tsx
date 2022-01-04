import { Sound } from '../../types';
import { SoundPlayer } from '../SoundPlayer';

type Props = {
  sound: Sound;
};

export const SoundArea = ({ sound }: Props) => {
  return (
    <div className="relative w-full h-full border border-gray-300 rounded-lg overflow-hidden">
      <SoundPlayer sound={sound} />
    </div>
  );
};
