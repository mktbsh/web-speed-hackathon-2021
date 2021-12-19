import { useState, useCallback } from 'react';
import { classNames } from '../../utils';

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const CoveredImage = ({ src, alt, width, height }: Props) => {
  const [containerSize, setContainerSize] = useState({ height: 0, width: 0 });

  const callbackRef: React.RefCallback<HTMLDivElement> = useCallback((el) => {
    setContainerSize({
      height: el?.clientHeight ?? 0,
      width: el?.clientWidth ?? 0,
    });
  }, []);

  const containerRatio = containerSize.height / containerSize.width;
  const imageRatio = height / width;

  return (
    <div ref={callbackRef} className="relative w-full h-full overflow-hidden">
      <img
        alt={alt}
        className={classNames(
          'absolute left-1/2 top-1/2 max-w-none transform -translate-x-1/2 -translate-y-1/2',
          containerRatio > imageRatio ? 'w-auto h-full' : '',
          containerRatio <= imageRatio ? 'w-full h-auto' : '',
        )}
        src={src}
        width={width}
        height={height}
        loading="lazy"
      />
    </div>
  );
};
