import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileChip from '../Profile/ProfileChip/BaseProfileChip';
import CloseRecruitmentBtn from '../../Profile/CloseRecruitmentBtn';

import useApplicants from '../../../hooks/useApplicants';
import useMembers from '../../../hooks/useMembers';
import { useCloseRecruitment } from '../../../hooks/useCloseRecruitment';

import { positions } from '../../../constants/formOptions';

import BaseModal from '../../Modal/BaseModal';
import CancelModal from '../../../assets/character/modal/large/ch_modal_x_square_gray_large.svg?react';
import ApproveIcon from '../../../assets/character/modal/large/ch_modal_basic_circle_yellow_large.svg?react';
import DeadLineIcon from '../../../assets/character/modal/large/ch_modal_basic_triangle_yellow_large.svg?react';

type ExpandableRowProps = {
  postId: string | number;
  type: 'applicants' | 'members';
  showCloseAction?: boolean;
};

const ExpandableRow = ({
  postId,
  type,
  showCloseAction,
}: ExpandableRowProps) => {
  const pid = useMemo(() => Number(postId), [postId]);

  const navigate = useNavigate();

  const positionLabelMap = useMemo(() => {
    const map: Record<string, string> = {};
    positions?.forEach((it: any) => {
      const k = String(it?.id ?? it?.value ?? it?.key ?? it?.code ?? '')
        .trim()
        .toUpperCase();
      const label = String(it?.label ?? it?.name ?? '').trim();
      if (k && label) map[k] = label;
    });
    return map;
  }, []);
  const toPositionLabel = (raw?: string) => {
    if (!raw) return '';
    const key = String(raw).trim().toUpperCase();
    return positionLabelMap[key] ?? raw;
  };

  const {
    applicants,
    loading: aLoading,
    error: aError,
    approve,
    reject,
  } = useApplicants(type === 'applicants' ? pid : undefined);

  const {
    members,
    loading: mLoading,
    error: mError,
    kick,
  } = useMembers(type === 'members' ? pid : undefined);

  const isApplicants = type === 'applicants';
  const list = isApplicants ? applicants : members;
  const loading = isApplicants ? aLoading : mLoading;
  const error = isApplicants ? aError : mError;

  const deadlineBtnClose = showCloseAction ?? isApplicants;

  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectTargetId, setRejectTargetId] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState(false);

  const [kickOpen, setKickOpen] = useState(false);
  const [kickTargetId, setKickTargetId] = useState<string | null>(null);
  const [kicking, setKicking] = useState(false);

  const [approveOpen, setApproveOpen] = useState(false);
  const [approveTargetId, setApproveTargetId] = useState<string | null>(null);
  const [approving, setApproving] = useState(false);

  const { closeRecruitment } =
    useCloseRecruitment(pid);
  const [closeOpen, setCloseOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  // 지원자 삭제
  const askReject = (userId: number | string) => {
    setRejectTargetId(String(userId));
    setRejectOpen(true);
  };

  // 지원자 제안
  const askApprove = (userId: number | string) => {
    setApproveTargetId(String(userId));
    setApproveOpen(true);
  };

  // 멤버 강퇴
  const askKick = (userId: number | string) => {
    setKickTargetId(String(userId));
    setKickOpen(true);
  };

  return (
    <div className="mt-[1rem] flex flex-col items-start gap-[0.9rem] self-stretch border border-solid border-x-black-10 border-b-black-50 border-t-black-10 px-[0.4rem] pb-[2rem] pt-0">
      <div className="flex h-[21.2rem] flex-wrap content-start items-start gap-[1rem] self-stretch">
        {loading && (
          <div className="text-caption-12_M500 text-black-120"> </div>
        )}
        {error && (
          <div className="text-caption-12_M500 text-red-600">에러: {error}</div>
        )}
        {!loading && !error && list.length === 0 && (
          <div className="text-caption-12_M500 text-black-120"> </div>
        )}

        {!loading &&
          !error &&
          list.map((u) => {
            const isApproved =
              typeof u.status === 'string' &&
              u.status.toUpperCase() === 'APPROVED';

            const chipState = isApplicants && isApproved ? 'wait' : 'default';

            return (
              <ProfileChip
                key={u.id}
                type="control"
                state={chipState}
                size="extraLarge"
                name={u.name}
                jobRole={toPositionLabel(u.position)}
                yearCount={u.year_count ?? u.yearCount ?? 0}
                showProfileAction
                onProfileAction={(e) => {
                  e?.stopPropagation?.();
                  navigate(`/profile/${encodeURIComponent(u.id)}`);
                }}
                showPlusAction={isApplicants && !isApproved}
                showDeleteAction={
                  (isApplicants && !isApproved) || !isApplicants
                }
                onPlusAction={() => {
                  if (isApplicants) askApprove(u.id);
                }}
                onDeleteAction={() =>
                  isApplicants ? askReject(u.id) : askKick(u.id)
                }
                overlayMode="hover"
              />
            );
          })}
      </div>

      {deadlineBtnClose && (
        <div className="flex items-center justify-end gap-[1rem] self-stretch py-[0.6rem] pr-[0.4rem]">
          <CloseRecruitmentBtn
            projectId={pid}
            onClick={() => setCloseOpen(true)}
          />
        </div>
      )}

      {/* 지원자 삭제 모달 */}
      <BaseModal
        size="large"
        isOpen={rejectOpen}
        onClose={() => !rejecting && setRejectOpen(false)}
        handleDone={async () => {
          if (!rejectTargetId) return;
          try {
            setRejecting(true);
            await reject(rejectTargetId);
            setRejectOpen(false);
            setRejectTargetId(null);
          } finally {
            setRejecting(false);
          }
        }}
        title="지원자를 삭제하겠습니까?"
        content="지원자를 삭제하면 다시 추가할 수 없어요."
        CharacterComponent={CancelModal}
      />

      {/* 지원자 추가(제안) 모달 */}
      <BaseModal
        size="large"
        isOpen={approveOpen}
        onClose={() => !approving && setApproveOpen(false)}
        handleDone={async () => {
          if (!approveTargetId) return;
          try {
            setApproving(true);
            await approve(approveTargetId);
            setApproveOpen(false);
            setApproveTargetId(null);
          } finally {
            setApproving(false);
          }
        }}
        CharacterComponent={ApproveIcon}
        title="나의 동료가 돼라!!"
        content="해당 프로젝트에 지원자를 추가하시겠습니까?"
      />

      {/* 멤버 강퇴 모달 */}
      <BaseModal
        size="large"
        isOpen={kickOpen}
        onClose={() => !kicking && setKickOpen(false)}
        handleDone={async () => {
          if (!kickTargetId) return;
          try {
            setKicking(true);
            await kick(kickTargetId);
            setKickOpen(false);
            setKickTargetId(null);
          } finally {
            setKicking(false);
          }
        }}
        title="멤버를 강퇴하겠습니까?"
        content="멤버를 강퇴하면 해당 멤버는 다시 합류할 수 없어요."
        CharacterComponent={CancelModal}
      />

      {/* 모집 마감 모달 */}
      <BaseModal
        size="large"
        isOpen={closeOpen}
        onClose={() => !closing && setCloseOpen(false)}
        handleDone={async () => {
          try {
            setClosing(true);
            await closeRecruitment();
            setCloseOpen(false);
          } finally {
            setClosing(false);
          }
        }}
        CharacterComponent={DeadLineIcon}
        title="모집을 마감하시겠습니까?"
        content="마감 시 모집 글 수정과 삭제를 할 수 없어요."
      />
    </div>
  );
};

export default ExpandableRow;
