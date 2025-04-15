interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// text-13px이 default 근데 13px로 하니 줄바꿈이 된다...? 

const IndustrySelect = ({ className, ...rest }: StyledButtonProps) => {
    return (
      <button
        {...rest}
        className={`flex h-[var(---32-,32px)] py-[8px] px-[var(---32-,16px)] items-center justify-center gap-[12px]
        rounded-[99px] border border-[#c4c4c6] text-[13px] font-[500] text-[#949598] whitespace-nowrap  ${className ?? ''}`}
      />
    );
  };
  
  export default IndustrySelect;