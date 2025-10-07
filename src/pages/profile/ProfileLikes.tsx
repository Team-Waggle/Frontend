import { useState, useEffect } from 'react';
import BasicSearchBar from '../../components/common/SearchBar/BasicSearchBar';
import SelectTextIn from '../../components/common/Select/SelectTextIn';
import { FolderTabGroup } from '../../components/common/Tab/FolderTabGroup';
import { Table, TableRowData } from '../../components/common/Table/Table';
import { profileTabs } from '../../constants/ProfileTabConfig';
import { profileTableRowMapper } from '../../utils/profileTableRowMapper';

import {
  BookmarkApiItem,
  FollowingApiItem,
  FollowerApiItem,
} from '../../types/ProfileApi';

const dummyData: {
  bookmark: BookmarkApiItem[];
  following: FollowingApiItem[];
  follower: FollowerApiItem[];
} = {
  bookmark: [
    {
      id: '1',
      deadline: '00.00.00',
      industry: '소셜네트워크',
      title:
        '와글 팀과 함께할 디자이너, 기획자, 백엔드, 프론트엔드, 데브옵스님을 모집합니다.',
      skills: ['TypeScript'],
    },
  ],
  following: [{ id: '1', name: '홍길동' }],
  follower: [{ id: '1', name: '김철수' }],
};

const ProfileLikes = () => {
  const tabs = profileTabs.ProfileLikes;
  const [activeTab, setActiveTab] =
    useState<keyof typeof dummyData>('bookmark');
  const [rows, setRows] = useState<TableRowData[]>([]);

  const activeTabData = tabs.find((tab) => tab.key === activeTab);

  useEffect(() => {
    if (!activeTabData) return;

    const data =
      activeTab === 'bookmark'
        ? dummyData.bookmark
        : activeTab === 'following'
          ? dummyData.following
          : dummyData.follower;

    setRows(profileTableRowMapper(data, activeTabData.columns));
  }, [activeTab, activeTabData]);

  return (
    <div className="w-[81.8rem]">
      <FolderTabGroup
        tabs={tabs.map((tab) => ({ label: tab.label }))}
        activeIndex={tabs.findIndex((tab) => tab.key === activeTab)}
        onTabChange={(idx) =>
          setActiveTab(tabs[idx].key as keyof typeof dummyData)
        }
      />

      {/* 테이블 + 검색 */}
      <div className="flex h-[74.4rem] flex-col items-start gap-[1rem] self-stretch rounded-bl-[0.8rem] rounded-br-[0.8rem] border border-solid border-black-50 bg-black-10 px-[2.6rem] pb-[3rem] pt-[1rem]">
        {/* SelectTextIn / 검색창 */}
        {/* SelectTextIn 같은 경우, 임시 데이터가 들어가 있습니다. */}
        <div className="flex items-center justify-end gap-[1rem] self-stretch px-0 py-[0.8rem]">
          <SelectTextIn
            type="outline"
            title="마감일"
            items={[{ id: '1', label: '안녕' }]}
          />
          <BasicSearchBar />
        </div>

        {/* Table */}
        {activeTabData && (
          <Table data={{ columns: activeTabData.columns, rows }} />
        )}
      </div>
    </div>
  );
};

export default ProfileLikes;
