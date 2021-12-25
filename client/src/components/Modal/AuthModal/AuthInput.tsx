type Props = {
  autoComplete?: string;
  label: string;
  type: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const AuthInput = ({ autoComplete, label, type, onChange }: Props) => {
  return (
    <label className="block">
      <p>{label}</p>
      <p className="mt-2">
        <input
          autoComplete={autoComplete}
          onChange={onChange}
          type={type}
          className="border-b focus:border-b-2 border-green-300 focus:border-green-600 focus: outline-none"
        />
      </p>
    </label>
  );
};
