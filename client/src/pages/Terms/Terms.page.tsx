import styles from './Terms.module.css';
import { useSetHelmet } from '../../contexts/HelmetContext';
import { useMatch } from 'react-location';
import { LocationGenerics } from '../../Router';

export const TermsPage = () => {
  useSetHelmet({
    title: '利用規約',
    description: 'WebSpeedHackathon2021の利用規約ページです。',
  });

  const {
    data: { terms },
  } = useMatch<LocationGenerics>();

  if (!terms) return null;

  return <article className={styles.terms} dangerouslySetInnerHTML={{ __html: terms }} />;
};
