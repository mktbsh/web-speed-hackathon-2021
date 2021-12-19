import { memo } from 'react';
import { TImage } from '../../types';
import { classNames, getImagePath } from '../../utils';
import { AspectRatio } from '../AspectRatio';
import { CoveredImage } from '../CoveredImage';

type Props = {
  images: TImage[];
};

export const ImageArea = memo(({ images }: Props) => {
  return (
    <AspectRatio ratio={16 / 9}>
      <div className="grid gap-1 grid-cols-2 grid-rows-2 w-full h-full border border-gray-300 rounded-lg overflow-hidden">
        {images.map((image, idx) => {
          return (
            <div
              key={image.id}
              className={classNames(
                'bg-gray-300',
                images.length === 1 ? 'col-span-2' : 'col-span-1',
                images.length > 2 && (images.length !== 3 || idx !== 0) ? 'row-span-1' : '',
                images.length <= 2 || (images.length === 3 && idx === 0) ? 'row-span-2' : '',
              )}
            >
              <div className="relative w-full h-full overflow-hidden">
                <CoveredImage src={getImagePath(image.id)} alt={image.alt} width={image.width} height={image.height} />
              </div>
            </div>
          );
        })}
      </div>
    </AspectRatio>
  );
});
