import PostEmptyIcon from '../../assets/character/loading/ch_loading_basic_circle_gray_small.svg?react';
import ApplicantEmptyIcon from '../../assets/character/loading/ch_loading_basic_triangle_gray_small.svg?react';
import MemberEmptyIcon from '../../assets/character/loading/ch_loading_basic_square_gray_small.svg?react';
import EmptyState from '../common/ProfileEmptyState/EmptyState';

export type PostTabKey =
  | 'postManagement'
  | 'applicantManagement'
  | 'memberManagement';

export const emptyPostContentByKey: Record<PostTabKey, JSX.Element> = {
  postManagement: (
    <EmptyState
      icon={<PostEmptyIcon />}
      dataEmpty="post"
      children="작성한 모집글이 없어요."
    />
  ),
  applicantManagement: (
    <EmptyState
      icon={<ApplicantEmptyIcon />}
      dataEmpty="applicants"
      children="아직 지원자가 없어요."
    />
  ),
  memberManagement: (
    <div
      data-empty="members"
      className="flex h-full w-full flex-col items-center justify-center gap-[1.6rem]"
    >
      <MemberEmptyIcon />
      <div className="flex flex-col items-center justify-center">
        <span className="text-caption-16_M500 text-black-70">
          아직 지원 마감된 글이 없어요.
        </span>
        <span className="text-caption-16_M500 text-black-70 sm:hidden">
          지원자 관리 목록에서
        </span>
        <span className="text-caption-16_M500 text-black-70 sm:hidden">
          마감하기 버튼을 눌러주세요.
        </span>
        <span className="hidden text-caption-16_M500 text-black-70 sm:inline">
          지원자 관리 목록에서 마감하기 버튼을 눌러주세요.
        </span>
      </div>
    </div>
  ),
};
