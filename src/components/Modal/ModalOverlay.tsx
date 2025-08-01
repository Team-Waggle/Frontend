// 모달 외부 클릭 시 닫기를 위한 오버레이 컴포넌트
interface ModalOverlayProps {
  onClose: () => void;
  className?: string;
}

const ModalOverlay = ({ onClose, className }: ModalOverlayProps) => {
  return (
    <div
      className={`fixed inset-0 bg-[#12141A40] ${className || ''}`}
      onClick={onClose}
      aria-hidden="true"
    />
  );
};

export default ModalOverlay;
