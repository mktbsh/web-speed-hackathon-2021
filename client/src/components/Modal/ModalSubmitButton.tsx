import { classNames } from '../../utils';
import { FontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIcon';

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
      aria-label="submit"
    >
      {loading && (
        <span className="pr-2">
          <span className="inline-block animate-spin">
            <FontAwesomeIcon iconType="circle-notch" styleType="solid" />
          </span>
        </span>
      )}
      <span>{children}</span>
    </button>
  );
};
