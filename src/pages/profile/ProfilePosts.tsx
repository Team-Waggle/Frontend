import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FolderTabGroup } from '../../components/common/Tab/FolderTabGroup';
import { Table } from '../../components/common/Table/Table';
import ExpandableRow from '../../components/common/Table/ExpandableRow';
import BaseModal from '../../components/Modal/BaseModal';
import BasicSearchBar from '../../components/common/SearchBar/BasicSearchBar';
import SelectTextIn from '../../components/common/Select/SelectTextIn';

import { profilePostTabs } from '../../constants/ProfilePostColumns';
import type { PostRow } from '../../constants/ProfilePostColumns';
import { useUserProjectRows } from '../../hooks/useUserProjectRows';
import { useProjectsDeleteQuery } from '../../hooks/useProjectPost';
import { emptyContentByKey } from '../../components/Profile/ProfilePostEmpty';

import {
  type SortKey,
  type TabKey,
  sortItemsByTab,
  processPosts,
  isRowClosedForUI,
} from '../../utils/profilePostList';

import CancelModal from '../../assets/character/modal/large/ch_modal_x_square_gray_large.svg?react';
import BaseBadge from '../../components/common/Tag/BaseBadge';

import { getProjectMembersCount } from '../../services/projects.service';

const LS_KEY = 'profileTabBaselines';
function loadBaselines(): Record<TabKey, number> {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { postManagement: 0, applicantManagement: 0, memberManagement: 0 };
}
function saveBaselines(b: Record<TabKey, number>) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(b));
  } catch {}
}

