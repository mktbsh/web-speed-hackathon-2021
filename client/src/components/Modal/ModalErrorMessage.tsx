import { classNames } from '../../utils';
import { FaExclamationCircle } from 'react-icons/fa';

type Props = {
  children?: string;
};

export const ModalErrorMessage = ({ children }: Props) => {
  return (
    <span className={classNames('block h-6 text-red-600', !children ? 'invisible' : '')}>
      <span className="mr-1">
        <FaExclamationCircle />
      </span>
      {children}
    </span>
  );
};
