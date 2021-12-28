import { memo } from 'react';
import { Link } from 'react-location';

type Props = {
  href?: string;
  preload?: number;
  text: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

const Component = ({ href, preload, text, icon, onClick }: Props) => {
  return (
    <li>
      {href ? (
        <Link
          to={href}
          preload={preload}
          getActiveProps={() => ({ style: { color: '#065F46' } })}
          className="flex flex-col items-center justify-center w-12 h-12 hover:bg-green-50 rounded-full sm:px-2 sm:w-24 sm:h-auto sm:rounded lg:flex-row lg:justify-start lg:px-4 lg:py-2 lg:w-auto lg:h-auto lg:rounded-full"
        >
          <span className="text-xl lg:pr-2 lg:text-3xl">{icon}</span>
          <span className="hidden sm:inline sm:text-sm lg:text-xl lg:font-bold">{text}</span>
        </Link>
      ) : (
        <button
          className="flex flex-col items-center justify-center w-12 h-12 hover:bg-green-50 rounded-full sm:px-2 sm:w-24 sm:h-auto sm:rounded lg:flex-row lg:justify-start lg:px-4 lg:py-2 lg:w-auto lg:h-auto lg:rounded-full"
          onClick={onClick}
          aria-label={text}
        >
          <span className="text-xl lg:pr-2 lg:text-3xl">{icon}</span>
          <span className="hidden sm:inline sm:text-sm lg:text-xl lg:font-bold">{text}</span>
        </button>
      )}
    </li>
  );
};

export const NavigationItem = memo(Component);
