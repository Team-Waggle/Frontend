interface ProfileInfoProps {
  label: string;
  values?: string[];
  children?: React.ReactNode;
}

const ProfileInfo = ({ label, values, children }: ProfileInfoProps) => {
  return (
    <div className="flex items-start gap-[1.2rem] self-stretch">
      <div className="flex w-[9.4rem] items-start justify-between self-stretch">
        <span className="text-center text-subtitle-14_Sb600 text-black-130">
          {label}
        </span>
        <div className="flex w-[0.1rem] flex-shrink-0 items-start gap-[1rem] self-stretch bg-black-60" />
      </div>
      <div className="flex flex-wrap content-start items-start gap-x-[0.8rem] gap-y-[0.4rem]">
        <div className="flex flex-wrap content-center items-center gap-[1rem]">
          {children
            ? children
            : values?.map((v, i) => (
                <span key={i} className="text-body-14_R400 text-black-130">
                  {v}
                </span>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
