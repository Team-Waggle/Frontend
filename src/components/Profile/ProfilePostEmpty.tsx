import PostEmptyIcon from '../../assets/character/loading/ch_loading_basic_circle_gray_small.svg?react';
import ApplicantEmptyIcon from '../../assets/character/loading/ch_loading_basic_triangle_gray_small.svg?react';
import MemberEmptyIcon from '../../assets/character/loading/ch_loading_basic_square_gray_small.svg?react';

export type TabKey =
  | 'postManagement'
  | 'applicantManagement'
  | 'memberManagement';

export const emptyContentByKey: Record<TabKey, JSX.Element> = {
  postManagement: (
    <div
      data-empty="post"
      className="flex w-full h-full flex-col items-center justify-center gap-[1.6rem]"
    >
      <PostEmptyIcon />
      <div>
        <span className='text-caption-16_M500 text-black-70'> 작성한 모집글이 없어요. </span>
      </div>
    </div>
  ),
  applicantManagement: (
    <div
      data-empty="applicants"
      className="flex w-full h-full flex-col items-center justify-center gap-[1.6rem]"
    >
      <ApplicantEmptyIcon />
      <div>
        <span className='text-caption-16_M500 text-black-70'> 아직 지원자가 없어요. </span>
      </div>
    </div>
  ),
  memberManagement: (
    <div
      data-empty="members"
      className="flex w-full h-full flex-col items-center justify-center gap-[1.6rem]"
    >
      <MemberEmptyIcon />
      <div className="flex flex-col items-center justify-center">
        <span className='text-caption-16_M500 text-black-70'> 아직 지원 마감된 글이 없어요. </span>
        <span className='text-caption-16_M500 text-black-70'> 지원자 관리 목록에서 마감하기 버튼을 눌러주세요. </span>
      </div>
    </div>
  ),
};
