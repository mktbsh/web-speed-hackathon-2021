type Props = {
  iconType: string;
  styleType: 'solid' | 'regular';
};

export const FontAwesomeIcon = ({ iconType, styleType }: Props) => {
  return (
    <svg className="font-awesome inline-block leading-none fill-current">
      <use xlinkHref={`/sprites/font-awesome/${styleType}.svg#${iconType}`} />
    </svg>
  );
};
