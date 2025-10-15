import { useMemo, useState } from 'react';
import BasicSearchBar from '../../components/common/SearchBar/BasicSearchBar';
import SelectTextIn from '../../components/common/Select/SelectTextIn';
import { FolderTabGroup } from '../../components/common/Tab/FolderTabGroup';
import BaseProfileChip from '../../components/common/Profile/ProfileChip/BaseProfileChip';
import LineTab from '../../components/common/Tab/LineTab';
import { useFollowList } from '../../hooks/useFollowList';
import { profileTabs } from '../../constants/ProfileTabConfig';
import { positions } from '../../constants/formOptions';
import { Table } from '../../components/common/Table/Table';
import {
  BookmarkColumns,
  type BookmarkRow,
} from '../../constants/ProfileLikeColumns';

interface ProfileLikesProps {
  currentUserId: string;
}

const dummyData: { bookmark: BookmarkRow[] } = {
  bookmark: [
    {
      id: '1',
      deadline: '00.00.00',
      industry: '소셜네트워크',
      title:
        '와글 팀과 함께할 디자이너, 기획자, 백엔드, 프론트엔드, 데브옵스님을 모집합니다.',
      skills: ['TypeScript', 'TypeScript', 'TypeScript', 'TypeScript'],
    },
  ],
};

const ProfileLikes = ({ currentUserId }: ProfileLikesProps) => {
  const tabs = profileTabs.ProfileLikes;
  const [activeTab, setActiveTab] = useState<
    'bookmark' | 'following' | 'follower'
  >('bookmark');
  const [activePosition, setActivePosition] = useState<string | null>(null); // position 필터

  const { followers, followees, loading } = useFollowList(currentUserId);
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

  return (
    <div className="w-[81.8rem]">
      {/* 상단 폴더 탭 */}
      <FolderTabGroup
        tabs={tabs.map((tab) => ({ label: tab.label }))}
        activeIndex={tabs.findIndex((tab) => tab.key === activeTab)}
        onTabChange={(idx) =>
          setActiveTab(tabs[idx].key as 'bookmark' | 'following' | 'follower')
        }
      />

      {/* Bookmark */}
      {activeTab === 'bookmark' && activeTabInfo && (
        <div className="flex h-[74.4rem] flex-col items-start gap-[1rem] self-stretch rounded-bl-[0.8rem] rounded-br-[0.8rem] border border-solid border-black-50 bg-black-10 px-[2.6rem] pb-[3rem] pt-[1rem]">
          <div className="flex items-center justify-end gap-[1rem] self-stretch px-0 py-[0.8rem]">
            <SelectTextIn
              type="outline"
              title="마감일"
              items={[
                { id: '1', label: '마감일' },
                { id: '2', label: '사용 스킬' },
                { id: '3', label: '산업 분야' },
              ]}
            />
            <BasicSearchBar />
          </div>

          <Table
            columns={BookmarkColumns}
            data={dummyData.bookmark}
            rowKey={(r) => r.id}
          />
        </div>
      )}

      {/* Following / Follower */}
      {(activeTab === 'following' || activeTab === 'follower') && (
        <div className="flex h-[74.4rem] flex-col items-start gap-[1.8rem] self-stretch rounded-bl-[0.8rem] rounded-br-[0.8rem] border border-solid border-black-50 bg-black-10 px-[2.6rem] pb-[4.6rem] pt-[2.7rem]">
          {/* Position 필터 LineTab */}
          <div className="relative flex w-full border border-solid border-t-0 border-x-0 border-black-50">
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
                <BaseProfileChip
                  key={user.userId}
                  type="default"
                  state="default"
                  size="extraLarge"
                  name={user.name}
                  jobRole={user.position || '직무 미정'}
                  yearCount={user.yearCount || 0}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileLikes;
