import { classNames } from '../../utils';
import { FaCircleNotch } from 'react-icons/fa';

type Props = {
  children: string;
  disabled: boolean;
  loading: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const ModalSubmitButton = ({ children, disabled, loading, onClick }: Props) => {
  return (
    <button
      className={classNames(
        'block px-8 py-2 text-white bg-green-600 rounded',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      )}
      disabled={disabled}
      onClick={onClick}
      type="submit"
    >
      {loading && (
        <span className="pr-2">
          <span className="inline-block animate-spin">
            <FaCircleNotch className="inline-block leading-none fill-current" />
          </span>
        </span>
      )}
      <span>{children}</span>
    </button>
  );
};
