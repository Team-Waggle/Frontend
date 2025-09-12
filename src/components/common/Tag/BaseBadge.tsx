export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BaseBadgeProps {
  size: BadgeSize;
  children: React.ReactNode;
}

const BaseBadge = ({ size, children }: BaseBadgeProps) => {
  const baseStyles = `h-[1.6rem] bg-primary rounded-[9.9rem] text-caption-12_M500 text-black-10 flex items-center justify-center`;
  const sizeStyles = {
    sm: 'w-[1.6rem]',
    md: 'w-[2.6rem]',
    lg: 'w-[3.2rem]',
  }[size];
  return <div className={`${baseStyles} ${sizeStyles}`}>{children}</div>;
};

export default BaseBadge;
