import RequiredIcon from '../../assets/inputBox/ic_input_required_red.svg?react';

interface FormLabelProps {
  title: React.ReactNode;
  caption?: React.ReactNode;
  sideNote?: React.ReactNode;
  isRequired?: boolean;
  requiredMessage?: boolean;
  className?: string;
}

const FormLabel = ({
  title,
  caption,
  sideNote,
  isRequired,
  requiredMessage = false,
  className = '',
}: FormLabelProps) => {
  return (
    <div className="flex flex-col items-start self-stretch text-black-130">
      <div className="flex items-center gap-[0.8rem] self-stretch">
        <div className="flex items-center gap-[0.2rem] text-subtitle-14_Sb600">
          {title}
          {isRequired && (
            <div className="flex h-[1.8rem] items-center gap-[0.6rem]">
              <RequiredIcon />
              {requiredMessage && (
                <span className="flex h-[2.1rem] w-[7.9rem] flex-col justify-center text-caption-12_M500 text-[#F5552D]">
                  필수 입력입니다.
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-shrink-0 flex-grow basis-0 items-center self-stretch pl-[0.6rem] text-right text-caption-12_M500">
          {caption}
        </div>
      </div>
      <div className="flex flex-col items-start justify-center self-stretch text-caption-13_M500">
        {sideNote}
      </div>
    </div>
  );
};

export default FormLabel;
