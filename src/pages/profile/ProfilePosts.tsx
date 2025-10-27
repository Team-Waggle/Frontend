import { useMemo, useState } from 'react';
import BasicSearchBar from '../../components/common/SearchBar/BasicSearchBar';
import SelectTextIn from '../../components/common/Select/SelectTextIn';
import { FolderTabGroup } from '../../components/common/Tab/FolderTabGroup';
import { Table } from '../../components/common/Table/Table';
import { profilePostTabs } from '../../constants/ProfilePostColumns';
import type { PostRow } from '../../constants/ProfilePostColumns';

const dummyData: {
  postManagement: PostRow[];
  applicantManagement: PostRow[];
  memberManagement: PostRow[];
} = {
  postManagement: [
    {
      id: '1',
      status: '모집 중',
      deadline: '00.00.00',
      industry: '소셜네트워크',
      title:
        '와글 팀과 함께할 디자이너, 기획자, 백엔드, 프론트엔드, 데브옵스님을 모집합니다.',
      skills: ['TypeScript', 'TypeScript', 'TypeScript', 'TypeScript'],
    },
  ],
  applicantManagement: [
    {
      id: '1',
      applicantsCount: 3,
      deadline: '00.00.00',
      industry: '소셜네트워크',
      title:
        '와글 팀과 함께할 디자이너, 기획자, 백엔드, 프론트엔드, 데브옵스님을 모집합니다.',
      skills: ['TypeScript', 'TypeScript', 'TypeScript', 'TypeScript'],
    },
  ],
  memberManagement: [
    {
      id: '1',
      status: '완료',
      deadline: '00.00.00',
      industry: '소셜네트워크',
      title:
        '와글 팀과 함께할 디자이너, 기획자, 백엔드, 프론트엔드, 데브옵스님을 모집합니다.',
      skills: ['TypeScript', 'TypeScript', 'TypeScript', 'TypeScript'],
    },
  ],
};

type TabKey = keyof typeof dummyData;

export default function ProfilePosts() {
  const tabs = profilePostTabs;
  const [activeKey, setActiveKey] = useState<TabKey>('postManagement');
  const activeTab = useMemo(
    () => tabs.find((t) => t.key === activeKey)!,
    [tabs, activeKey],
  );
  const data = dummyData[activeKey];

  return (
    <div className="w-[81.8rem]">
      <FolderTabGroup
        tabs={tabs.map((t) => ({ label: t.label }))}
        activeIndex={tabs.findIndex((t) => t.key === activeKey)}
        onTabChange={(idx) => setActiveKey(tabs[idx].key as TabKey)}
      />

      <div className="flex h-[74.4rem] flex-col items-start gap-[1rem] self-stretch rounded-bl-[0.8rem] rounded-br-[0.8rem] border border-solid border-black-50 bg-black-10 px-[2.6rem] pb-[3rem] pt-[1rem]">
        <div className="flex items-center justify-end gap-[1rem] self-stretch px-0 py-[0.8rem]">
          <SelectTextIn
            type="outline"
            title="마감일"
            items={[{ id: '1', label: '안녕' }]}
          />
          <BasicSearchBar />
        </div>
        <Table columns={activeTab.columns} data={data} rowKey={(r) => r.id} />
      </div>
    </div>
  );
}
