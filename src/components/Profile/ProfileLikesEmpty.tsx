import FollowerEmptyIcon from '../../assets/character/loading/ch_loading_basic_circle_gray_small.svg?react';
import FollowingEmptyIcon from '../../assets/character/loading/ch_loading_basic_triangle_gray_small.svg?react';

import EmptyIcon from '../../assets/character/loading/ch_loading_heart_square_gray_small.svg?react';
import EmptyState from '../common/ProfileEmptyState/EmptyState';

export type LikesTabKey = 'following' | 'follower';

export const emptyFollowContentByTab: Record<LikesTabKey, JSX.Element> = {
  following: (
    <EmptyState
      icon={<EmptyIcon />}
      dataEmpty="following"
      children="팔로잉 목록이 없어요."
    />
  ),
  follower: (
    <EmptyState
      icon={<EmptyIcon />}
      dataEmpty="follower"
      children="팔로워 목록이 없어요."
    />
  ),
};
