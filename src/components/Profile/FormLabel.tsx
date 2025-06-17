import RequiredIcon from '../../assets/inputBox/ic_input_required_red.svg?react'

interface FormLabelProps {
    title: React.ReactNode;
    caption?: React.ReactNode;
    sideNote?: React.ReactNode;
    isRequired?: boolean;
    className?: string;
  }
  
  const FormLabel = ({ title, caption, sideNote, isRequired, className='' }: FormLabelProps) => {
    return (
      <div className="flex flex-col items-start self-stretch text-black-130">
        <div className="flex items-center gap-[0.8rem] self-stretch">
          <div className="flex items-center gap-[0.2rem] text-subtitle-14_Sb600">
              {title}
              {isRequired && <RequiredIcon />}
          </div>
          <div className="flex pl-[0.6rem] items-center flex-grow flex-shrink-0 basis-0 self-stretch text-caption-12_M500 text-right">
            {caption}
          </div>
        </div>
        <div className="flex flex-col justify-center items-start self-stretch text-caption-13_M500">
          {sideNote}
        </div>
      </div>
    );
  };
  
  export default FormLabel;