interface PaginationButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const PaginationButton = ({
  active = false,
  onClick,
  children,
}: PaginationButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`h-full w-[4rem] rounded-[9.9rem] px-[0.2rem] text-body-16_R400 ${active ? 'bg-black-30' : 'hover:bg-black-30'} `}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
