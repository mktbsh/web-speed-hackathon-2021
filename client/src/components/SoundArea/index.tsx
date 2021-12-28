import { Sound } from '../../types';
import { SoundPlayer } from '../SoundPlayer';
import css from './index.module.css';

type Props = {
  sound: Sound;
};

export const SoundArea = ({ sound }: Props) => {
  return (
    <div className={css.container}>
      <SoundPlayer sound={sound} />
    </div>
  );
};
