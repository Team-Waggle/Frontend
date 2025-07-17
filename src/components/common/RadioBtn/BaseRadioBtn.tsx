type BaseRadioBtnProps = {
  label: string;
  children: string;
};

const BaseRadioBtn = ({ label, children }: BaseRadioBtnProps) => {
  return (
    <label
      htmlFor={label}
      className="group flex h-[4.6rem] cursor-pointer items-center gap-[0.8rem] pl-[1.8rem] pr-[0.8rem] hover:rounded-[0.8rem] hover:bg-primary-10"
    >
      <input
        type="radio"
        name="contact"
        id={label}
        className="peer h-[2.4rem] w-[2.4rem] cursor-pointer appearance-none bg-[url('/icons/radioUnchecked.svg')] bg-center bg-no-repeat checked:bg-[url('/icons/radioChecked.svg')]"
      />
      <div className="flex h-full w-[15.2rem] cursor-pointer items-center whitespace-nowrap text-caption-16_M500 text-black-70 group-hover:text-black-130 peer-checked:text-black-130">
        {children}
      </div>
    </label>
  );
};

export default BaseRadioBtn;
