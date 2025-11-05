import { useMemo, useState } from 'react';
import BasicSearchBar from '../../components/common/SearchBar/BasicSearchBar';
import SelectTextIn from '../../components/common/Select/SelectTextIn';
import { FolderTabGroup } from '../../components/common/Tab/FolderTabGroup';
import { Table } from '../../components/common/Table/Table';

import {
  appliedColumns,
  joinProposalColumns,
  joinedColumns,
} from '../../constants/ProfileApplicationColumns';
import type {
  AppliedRow,
  JoinProposalRow,
  JoinedRow,
} from '../../constants/ProfileApplicationColumns';

const dummyData: {
  applied: AppliedRow[];
  joinProposal: JoinProposalRow[];
  joined: JoinedRow[];
} = {
  applied: [
    {
      id: '1',
      status: '진행중',
      deadline: '00.00.00',
      industry: '소셜네트워크',
      title:
        '와글 팀과 함께할 디자이너, 기획자, 백엔드, 프론트엔드, 데브옵스님을 모집합니다.',
      skills: ['TypeScript', 'TypeScript', 'TypeScript', 'TypeScript'],
    },
  ],
  joinProposal: [
    {
      id: '1',
      deadline: '00.00.00',
      industry: '소셜네트워크',
      title:
        '와글 팀과 함께할 디자이너, 기획자, 백엔드, 프론트엔드, 데브옵스님을 모집합니다.',
      skills: ['TypeScript', 'TypeScript', 'TypeScript', 'TypeScript'],
    },
  ],
  joined: [
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

const ProfileApplications = () => {
  const tabs = [
    { label: '지원 완료', key: 'applied' as const, columns: appliedColumns },
    {
      label: '합류 제안',
      key: 'joinProposal' as const,
      columns: joinProposalColumns,
    },
    { label: '합류 완료', key: 'joined' as const, columns: joinedColumns },
  ];

  const [activeKey, setActiveKey] = useState<
    'applied' | 'joinProposal' | 'joined'
  >('applied');

  const activeTab = useMemo(
    () => tabs.find((t) => t.key === activeKey)!,
    [tabs, activeKey],
  );

  const data =
    activeKey === 'applied'
      ? dummyData.applied
      : activeKey === 'joinProposal'
        ? dummyData.joinProposal
        : dummyData.joined;

  return (
    <div className="w-[81.8rem]">
      <FolderTabGroup
        tabs={tabs.map((t) => ({ id: t.key, label: t.label }))}
        activeIndex={tabs.findIndex((tab) => tab.key === activeKey)}
        onTabChange={(idx) => setActiveKey(tabs[idx].key)}
      />

      {/* 테이블 + 검색 */}
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
};

export default ProfileApplications;
