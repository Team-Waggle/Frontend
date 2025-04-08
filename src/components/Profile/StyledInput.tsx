interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const StyledInput = ({ className, style, ...rest }: StyledInputProps) => {
  return (
    <input
      {...rest}
      className={`w-full h-[var(---46-,46px)] pr-[8px] pl-[18px] py-0 items-center self-stretch border rounded-[8px] border-[#c4c4c6] ${className ?? ''}`}
      style={{
        paddingRight: "var(--46-, 8px)",
        paddingLeft: "var(--46-, 18px)",
        borderRadius: "var(--M_64, 8px)",
        ...style,
      }}
    />
  );
};

export default StyledInput;
