import { useEffect, useMemo, useState } from 'react';
import { FolderTabGroup } from '../../components/common/Tab/FolderTabGroup';
import { Table } from '../../components/common/Table/Table';
import ProfileSearchBar from '../../components/Profile/ProfileSearchBar';
import {
  useConfirmApplyQuery,
  useDeleteApply,
  useGetMyApply,
} from '../../hooks/useApplicants';
import NoApplyIcon from '../../assets/character/loading/ch_loading_basic_circle_gray_small.svg?react';
import NoApprovedIcon from '../../assets/character/loading/ch_loading_basic_triangle_gray_small.svg?react';
import NoConfirmedIcon from '../../assets/character/loading/ch_loading_check_square_gray_small.svg?react';
import DeleteAppliedModalIcon from '../../assets/character/modal/large/ch_modal_x_square_gray_large.svg?react';
import ApprovedModalIcon from '../../assets/character/modal/large/ch_modal_basic_circle_yellow_large.svg?react';

import {
  AppliedRow,
  appliedColumns,
  joinProposalColumns,
  joinedColumns,
} from '../../constants/ProfileApplicationColumns';
import { formatYYMMDDKST, isClosedKST } from '../../utils/dateKST';
import { industries, skills } from '../../constants/formOptions';
import BaseModal from '../../components/Modal/BaseModal';

type ApplicationsTabKey = 'applied' | 'joinProposal' | 'joined';

const ProfileApplications = () => {
  const [activeKey, setActiveKey] = useState<ApplicationsTabKey>('applied');
  const [searchText, setSearchText] = useState('');
  const [deleteAppliedModalOpen, setDeleteAppliedModalOpen] = useState(false);
  const [appliedModalOpen, setAppliedModalOpen] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);
  const { mutate: ConfirmApplyMutate } = useConfirmApplyQuery(Number(targetId));
  const { mutate: DeleteApplyMutate } = useDeleteApply(Number(targetId));

  const statusParam = useMemo(() => {
    switch (activeKey) {
      case 'joinProposal':
        return 'APPROVED';
      case 'joined':
        return 'CONFIRMED';
      default:
        return '';
    }
  }, [activeKey]);

  const { data, isLoading, error } = useGetMyApply(statusParam);

  const closeApplyConfirmModal = () => {
    setAppliedModalOpen(false);
    setTargetId(null);
  };

  const handleAppliedConfirm = () => {
    if (targetId === null) return;
    ConfirmApplyMutate(targetId);
    setAppliedModalOpen(false);
    setTargetId(null);
  };

  const closeDeleteAppliedModal = () => {
    setDeleteAppliedModalOpen(false);
    setTargetId(null);
  };

  const handleDeleteApply = () => {
    if (targetId === null) return;
    DeleteApplyMutate(targetId);
    setDeleteAppliedModalOpen(false);
    setTargetId(null);
  };

  const tabs = [
    {
      label: '지원 완료',
      key: 'applied',
      columns: appliedColumns,
      emptyIcon: <NoApplyIcon />,
      emptyMessage: '지원 목록이 없어요.',
      modal: (
        <BaseModal
          size="large"
          isOpen={deleteAppliedModalOpen}
          onClose={closeDeleteAppliedModal}
          handleDone={handleDeleteApply}
          title="정말 지원을 취소하시겠어요?"
          content="취소하면 다시 참여가 어려울 수 있어요."
          CharacterComponent={DeleteAppliedModalIcon}
        />
      ),
    },
    {
      label: '합류 제안',
      key: 'joinProposal',
      columns: joinProposalColumns,
      emptyIcon: <NoApprovedIcon />,
      emptyMessage: '아직 합류 제안이 오지 않았어요.',
      modal: (
        <BaseModal
          size="large"
          isOpen={appliedModalOpen}
          onClose={closeApplyConfirmModal}
          handleDone={handleAppliedConfirm}
          title="그들의 동료가 되겠습니까?"
          content="좋은 성과가 있길 바랍니다."
          CharacterComponent={ApprovedModalIcon}
        />
      ),
    },
    {
      label: '합류 완료',
      key: 'joined',
      columns: joinedColumns,
      emptyIcon: <NoConfirmedIcon />,
      emptyMessage: (
        <div className="flex flex-col items-center">
          <span>합류 완료한 글이 없어요.</span>
          <span>합류 제안 목록에서 확인해 주세요.</span>
        </div>
      ),
      modal: null,
    },
  ] as const;

  // 현재 탭 정보
  const activeTab = useMemo(
    () => tabs.find((t) => t.key === activeKey)!,
    [tabs, activeKey],
  );

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

  const applyData: AppliedRow[] = useMemo(() => {
    return (data ?? []).map((data) => {
      const status = isClosedKST(data.recruitment_end_date)
        ? '마감'
        : '진행 중';

      return {
        id: String(data.id),
        title: data.title,
        industry: toIndustryLabel(data.industry),
        deadline: formatYYMMDDKST(data.recruitment_end_date),
        skills: toSkillLabels(data.skills as string[] | undefined),
        status,
      } as AppliedRow;
    });
  }, [data]);

  useEffect(() => {
    const handler = (e: any) => {
      setTargetId(e?.detail?.id);
      setDeleteAppliedModalOpen(true);
    };
    window.addEventListener('applied:delete:open', handler as EventListener);
    return () =>
      window.removeEventListener(
        'applied:delete:open',
        handler as EventListener,
      );
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      setTargetId(e?.detail?.id);
      setAppliedModalOpen(true);
    };
    window.addEventListener('approved:open', handler as EventListener);
    return () =>
      window.removeEventListener('approved:open', handler as EventListener);
  }, []);

  return (
    <div className="w-[32rem] sm:w-[72rem] md:w-[81.8rem]">
      <FolderTabGroup
        tabs={tabs.map((t) => ({ id: t.key, label: t.label }))}
        activeIndex={tabs.findIndex((t) => t.key === activeKey)}
        onTabChange={(idx) => setActiveKey(tabs[idx].key)}
      />

      <div className="flex h-[74.4rem] flex-col items-start gap-[1rem] rounded-b-[0.8rem] border border-solid border-black-50 bg-black-10 px-[2.6rem] pb-[3rem] pt-[1rem]">
        <div className="flex w-full justify-end py-[0.8rem]">
          <ProfileSearchBar onSearch={setSearchText} />
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
            {activeTab.emptyIcon}
            <span className="text-caption-16_M500 text-black-70">
              {activeTab.emptyMessage}
            </span>
          </div>
        ) : (
          <Table
            columns={activeTab.columns}
            data={applyData}
            rowKey={(r) => r.id}
          />
        )}
      </div>

      {activeTab.modal}
    </div>
  );
};

export default ProfileApplications;
