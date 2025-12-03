import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import BasicSearchBar from '../../components/common/SearchBar/BasicSearchBar';
import SelectTextIn from '../../components/common/Select/SelectTextIn';
import { FolderTabGroup } from '../../components/common/Tab/FolderTabGroup';
import BaseProfileChip from '../../components/common/Profile/ProfileChip/BaseProfileChip';
import LineTab from '../../components/common/Tab/LineTab';
import { useFollowList } from '../../hooks/useFollowList';
import { profileTabs } from '../../constants/ProfileTabConfig';
import { industries, positions, skills } from '../../constants/formOptions';
import { Table } from '../../components/common/Table/Table';
import {
  BookmarkColumns,
  type BookmarkRow,
} from '../../constants/ProfileLikeColumns';

import { useFollow } from '../../hooks/useFollow';

import { useNavigate, useOutletContext } from 'react-router-dom';
import { ROUTES } from '../../constants/route';

import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CancelIcon from '../../assets/icons/ic_snackbar_cancel.svg?react';
import NoBookmarkIcon from '../../assets/character/loading/ch_loading_basic_square_gray_small.svg?react';
import {
  useGetBookmarkQuery,
  usePostBookmarkQuery,
} from '../../hooks/useBookmark';
import { formatYYMMDDKST } from '../../utils/dateKST';
import { isRowClosedForUI } from '../../utils/profilePostList';

type OutletCtx = { currentUserId: string };
interface ProfileLikesProps {
  currentUserId?: string;
}

const idLabelMap = <T extends { id: string; label: string }>(list: T[]) =>
  list.reduce<Record<string, string>>((acc, cur) => {
    acc[cur.id] = cur.label;
    return acc;
  }, {});

const FollowableChip = ({
  user,
  activeTab,
  positionLabelMap,
}: {
  user: {
    userId: string;
    name: string;
    position?: string | string[] | null;
    yearCount?: number | null;
  };
  activeTab: 'bookmark' | 'following' | 'follower';
  positionLabelMap: Record<string, string>;
}) => {
  const { isFollowed, toggleFollow } = useFollow(user.userId);
  const navigate = useNavigate();

  if (activeTab === 'following' && !isFollowed) return null;

  const jobRoleKo =
    user.position == null
      ? '직무 미정'
      : Array.isArray(user.position)
        ? user.position.map((p) => positionLabelMap[p] ?? p).join(', ')
        : (positionLabelMap[user.position] ?? user.position);

  return (
    <BaseProfileChip
      key={user.userId}
      type="default"
      state="default"
      size="extraLarge"
      name={user.name}
      jobRole={jobRoleKo}
      yearCount={user.yearCount || 0}
      overlayMode="hover"
      showPlusAction={false}
      showDeleteAction={activeTab === 'following'}
      onProfileAction={() => {
        navigate(`${ROUTES.PROFILE}/${user.userId}`);
      }}
      onDeleteAction={async () => {
        if (activeTab === 'following' && isFollowed) {
          try {
            await toggleFollow();
            toast.info('팔로잉이 취소되었습니다!', {
              icon: <CancelIcon />,
              className: 'text-black-80 text-body-16_M500 text-caption-16_M500',
            });
          } catch {
            toast.error('언팔로우 중 오류가 발생했어요.');
          }
        }
      }}
    />
  );
};

