type Props = {
  ratio: number;
  children: React.ReactNode;
};

export const AspectRatio = ({ ratio, children }: Props) => {
  return (
    <div className="relative w-full" style={{ aspectRatio: `${ratio}` }}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
};
