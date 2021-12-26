type Props = {
  aspectHeight: number;
  aspectWidth: number;
  children: React.ReactNode;
};

export const AspectRatio = ({ aspectHeight, aspectWidth, children }: Props) => {
  return (
    <div className="relative w-full h-1" style={{ paddingTop: `${(100 * aspectHeight) / aspectWidth}%` }}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
};