const ProfileLikes = ({ currentUserId }: ProfileLikesProps) => {
  const tabs = profileTabs.ProfileLikes;
  const [activeTab, setActiveTab] = useState<
    'bookmark' | 'following' | 'follower'
  >('bookmark');
  const [activePosition, setActivePosition] = useState<string | null>(null);

  const { currentUserId: ctxUserId } = useOutletContext<OutletCtx>();
  const uid = currentUserId ?? ctxUserId;

  const { followers, followees, loading } = useFollowList(uid);
  const activeTabInfo = useMemo(
    () => tabs.find((t) => t.key === activeTab),
    [tabs, activeTab],
  );

  const displayedUsers =
    activeTab === 'following'
      ? followees
      : activeTab === 'follower'
        ? followers
        : [];

  const filteredUsers =
    activePosition && activePosition !== 'ALL'
      ? displayedUsers.filter((user) => user.position === activePosition)
      : displayedUsers;

  const positionLabelMap = useMemo(() => idLabelMap(positions), []);

  const { data, isLoading, error } = useGetBookmarkQuery();

  const { mutate: postBookmark } = usePostBookmarkQuery();

  const industryMap = useMemo(
    () => new Map(industries.map((o) => [o.id, o.label])),
    [],
  );
  const skillMap = useMemo(
    () => new Map(skills.map((o) => [o.id, o.label])),
    [],
  );
  const toIndustryLabel = (code?: string) =>
    (code && industryMap.get(code)) ?? code ?? '';
  const toSkillLabels = (codes?: string[]) =>
    (codes ?? []).map((c) => skillMap.get(c) ?? c);

  const applyData: BookmarkRow[] = useMemo(() => {
    return (data ?? []).map((data) => {
      return {
        id: String(data.id),
        deadline: formatYYMMDDKST(data.recruitment_end_date),
        industry: toIndustryLabel(data.industry),
        title: data.title,
        skills: toSkillLabels(data.skills as string[] | undefined),
      } as BookmarkRow;
    });
  }, [data]);

  return (
    <div className="w-[32rem] sm:w-[72rem] md:w-[81.8rem]">
      {/* 상단 폴더 탭 */}
      <FolderTabGroup
        tabs={tabs.map((t) => ({ id: t.key, label: t.label }))}
        activeIndex={Math.max(
          0,
          tabs.findIndex((t) => t.key === activeTab),
        )}
        onTabChange={(idx) =>
          setActiveTab(tabs[idx].key as 'bookmark' | 'following' | 'follower')
        }
      />

      {/* Bookmark */}
      {activeTab === 'bookmark' && activeTabInfo && (
        <div className="flex h-[74.4rem] flex-col items-start gap-[1rem] self-stretch rounded-bl-[0.8rem] rounded-br-[0.8rem] border border-solid border-black-50 bg-black-10 px-[2.6rem] pb-[3rem] pt-[1rem]">
          <div className="flex items-center justify-end gap-[1rem] self-stretch px-0 py-[0.8rem]">
            {/* <SelectTextIn
              type="outline"
              title="마감일"
              items={[
                { id: '1', label: '마감일' },
                { id: '2', label: '사용 스킬' },
                { id: '3', label: '산업 분야' },
              ]}
            /> */}
            <BasicSearchBar />
          </div>

          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center text-caption-12_M500 text-black-130">
              불러오는 중...
            </div>
          ) : error ? (
            <div className="flex h-full w-full items-center justify-center text-red-500">
              데이터를 불러오지 못했습니다.
            </div>
          ) : applyData.length === 0 ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-[1.6rem]">
              <NoBookmarkIcon />
              <span className="text-caption-16_M500 text-black-70">
                북마크한 글이 없어요.
              </span>
            </div>
          ) : (
            <Table
              columns={BookmarkColumns((id) => postBookmark(id))}
              data={applyData}
              rowKey={(r) => r.id}
              isRowClosed={(row) => isRowClosedForUI(row)}
            />
          )}
        </div>
      )}

      {/* Following / Follower */}
      {(activeTab === 'following' || activeTab === 'follower') && (
        <div className="flex h-[74.4rem] flex-col items-start gap-[1.8rem] self-stretch rounded-bl-[0.8rem] rounded-br-[0.8rem] border border-solid border-black-50 bg-black-10 px-[2.6rem] pb-[4.6rem] pt-[2.7rem]">
          {/* Position 필터 LineTab */}
          <div className="relative flex w-full border border-x-0 border-t-0 border-solid border-black-50">
            <LineTab
              key="ALL"
              isActive={activePosition === null}
              onClick={() => setActivePosition(null)}
            >
              전체
            </LineTab>
            {positions.map((pos) => (
              <LineTab
                key={pos.id}
                isActive={activePosition === pos.id}
                onClick={() => setActivePosition(pos.id)}
              >
                {pos.label}
              </LineTab>
            ))}
          </div>

          {loading ? (
            <p>로딩 중...</p>
          ) : (
            <div className="grid w-full grid-cols-3 gap-[1rem]">
              {filteredUsers.map((user) => (
                <FollowableChip
                  key={user.userId}
                  user={user}
                  activeTab={activeTab}
                  positionLabelMap={positionLabelMap}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {createPortal(
        <ToastContainer
          position="bottom-center"
          transition={Slide}
          autoClose={2000}
          hideProgressBar
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          closeOnClick
          draggable={false}
          newestOnTop
          limit={1}
          theme="light"
          className="!bottom-0 !m-0"
          style={{
            zIndex: 9999,
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        />,
        document.body,
      )}
    </div>
  );
};

export default ProfileLikes;
