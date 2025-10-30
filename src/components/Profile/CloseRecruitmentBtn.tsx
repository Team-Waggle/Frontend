import BaseButton from '../common/Button/BaseButton';
import { useCloseRecruitment } from '../../hooks/useCloseRecruitment';

type CloseRecruitmentButtonProps = {
  projectId: number;
  className?: string;
  onClick?: () => void;
};

export default function CloseRecruitmentBtn({
  projectId,
  className,
  onClick,
}: CloseRecruitmentButtonProps) {
  const { closeRecruitment, isUpdating, isDetailLoading } =
    useCloseRecruitment(projectId);

  const handleClick = onClick ?? closeRecruitment;

  return (
    <BaseButton
      size="sm"
      color="primary"
      className={className}
      disabled={isUpdating || isDetailLoading}
      onClick={handleClick}
    >
      마감하기
    </BaseButton>
  );
}