export default function ProfilePosts() {
  const [activeKey, setActiveKey] = useState<TabKey>('postManagement');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('status');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const { loading, error, rows } = useUserProjectRows();
  const { mutate: deleteMutate } = useProjectsDeleteQuery();
  const navigate = useNavigate();

  const tabs = profilePostTabs;

  const dataByKey: Record<TabKey, PostRow[]> = useMemo(
    () => ({
      postManagement: rows,
      applicantManagement: rows,
      memberManagement: rows,
    }),
    [rows],
  );

  const activeTab = useMemo(
    () => tabs.find((t) => t.key === activeKey)!,
    [tabs, activeKey],
  );

  const data = dataByKey[activeKey];
  const sortItems = sortItemsByTab[activeKey];

  useEffect(() => {
    setSortKey(sortItemsByTab[activeKey][0].id);
  }, [activeKey]);

  useEffect(() => {
    const handler = (e: any) => {
      const id: string | number | undefined = e?.detail?.id;
      if (id == null) return;
      const numId =
        typeof id === 'number'
          ? id
          : /^\d+$/.test(String(id).trim())
            ? parseInt(String(id), 10)
            : NaN;
      if (!Number.isFinite(numId)) return;
      setTargetId(numId);
      setDeleteModalOpen(true);
    };
    window.addEventListener('post:delete:open', handler as EventListener);
    return () =>
      window.removeEventListener('post:delete:open', handler as EventListener);
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      const id: string | undefined = e?.detail?.id;
      if (id) navigate(`/post/edit/${encodeURIComponent(id)}`);
    };
    window.addEventListener('post:edit', handler);
    return () => window.removeEventListener('post:edit', handler);
  }, [navigate]);

  useEffect(() => {
    const handler = (e: any) => {
      const id: string | undefined = e?.detail?.id;
      if (!id) return;
      setExpanded((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    };
    window.addEventListener('rowdetail:toggle', handler);
    return () => window.removeEventListener('rowdetail:toggle', handler);
  }, []);

  useEffect(() => {
    setExpanded(new Set());
  }, [activeKey]);

  const processed = useMemo(
    () => processPosts(data, sortKey, searchText),
    [data, sortKey, searchText],
  );

  const [baselines, setBaselines] = useState<Record<TabKey, number>>(loadBaselines());
  const [totals, setTotals] = useState<Record<TabKey, number>>({
    postManagement: 0,
    applicantManagement: 0,
    memberManagement: 0,
  });

  const postsTotal = rows.length;
  const applicantsTotal = useMemo(
    () => rows.reduce((acc, r) => acc + (r.applicantsCount ?? 0), 0),
    [rows],
  );

  useEffect(() => {
    let alive = true;
    (async () => {
      const ids = rows.map((r) => Number(r.id)).filter((n) => Number.isFinite(n));
      if (ids.length === 0) {
        if (!alive) return;
        setTotals((prev) => ({ ...prev, memberManagement: 0 }));
        return;
      }

      const results = await Promise.allSettled(
        ids.map((id) => getProjectMembersCount(id)),
      );

      if (!alive) return;
      const sum = results.reduce((acc, r) => {
        if (r.status === 'fulfilled') return acc + (r.value ?? 0);
        return acc;
      }, 0);

      setTotals((prev) => ({ ...prev, memberManagement: sum }));
    })();

    return () => {
      alive = false;
    };
  }, [rows]);

  useEffect(() => {
    setTotals((prev) => ({
      ...prev,
      postManagement: postsTotal,
      applicantManagement: applicantsTotal,
    }));
  }, [postsTotal, applicantsTotal]);

  const badgeCounts = {
    postManagement: Math.max(0, totals.postManagement - baselines.postManagement),
    applicantManagement: Math.max(0, totals.applicantManagement - baselines.applicantManagement),
    memberManagement: Math.max(0, totals.memberManagement - baselines.memberManagement),
  };

  useEffect(() => {
    setBaselines((prev) => {
      const next = { ...prev, [activeKey]: totals[activeKey] ?? 0 };
      saveBaselines(next);
      return next;
    });
  }, [activeKey, totals]);

  const tabsWithBadges = useMemo(() => {
    return profilePostTabs.map((t) => {
      const key = t.key as TabKey;
      const n = badgeCounts[key];
      const badge =
        n > 0 ? <BaseBadge size="lg">{n > 99 ? '99+' : n}</BaseBadge> : null;

      return {
        ...t,
        label: (
          <span className="flex items-center gap-[0.6rem]">
            {t.label}
            {badge}
          </span>
        ),
      };
    });
  }, [badgeCounts]);

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setTargetId(null);
  };

  const handleDeleteConfirm = () => {
    if (targetId == null) return;
    deleteMutate(targetId, {
      onSuccess: () => {
        setDeleteModalOpen(false);
        setTargetId(null);
        setBaselines((prev) => {
          const next = {
            ...prev,
            postManagement: Math.max(0, prev.postManagement - 1),
          };
          saveBaselines(next);
          return next;
        });
      },
    });
  };

  return (
    <div className="w-[81.8rem]">
      <FolderTabGroup
        tabs={tabsWithBadges.map((t) => ({
          id: t.key,
          label: t.label,
        }))}
        activeIndex={tabsWithBadges.findIndex((t) => t.key === activeKey)}
        onTabChange={(idx) => setActiveKey(tabsWithBadges[idx].key as TabKey)}
      />

      <div className="flex h-[74.4rem] flex-col items-start gap-[1rem] self-stretch rounded-bl-[0.8rem] rounded-br-[0.8rem] border border-solid border-black-50 bg-black-10 px-[2.6rem] pb-[3rem] pt-[1rem]">
        <div className="flex flex-wrap items-center justify-end gap-[1rem] self-stretch px-0 py-[0.8rem]">
          <SelectTextIn
            type="outline"
            title="정렬"
            items={sortItems}
            value={sortKey}
            onChange={(v: string) =>
              setSortKey((v as SortKey) || sortItems[0].id)
            }
          />
          <BasicSearchBar onSearch={setSearchText} />
        </div>

        {loading ? (
          <div className="px-4 py-8 text-caption-12_M500 text-black-130">
            불러오는 중…
          </div>
        ) : error ? (
          <div className="px-4 py-8 text-caption-12_M500 text-red-600">
            에러: {error}
          </div>
        ) : processed.length === 0 ? (
          emptyContentByKey[activeKey]
        ) : (
          <Table<PostRow>
            columns={activeTab.columns}
            data={processed}
            rowKey={(r) => r.id}
            isRowExpanded={(row) => expanded.has(row.id)}
            isRowClosed={(row) => isRowClosedForUI(row)}
            renderRowDetail={(row) => (
              <ExpandableRow
                postId={Number(row.id)}
                type={
                  activeKey === 'applicantManagement' ? 'applicants' : 'members'
                }
                showCloseAction={activeKey === 'applicantManagement'}
              />
            )}
          />
        )}
      </div>

      <BaseModal
        size="large"
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        handleDone={handleDeleteConfirm}
        title="모집글을 삭제하시겠어요?"
        content="모집글을 삭제하면 지원자들도 사라져요."
        CharacterComponent={CancelModal}
      />
    </div>
  );
}
