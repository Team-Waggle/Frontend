interface FormLabelProps {
    children: React.ReactNode;
    className?: string;
  }
  
  const FormLabel = ({ children, className }: FormLabelProps) => {
    return (
      <div className={`flex h-[21px] text-[14px] font-[600] items-center ${className ?? ''}`}>
        {children}
      </div>
    );
  };
  
  export default FormLabel;