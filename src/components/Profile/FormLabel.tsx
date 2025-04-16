interface FormLabelProps {
    children: React.ReactNode;
    className?: string;
    secondaryText?: React.ReactNode;
  }
  
  const FormLabel = ({ children, className, secondaryText }: FormLabelProps) => {
    return (
      <div className={`flex h-[21px] text-[14px] font-[600] items-center ${className ?? ''}`}>
        {children}
        {secondaryText && <div className="text-[12px] font-[500] ml-[14px]">{secondaryText}</div>}
      </div>
    );
  };
  
  export default FormLabel;