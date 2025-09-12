import BaseTag from '../common/Tag/BaseTag';

interface ProfilePageTagProps {
  title: string;
  items: string[];
}

const ProfilePageTag = ({ title, items }: ProfilePageTagProps) => {
  return (
    <div className="flex flex-wrap content-start items-start gap-x-[1.4rem] gap-y-[3.2rem] self-stretch">
        {/* 제목 */}
      <div className="flex w-[15.2rem] flex-col items-center gap-[1.6rem]">
        <BaseTag
          size="lg"
          type="filled"
          color="blue"
          shape="square"
          children={title}
          className="w-[15.2rem] justify-center"
        />

        {/* 태그 목록 */}
        <div className="flex flex-col items-center gap-[0.8rem] self-stretch">
        {items.map((item, idx) => (
          <BaseTag
            key={idx}
            size="lg"
            type="outline"
            color="basic"
            shape="square"
            children={item}
            className="w-[15.2rem] justify-center"
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePageTag;
