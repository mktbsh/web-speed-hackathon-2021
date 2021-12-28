import { classNames } from '../../../utils';
import { FontAwesomeIcon } from '../../FontAwesomeIcon/FontAwesomeIcon';

import styles from './index.module.css';

type Props = {
  children?: string;
};

export const ModalErrorMessage = ({ children }: Props) => {
  return (
    <span className={classNames(styles.err, !children ? 'invisible' : '')}>
      <span>
        <FontAwesomeIcon iconType="exclamation-circle" styleType="solid" />
      </span>
      {children}
    </span>
  );
};
