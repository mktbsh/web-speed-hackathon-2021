import { classNames } from '../../../utils';

type Props = {
  accept: string;
  active: boolean;
  icon: React.ReactNode;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const AttachFileInputButton = ({ accept, active, icon, onChange }: Props) => {
  return (
    <label className="relative flex items-center justify-center focus-within:outline-black cursor-pointer">
      <span
        className={classNames(
          'flex items-center justify-center w-12 h-12 rounded-full',
          active ? 'bg-green-100' : 'bg-gray-100',
        )}
      >
        {icon}
      </span>
      <input multiple accept={accept} className="sr-only" onChange={onChange} type="file" />
    </label>
  );
};
