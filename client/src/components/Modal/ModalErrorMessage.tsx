import { classNames } from '../../utils';
import { FontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIcon';

type Props = {
  children?: string;
};

export const ModalErrorMessage = ({ children }: Props) => {
  return (
    <span className={classNames('block h-6 text-red-600', !children ? 'invisible' : '')}>
      <span className="mr-1">
        <FontAwesomeIcon iconType="exclamation-circle" styleType="solid" />
      </span>
      {children}
    </span>
  );
};
