type Props = {
  children: React.ReactNode;
};

export const VisualyHidden = ({ children }: Props) => {
  return <span className="h-0 w-0 border-0 m-[-1px] p-0 overflow-hidden whitespace-nowrap absolute">{children}</span>;
};
