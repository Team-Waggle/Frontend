import { BaseCheckboxProps } from '../../../types/checkbox';

const PopupCheckbox = ({ label, children }: BaseCheckboxProps) => {
  return (
    <div className="flex h-[4.6rem] w-fit items-center gap-[0.8rem] pl-[1.8rem] pr-[0.8rem]">
      <input
        type="checkbox"
        id={label}
        className="h-[2.4rem] w-[2.4rem] appearance-none rounded-[0.4rem] bg-[url('/icons/unchecked.svg')] bg-center bg-no-repeat checked:bg-[url('/icons/checked.svg')]"
      />
      {/* 체크박스 내용 */}
      <label
        htmlFor={label}
        className="whitespace-nowrap text-caption-16_M500 text-black-130"
      >
        {children}
      </label>
    </div>
  );
};
export default PopupCheckbox;
