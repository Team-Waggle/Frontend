interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DaySelect = ({ className, ...rest }: StyledButtonProps) => {
    return (
      <button
        {...rest}
        className={`flex w-[42px] h-[42px] py-[0px] px-[10px] items-center justify-center gap-[auto]
        rounded-[6px] border border-[#c4c4c6] text-[14px] text-[#949598] font-[600]  ${className ?? ''}`}
      />
    );
  };
  
  export default DaySelect;