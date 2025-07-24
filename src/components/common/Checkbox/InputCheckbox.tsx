const InputCheckbox = () => {
  return (
    <div className="flex h-[4.6rem] w-[32.8rem] items-center gap-[0.8rem] pl-[1.8rem] pr-[0.8rem]">
      <input
        type="checkbox"
        className="h-[2.4rem] w-[2.4rem] appearance-none rounded-[0.4rem] bg-[url('/icons/unchecked.svg')] bg-center bg-no-repeat checked:bg-[url('/icons/checked.svg')]"
      />
      {/* 체크박스 내용 */}
      <input
        type="text"
        placeholder="직접 입력"
        className="h-full w-[27rem] border-b border-solid border-black-100 text-caption-16_M500 text-black-130 placeholder:text-black-70"
      />
    </div>
  );
};

export default InputCheckbox;
