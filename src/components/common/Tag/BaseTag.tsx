import { BaseTagProps } from '../../../styles/types/tag';

const BaseTag = ({ size, className, children }: BaseTagProps) => {
  const getTagStyles = () => {
    const baseStyles =
      'flex items-center rounded-[0.4rem] border border-solid border-black-60 text-caption-14_M500';

    const sizeStyles = {
      md: 'h-[2.4rem]',
      lg: 'h-[3.2rem]',
    }[size];

    const paddingStyles = size === 'md' ? 'px-[0.8rem]' : 'px-[1rem]';

    return `${baseStyles} ${sizeStyles} ${paddingStyles} ${className || ''}`;
  };

  return <div className={getTagStyles()}>{children}</div>;
};
export default BaseTag;
